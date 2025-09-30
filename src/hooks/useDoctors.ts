import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface Doctor {
  id: string;
  user_id: string;
  specialty: string;
  license_number: string;
  years_of_experience: number;
  qualification: string;
  consultation_fee: number;
  available_days: string[];
  available_time_slots: Record<string, string[]>;
  rating: number;
  total_reviews: number;
  profiles?: {
    full_name: string;
    email: string;
  };
}

// Hook for fetching all doctors
export const useDoctors = (filters?: {
  specialty?: string;
  searchQuery?: string;
  consultationType?: string;
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, [filters?.specialty, filters?.searchQuery, filters?.consultationType]);

  const fetchDoctors = async () => {
    try {
      let query = supabase
        .from('doctors')
        .select(`
          *,
          profiles!doctors_user_id_fkey (
            full_name,
            email
          )
        `)
        .order('rating', { ascending: false });

      // Apply specialty filter
      if (filters?.specialty && filters.specialty !== 'all') {
        query = query.ilike('specialty', `%${filters.specialty}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      let filteredData = data || [];

      // Apply search filter
      if (filters?.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        filteredData = filteredData.filter(doctor => 
          doctor.profiles?.full_name?.toLowerCase().includes(searchLower) ||
          doctor.specialty?.toLowerCase().includes(searchLower) ||
          doctor.qualification?.toLowerCase().includes(searchLower)
        );
      }

      setDoctors(filteredData as Doctor[]);
    } catch (error: any) {
      console.error('Error fetching doctors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load doctors',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { doctors, loading, refetch: fetchDoctors };
};

// Hook for fetching a single doctor
export const useDoctor = (doctorId?: string) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const fetchDoctor = async () => {
    if (!doctorId) return;

    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profiles!doctors_user_id_fkey (
            full_name,
            email
          )
        `)
        .eq('id', doctorId)
        .single();

      if (error) throw error;
      setDoctor(data as Doctor);
    } catch (error: any) {
      console.error('Error fetching doctor:', error);
      toast({
        title: 'Error',
        description: 'Failed to load doctor information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { doctor, loading, refetch: fetchDoctor };
};

// Hook for creating appointments
export const useCreateAppointment = () => {
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);

  const createAppointment = async (appointmentData: {
    patient_id: string;
    doctor_id: string;
    appointment_date: string;
    appointment_time: string;
    appointment_type: 'video' | 'in-person' | 'phone';
    reason?: string;
    consultation_fee: number;
  }) => {
    setCreating(true);
    try {
      // Check if slot is still available
      const appointmentDateTime = new Date(`${appointmentData.appointment_date}T${appointmentData.appointment_time}`);
      
      const { data: existingAppointment, error: checkError } = await supabase
        .from('appointments')
        .select('id')
        .eq('doctor_id', appointmentData.doctor_id)
        .eq('appointment_date', appointmentData.appointment_date)
        .eq('appointment_time', appointmentData.appointment_time)
        .eq('status', 'scheduled')
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingAppointment) {
        toast({
          title: 'Slot Unavailable',
          description: 'This time slot has already been booked. Please select another time.',
          variant: 'destructive',
        });
        return null;
      }

      // Create the appointment
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          ...appointmentData,
          status: 'scheduled',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      // Create a notification for the patient
      await supabase
        .from('notifications')
        .insert({
          user_id: appointmentData.patient_id,
          title: 'Appointment Scheduled',
          message: `Your appointment has been scheduled for ${new Date(appointmentData.appointment_date).toLocaleDateString()} at ${appointmentData.appointment_time}`,
          type: 'appointment',
          read: false,
        });

      toast({
        title: 'Success',
        description: 'Appointment booked successfully',
      });

      return data;
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to book appointment',
        variant: 'destructive',
      });
      return null;
    } finally {
      setCreating(false);
    }
  };

  return { createAppointment, creating };
};

// Hook for getting doctor's booked appointments
export const useDoctorAppointments = (doctorId?: string, date?: string) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctorId && date) {
      fetchBookedSlots();
    }
  }, [doctorId, date]);

  const fetchBookedSlots = async () => {
    if (!doctorId || !date) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('doctor_id', doctorId)
        .eq('appointment_date', date)
        .eq('status', 'scheduled');

      if (error) throw error;

      const slots = data?.map(apt => apt.appointment_time) || [];
      setBookedSlots(slots);
    } catch (error: any) {
      console.error('Error fetching booked slots:', error);
    } finally {
      setLoading(false);
    }
  };

  return { bookedSlots, loading, refetch: fetchBookedSlots };
};
