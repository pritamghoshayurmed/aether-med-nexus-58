import { useState, useEffect } from 'react';
import { supabase, Patient, Appointment, Vital, Prescription, LabResult, MedicalRecord, FamilyMember, Notification, Billing } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Hook for patient data
export const usePatient = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPatient();
    }
  }, [user]);

  const fetchPatient = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setPatient(data);
    } catch (error: any) {
      console.error('Error fetching patient:', error);
      toast({
        title: 'Error',
        description: 'Failed to load patient data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (updates: Partial<Patient>) => {
    if (!patient) return;

    try {
      const { error } = await supabase
        .from('patients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', patient.id);

      if (error) throw error;

      await fetchPatient();
      toast({
        title: 'Success',
        description: 'Patient information updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
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
