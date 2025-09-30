-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('patient', 'doctor', 'hospital', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patients table (extended patient information)
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  blood_group TEXT,
  phone_number TEXT,
  address TEXT,
  emergency_contact_name TEXT,
  emergency_contact_number TEXT,
  medical_history TEXT,
  allergies TEXT,
  current_medications TEXT,
  insurance_provider TEXT,
  insurance_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  specialty TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  years_of_experience INTEGER,
  qualification TEXT,
  consultation_fee DECIMAL(10, 2),
  available_days TEXT[], -- Array of days: ['monday', 'tuesday', ...]
  available_time_slots JSONB, -- JSON object with time slots
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  appointment_type TEXT CHECK (appointment_type IN ('video', 'in-person', 'phone')),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  reason TEXT,
  notes TEXT,
  consultation_fee DECIMAL(10, 2),
  meeting_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vitals table
CREATE TABLE IF NOT EXISTS vitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  heart_rate INTEGER,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  temperature DECIMAL(4, 2),
  oxygen_saturation INTEGER,
  respiratory_rate INTEGER,
  weight DECIMAL(5, 2),
  height DECIMAL(5, 2),
  bmi DECIMAL(4, 2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  prescribed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  instructions TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lab Results table
CREATE TABLE IF NOT EXISTS lab_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  test_date DATE NOT NULL,
  result_date DATE,
  results JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  lab_name TEXT,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  notes TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medical Records table
CREATE TABLE IF NOT EXISTS medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  record_type TEXT CHECK (record_type IN ('diagnosis', 'procedure', 'imaging', 'document')),
  title TEXT NOT NULL,
  description TEXT,
  record_date DATE NOT NULL,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  file_url TEXT,
  file_type TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family Members table
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  blood_group TEXT,
  medical_conditions TEXT,
  emergency_contact BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('appointment', 'medication', 'lab_result', 'general', 'emergency')),
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Billing table
CREATE TABLE IF NOT EXISTS billing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  paid_date DATE,
  payment_method TEXT,
  invoice_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_vitals_patient ON vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_lab_results_patient ON lab_results(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_patient ON billing(patient_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for patients
CREATE POLICY "Patients can view own data" ON patients FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Patients can update own data" ON patients FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Doctors can view patient data" ON patients FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'doctor'
  )
);

-- RLS Policies for appointments
CREATE POLICY "Patients can view own appointments" ON appointments FOR SELECT USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);
CREATE POLICY "Doctors can view their appointments" ON appointments FOR SELECT USING (
  doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
);
CREATE POLICY "Patients can create appointments" ON appointments FOR INSERT WITH CHECK (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- RLS Policies for vitals
CREATE POLICY "Patients can view own vitals" ON vitals FOR SELECT USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);
CREATE POLICY "Patients can insert own vitals" ON vitals FOR INSERT WITH CHECK (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- RLS Policies for prescriptions
CREATE POLICY "Patients can view own prescriptions" ON prescriptions FOR SELECT USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);
CREATE POLICY "Doctors can create prescriptions" ON prescriptions FOR INSERT WITH CHECK (
  doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
);

-- RLS Policies for lab_results
CREATE POLICY "Patients can view own lab results" ON lab_results FOR SELECT USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- RLS Policies for medical_records
CREATE POLICY "Patients can view own medical records" ON medical_records FOR SELECT USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- RLS Policies for family_members
CREATE POLICY "Patients can manage family members" ON family_members FOR ALL USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for billing
CREATE POLICY "Patients can view own billing" ON billing FOR SELECT USING (
  patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
