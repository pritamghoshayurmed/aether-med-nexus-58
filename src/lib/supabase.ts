import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL || 'https://nlcwteteanrcmcofjxte.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sY3d0ZXRlYW5yY21jb2ZqeHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDIyNzIsImV4cCI6MjA3NDgxODI3Mn0.OSLNnNbCA8IhowVzen4BH8nILpADkRnbr4GsH24gjgE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'patient' | 'doctor' | 'hospital' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  user_id: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  phone_number?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_number?: string;
  medical_history?: string;
  allergies?: string;
  current_medications?: string;
  insurance_provider?: string;
  insurance_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: 'video' | 'in-person' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  reason?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Vital {
  id: string;
  patient_id: string;
  recorded_at: string;
  heart_rate?: number;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  temperature?: number;
  oxygen_saturation?: number;
  respiratory_rate?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  notes?: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id?: string;
  prescribed_date: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export interface LabResult {
  id: string;
  patient_id: string;
  test_name: string;
  test_date: string;
  result_date: string;
  results: any; // JSON field
  status: 'pending' | 'completed' | 'cancelled';
  lab_name?: string;
  doctor_id?: string;
  notes?: string;
  file_url?: string;
  created_at: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  record_type: 'diagnosis' | 'procedure' | 'imaging' | 'document';
  title: string;
  description?: string;
  record_date: string;
  doctor_id?: string;
  file_url?: string;
  file_type?: string;
  notes?: string;
  created_at: string;
}

export interface FamilyMember {
  id: string;
  patient_id: string;
  name: string;
  relationship: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  medical_conditions?: string;
  emergency_contact: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medication' | 'lab_result' | 'general' | 'emergency';
  read: boolean;
  action_url?: string;
  created_at: string;
}

export interface Billing {
  id: string;
  patient_id: string;
  appointment_id?: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  due_date: string;
  paid_date?: string;
  payment_method?: string;
  invoice_url?: string;
  created_at: string;
}
