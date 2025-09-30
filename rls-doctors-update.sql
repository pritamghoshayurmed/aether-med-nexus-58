-- RLS Policy Update for Doctors Table
-- This allows patients to view all doctors for appointment booking
-- Run this in Supabase SQL Editor

-- First, drop the existing restrictive policy if it exists
DROP POLICY IF EXISTS "Doctors can view their own data" ON doctors;

-- Allow everyone (authenticated users) to view doctor profiles
CREATE POLICY "Allow all authenticated users to view doctors" ON doctors
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow doctors to update their own profile
CREATE POLICY "Doctors can update own profile" ON doctors
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Allow doctors to insert their own profile (for new registrations)
CREATE POLICY "Doctors can insert own profile" ON doctors
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Similarly, update profiles RLS to allow viewing doctor profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Allow users to view own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow viewing profiles of doctors (for appointment booking)
CREATE POLICY "Allow viewing doctor profiles" ON profiles
  FOR SELECT
  USING (
    role = 'doctor' AND auth.role() = 'authenticated'
  );

-- Allow users to update own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
