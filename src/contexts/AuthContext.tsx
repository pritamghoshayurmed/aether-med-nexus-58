import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  role: string;
  // Doctor specific
  licenseNumber?: string;
  specialty?: string;
  // Hospital specific
  hospitalName?: string;
  registrationNumber?: string;
  hospitalType?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string, role: string, rememberMe?: boolean) => Promise<{ error: AuthError | null }>;
  signUp: (data: SignUpData) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  checkRememberedSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string, role: string, rememberMe: boolean = false) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Verify role matches
      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileData && profileData.role !== role) {
          await supabase.auth.signOut();
          return { error: { message: 'Invalid role for this account' } as AuthError };
        }

        // Handle Remember Me functionality
        if (rememberMe && data.session) {
          // Store session token in localStorage
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userRole', role);
          
          // Create a persistent session record in database
          const sessionToken = crypto.randomUUID();
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

          await supabase.from('user_sessions').insert({
            user_id: data.user.id,
            session_token: sessionToken,
            remember_me: true,
            expires_at: expiresAt.toISOString(),
            device_info: navigator.userAgent,
          });

          localStorage.setItem('sessionToken', sessionToken);
        } else {
          // Clear remember me data if not checked
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('sessionToken');
          localStorage.removeItem('userRole');
        }
      }

      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const { email, password, fullName, role } = data;
      
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) throw error;

      // Create profile
      if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          role: role,
        });

        if (profileError) throw profileError;

        // Create role-specific records
        if (role === 'patient') {
          const { error: patientError } = await supabase.from('patients').insert({
            user_id: authData.user.id,
          });

          if (patientError) throw patientError;
        } else if (role === 'doctor') {
          const { error: doctorError } = await supabase.from('doctors').insert({
            user_id: authData.user.id,
            specialty: data.specialty || 'General Practitioner',
            license_number: data.licenseNumber || '',
            years_of_experience: 0,
            consultation_fee: 0,
          });

          if (doctorError) throw doctorError;

          // Create verification request if license number provided
          if (data.licenseNumber) {
            const { data: doctorData } = await supabase
              .from('doctors')
              .select('id')
              .eq('user_id', authData.user.id)
              .single();

            if (doctorData) {
              await supabase.from('doctor_verification_requests').insert({
                doctor_id: doctorData.id,
                license_number: data.licenseNumber,
              });
            }
          }
        } else if (role === 'hospital') {
          const { error: hospitalError } = await supabase.from('hospitals').insert({
            user_id: authData.user.id,
            hospital_name: data.hospitalName || fullName,
            hospital_type: data.hospitalType || 'hospital',
            registration_number: data.registrationNumber || '',
          });

          if (hospitalError) throw hospitalError;

          // Create verification request if registration number provided
          if (data.registrationNumber) {
            const { data: hospitalData } = await supabase
              .from('hospitals')
              .select('id')
              .eq('user_id', authData.user.id)
              .single();

            if (hospitalData) {
              await supabase.from('hospital_verification_requests').insert({
                hospital_id: hospitalData.id,
                registration_number: data.registrationNumber,
              });
            }
          }
        } else if (role === 'admin') {
          const { error: adminError } = await supabase.from('super_admins').insert({
            user_id: authData.user.id,
            admin_level: 'standard',
          });

          if (adminError) throw adminError;
        }
      }

      toast({
        title: 'Success',
        description: 'Account created successfully. Please check your email for verification.',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Remove session from database if exists
      const sessionToken = localStorage.getItem('sessionToken');
      if (sessionToken) {
        await supabase
          .from('user_sessions')
          .delete()
          .eq('session_token', sessionToken);
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
      setSession(null);

      // Clear remember me data
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('userRole');

      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const checkRememberedSession = async (): Promise<boolean> => {
    const rememberMe = localStorage.getItem('rememberMe');
    const sessionToken = localStorage.getItem('sessionToken');
    
    if (!rememberMe || !sessionToken) {
      return false;
    }

    try {
      // Check if session token is valid and not expired
      const { data, error } = await supabase
        .from('user_sessions')
        .select('user_id, expires_at')
        .eq('session_token', sessionToken)
        .eq('remember_me', true)
        .single();

      if (error || !data) {
        // Invalid or expired session
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('userRole');
        return false;
      }

      // Check if session is expired
      const expiresAt = new Date(data.expires_at);
      if (expiresAt < new Date()) {
        // Session expired
        await supabase
          .from('user_sessions')
          .delete()
          .eq('session_token', sessionToken);
        
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('userRole');
        return false;
      }

      // Session is valid, update last accessed
      await supabase
        .from('user_sessions')
        .update({ last_accessed: new Date().toISOString() })
        .eq('session_token', sessionToken);

      return true;
    } catch (error) {
      console.error('Error checking remembered session:', error);
      return false;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;

      await fetchProfile(user.id);

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        checkRememberedSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
