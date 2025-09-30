-- Fix RLS policies for profiles table to allow signup

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Recreate policies with INSERT permission
CREATE POLICY "Users can view own profile" ON profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- CRITICAL: Allow users to insert their own profile during signup
CREATE POLICY "Users can insert own profile" ON profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Also add INSERT policies for role-specific tables
DROP POLICY IF EXISTS "Users can insert patient record" ON patients;
DROP POLICY IF EXISTS "Users can insert doctor record" ON doctors;

CREATE POLICY "Users can insert patient record" ON patients 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert doctor record" ON doctors 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

-- Add missing hospitals table if it doesn't exist
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  hospital_name TEXT NOT NULL,
  hospital_type TEXT CHECK (hospital_type IN ('hospital', 'clinic', 'diagnostic_center')),
  registration_number TEXT UNIQUE NOT NULL,
  address TEXT,
  phone_number TEXT,
  email TEXT,
  website TEXT,
  total_beds INTEGER,
  available_beds INTEGER,
  facilities TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing super_admins table if it doesn't exist
CREATE TABLE IF NOT EXISTS super_admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  admin_level TEXT CHECK (admin_level IN ('standard', 'super', 'master')),
  permissions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing verification tables
CREATE TABLE IF NOT EXISTS doctor_verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  license_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS hospital_verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  registration_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  notes TEXT
);

-- Enable RLS for new tables
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE super_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_verification_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for hospitals if they exist
DROP POLICY IF EXISTS "Users can insert hospital record" ON hospitals;
DROP POLICY IF EXISTS "Hospitals can view own data" ON hospitals;
DROP POLICY IF EXISTS "Hospitals can update own data" ON hospitals;

-- RLS Policies for hospitals
CREATE POLICY "Users can insert hospital record" ON hospitals 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Hospitals can view own data" ON hospitals 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Hospitals can update own data" ON hospitals 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Drop existing policies for super_admins if they exist
DROP POLICY IF EXISTS "Users can insert admin record" ON super_admins;
DROP POLICY IF EXISTS "Admins can view own data" ON super_admins;

-- RLS Policies for super_admins
CREATE POLICY "Users can insert admin record" ON super_admins 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view own data" ON super_admins 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Add trigger for hospitals updated_at
DROP TRIGGER IF EXISTS update_hospitals_updated_at ON hospitals;
CREATE TRIGGER update_hospitals_updated_at BEFORE UPDATE ON hospitals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add user_sessions table for remember me functionality
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  remember_me BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  device_info TEXT,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can manage own sessions" ON user_sessions;

CREATE POLICY "Users can manage own sessions" ON user_sessions 
  FOR ALL 
  USING (user_id = auth.uid());

-- Drop existing indexes if they exist, then create
DROP INDEX IF EXISTS idx_user_sessions_token;
DROP INDEX IF EXISTS idx_user_sessions_user;

CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
