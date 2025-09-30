-- Additional tables for Hospital/Clinic and Super Admin users
-- Run this after the main supabase-schema.sql

-- Hospitals/Clinics table
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  hospital_name TEXT NOT NULL,
  hospital_type TEXT CHECK (hospital_type IN ('hospital', 'clinic', 'diagnostic_center', 'pharmacy')),
  registration_number TEXT UNIQUE NOT NULL,
  license_number TEXT,
  accreditation TEXT,
  phone_number TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'India',
  website TEXT,
  established_year INTEGER,
  bed_capacity INTEGER,
  specialties TEXT[],
  facilities TEXT[],
  operating_hours JSONB,
  emergency_services BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Super Admin table
CREATE TABLE IF NOT EXISTS super_admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  admin_level TEXT DEFAULT 'standard' CHECK (admin_level IN ('standard', 'senior', 'master')),
  department TEXT,
  permissions JSONB DEFAULT '{"all": true}'::jsonb,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doctor verification requests (for admin approval)
CREATE TABLE IF NOT EXISTS doctor_verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  license_number TEXT NOT NULL,
  license_document_url TEXT,
  qualification_document_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES super_admins(id) ON DELETE SET NULL,
  review_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Hospital verification requests (for admin approval)
CREATE TABLE IF NOT EXISTS hospital_verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  registration_number TEXT NOT NULL,
  registration_document_url TEXT,
  license_document_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES super_admins(id) ON DELETE SET NULL,
  review_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Session persistence table for "Remember Me" functionality
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  device_info TEXT,
  ip_address TEXT,
  user_agent TEXT,
  remember_me BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hospitals_user ON hospitals(user_id);
CREATE INDEX IF NOT EXISTS idx_hospitals_verified ON hospitals(verified);
CREATE INDEX IF NOT EXISTS idx_super_admins_user ON super_admins(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_verifications_doctor ON doctor_verification_requests(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_verifications_status ON doctor_verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_hospital_verifications_hospital ON hospital_verification_requests(hospital_id);
CREATE INDEX IF NOT EXISTS idx_hospital_verifications_status ON hospital_verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);

-- Enable Row Level Security
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE super_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hospitals
CREATE POLICY "Hospitals can view own data" ON hospitals 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Hospitals can update own data" ON hospitals 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Public can view verified hospitals" ON hospitals 
FOR SELECT USING (verified = TRUE);

CREATE POLICY "Admins can view all hospitals" ON hospitals 
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for super_admins
CREATE POLICY "Admins can view own data" ON super_admins 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can update own data" ON super_admins 
FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for doctor verification requests
CREATE POLICY "Doctors can view own verification requests" ON doctor_verification_requests 
FOR SELECT USING (
  doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
);

CREATE POLICY "Doctors can create verification requests" ON doctor_verification_requests 
FOR INSERT WITH CHECK (
  doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can view all doctor verifications" ON doctor_verification_requests 
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for hospital verification requests
CREATE POLICY "Hospitals can view own verification requests" ON hospital_verification_requests 
FOR SELECT USING (
  hospital_id IN (SELECT id FROM hospitals WHERE user_id = auth.uid())
);

CREATE POLICY "Hospitals can create verification requests" ON hospital_verification_requests 
FOR INSERT WITH CHECK (
  hospital_id IN (SELECT id FROM hospitals WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can view all hospital verifications" ON hospital_verification_requests 
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for user_sessions
CREATE POLICY "Users can view own sessions" ON user_sessions 
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own sessions" ON user_sessions 
FOR ALL USING (user_id = auth.uid());

-- Triggers for updated_at
CREATE TRIGGER update_hospitals_updated_at BEFORE UPDATE ON hospitals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_super_admins_updated_at BEFORE UPDATE ON super_admins
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM user_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up expired sessions (requires pg_cron extension)
-- This can also be done via Supabase Database Webhooks or a cron job
-- SELECT cron.schedule('cleanup-expired-sessions', '0 0 * * *', 'SELECT cleanup_expired_sessions();');
