import { useState, useEffect } from 'react';
import { supabase, Patient, Appointment, Vital, Prescription, LabResult, MedicalRecord, FamilyMember, Notification, Billing } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Hook for patient data
export const usePatient = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  const createPatientRecord = async () => {
    if (!user) return;

    try {
      console.log('Creating new patient record for user:', user.id);
      
      // First check if profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .single();

      if (profileError || !profileData) {
        console.error('Profile does not exist. Cannot create patient record. Profile must be created first.');
        toast({
          title: 'Setup Required',
          description: 'Please log out and log in again to complete your profile setup.',
          variant: 'destructive',
        });
        return;
      }

      // Now create patient record
      const { data, error } = await supabase
        .from('patients')
        .insert({
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        // If record already exists, try to fetch it
        if (error.code === '23505') {
          console.log('Patient record already exists, fetching...');
          const { data: existingData, error: fetchError } = await supabase
            .from('patients')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (!fetchError && existingData) {
            setPatient(existingData);
            console.log('Existing patient record fetched:', existingData);
            return;
          }
        }
        console.error('Error creating patient record:', error);
        return;
      }

      if (data) {
        setPatient(data);
        console.log('Patient record created successfully:', data);
      }
    } catch (error: any) {
      console.error('Error creating patient record:', error.message);
    }
  };

  const fetchPatient = async (isRetry = false) => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching patient data for user: ${user.id}${isRetry ? ' (retry)' : ''}`);
      
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching patient:', error);
        
        // If patient record doesn't exist, try to create it
        if (error.code === 'PGRST116') {
          console.log('Patient record not found, attempting to create...');
          await createPatientRecord();
          return;
        }
        
        // If it's a 406 error, the profile might not exist
        if (error.message?.includes('Not Acceptable') || error.message?.includes('406')) {
          console.error('API returned 406 - Profile may not exist. User needs to complete signup.');
          toast({
            title: 'Profile Setup Required',
            description: 'Your profile was not properly created during signup. Please log out and sign up again, or contact support.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
        
        // Retry logic for transient errors
        if (retryCount < 2 && !isRetry) {
          console.log('Retrying fetch patient...');
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchPatient(true), 1000);
          return;
        }
        
        throw error;
      }
      
      if (data) {
        setPatient(data);
        setRetryCount(0); // Reset retry count on success
        console.log('Patient data loaded successfully:', data);
      } else {
        console.warn('No patient data found for user:', user.id);
      }
    } catch (error: any) {
      console.error('Error fetching patient:', error.message);
      if (!isRetry) {
        toast({
          title: 'Error',
          description: 'Failed to load patient data. Please try refreshing the page.',
          variant: 'destructive',
        });
      }
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('usePatient: user changed, user.id:', user?.id);
    if (user?.id) {
      setLoading(true);
      fetchPatient();
    } else {
      console.log('usePatient: No user, setting loading to false');
      setLoading(false);
      setPatient(null);
    }
  }, [user?.id]); // Use user.id as dependency instead of entire user object

  const updatePatient = async (updates: Partial<Patient>) => {
    if (!patient || !user) {
      console.error('Cannot update: patient or user is null');
      return;
    }

    try {
      console.log('Updating patient with:', updates);
      
      const { data, error } = await supabase
        .from('patients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', patient.id)
        .select()
        .single();

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      console.log('Patient updated successfully:', data);
      
      // Update local state immediately
      if (data) {
        setPatient(data);
      }
      
      // Also refetch to ensure consistency
      await fetchPatient();
      
      toast({
        title: 'Success',
        description: 'Patient information updated successfully',
      });
    } catch (error: any) {
      console.error('Error updating patient:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update patient information',
        variant: 'destructive',
      });
    }
  };

  return { patient, loading, updatePatient, refetch: fetchPatient };
};

// Hook for appointments
export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      // First get patient ID
      const { data: patientData } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!patientData) return;

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctors (
            id,
            specialty,
            user_id,
            profiles (full_name)
          )
        `)
        .eq('patient_id', patientData.id)
        .order('appointment_date', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: Partial<Appointment>) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .insert(appointmentData);

      if (error) throw error;

      await fetchAppointments();
      toast({
        title: 'Success',
        description: 'Appointment created successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchAppointments();
      toast({
        title: 'Success',
        description: 'Appointment updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return { appointments, loading, createAppointment, updateAppointment, refetch: fetchAppointments };
};

// Hook for vitals
export const useVitals = () => {
  const { user } = useAuth();
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchVitals();
    }
  }, [user]);

  const fetchVitals = async () => {
    if (!user) return;

    try {
      const { data: patientData } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!patientData) return;

      const { data, error } = await supabase
        .from('vitals')
        .select('*')
        .eq('patient_id', patientData.id)
        .order('recorded_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setVitals(data || []);
    } catch (error: any) {
      console.error('Error fetching vitals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addVital = async (vitalData: Partial<Vital>) => {
    try {
      const { error } = await supabase
        .from('vitals')
        .insert(vitalData);

      if (error) throw error;

      await fetchVitals();
      toast({
        title: 'Success',
        description: 'Vital signs recorded',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return { vitals, loading, addVital, refetch: fetchVitals };
};

// Hook for prescriptions
export const usePrescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPrescriptions();
    }
  }, [user]);

  const fetchPrescriptions = async () => {
    if (!user) return;

    try {
      const { data: patientData } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!patientData) return;

      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          doctors (
            specialty,
            profiles (full_name)
          )
        `)
        .eq('patient_id', patientData.id)
        .order('prescribed_date', { ascending: false });

      if (error) throw error;
      setPrescriptions(data || []);
    } catch (error: any) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  return { prescriptions, loading, refetch: fetchPrescriptions };
};

// Hook for notifications
export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      
      // Setup real-time subscription
      const subscription = supabase
        .channel('notifications')
        .on('postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            setNotifications(prev => [payload.new as Notification, ...prev]);
            setUnreadCount(prev => prev + 1);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.read).length || 0);
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      await fetchNotifications();
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;
      await fetchNotifications();
    } catch (error: any) {
      console.error('Error marking all as read:', error);
    }
  };

  return { notifications, loading, unreadCount, markAsRead, markAllAsRead, refetch: fetchNotifications };
};

// Hook for doctor data
export const useDoctor = () => {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchDoctor();
    }
  }, [user]);

  const fetchDoctor = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setDoctor(data);
    } catch (error: any) {
      console.error('Error fetching doctor:', error);
      toast({
        title: 'Error',
        description: 'Failed to load doctor data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateDoctor = async (updates: any) => {
    if (!doctor) return;

    try {
      const { error } = await supabase
        .from('doctors')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', doctor.id);

      if (error) throw error;

      await fetchDoctor();
      toast({
        title: 'Success',
        description: 'Doctor information updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return { doctor, loading, updateDoctor, refetch: fetchDoctor };
};

// Hook for hospital data
export const useHospital = () => {
  const { user } = useAuth();
  const [hospital, setHospital] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchHospital();
    }
  }, [user]);

  const fetchHospital = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setHospital(data);
    } catch (error: any) {
      console.error('Error fetching hospital:', error);
      toast({
        title: 'Error',
        description: 'Failed to load hospital data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHospital = async (updates: any) => {
    if (!hospital) return;

    try {
      const { error } = await supabase
        .from('hospitals')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', hospital.id);

      if (error) throw error;

      await fetchHospital();
      toast({
        title: 'Success',
        description: 'Hospital information updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return { hospital, loading, updateHospital, refetch: fetchHospital };
};
