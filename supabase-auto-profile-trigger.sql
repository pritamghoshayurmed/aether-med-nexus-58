-- Database Trigger to Auto-Create Profiles and Patient Records
-- This prevents the "missing profile" issue by automatically creating records when a user signs up
-- Run this in your Supabase SQL Editor

-- ============================================================
-- FUNCTION: Auto-create profile and patient record after signup
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Get role from metadata, default to 'patient'
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'patient');
  
  -- Log the attempt (optional, for debugging)
  RAISE NOTICE 'Creating profile for user: % with role: %', NEW.id, user_role;
  
  -- Create profile record
  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'fullName',
      SPLIT_PART(NEW.email, '@', 1)
    ),
    user_role,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  -- Create role-specific record based on role
  CASE user_role
    WHEN 'patient' THEN
      INSERT INTO public.patients (user_id, created_at, updated_at)
      VALUES (NEW.id, NOW(), NOW())
      ON CONFLICT (user_id) DO NOTHING;
      
    WHEN 'doctor' THEN
      INSERT INTO public.doctors (
        user_id, 
        specialty, 
        license_number,
        years_of_experience,
        consultation_fee,
        created_at, 
        updated_at
      )
      VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'specialty', 'General Practitioner'),
        COALESCE(NEW.raw_user_meta_data->>'licenseNumber', ''),
        COALESCE((NEW.raw_user_meta_data->>'years_of_experience')::INTEGER, 0),
        COALESCE((NEW.raw_user_meta_data->>'consultation_fee')::DECIMAL, 0),
        NOW(),
        NOW()
      )
      ON CONFLICT (user_id) DO NOTHING;
      
    WHEN 'hospital' THEN
      INSERT INTO public.hospitals (
        user_id,
        hospital_name,
        hospital_type,
        registration_number,
        created_at,
        updated_at
      )
      VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'hospitalName', 'Hospital'),
        COALESCE(NEW.raw_user_meta_data->>'hospitalType', 'hospital'),
        COALESCE(NEW.raw_user_meta_data->>'registrationNumber', ''),
        NOW(),
        NOW()
      )
      ON CONFLICT (user_id) DO NOTHING;
      
    ELSE
      -- Default to patient if role is unknown
      INSERT INTO public.patients (user_id, created_at, updated_at)
      VALUES (NEW.id, NOW(), NOW())
      ON CONFLICT (user_id) DO NOTHING;
  END CASE;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the signup
    RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- ============================================================
-- TRIGGER: Run function after user is created
-- ============================================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FUNCTION: Update updated_at timestamp automatically
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply to all relevant tables if not already present
DO $$ 
BEGIN
  -- Profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_profiles'
  ) THEN
    CREATE TRIGGER set_updated_at_profiles
      BEFORE UPDATE ON public.profiles
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_updated_at();
  END IF;
  
  -- Patients
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_patients'
  ) THEN
    CREATE TRIGGER set_updated_at_patients
      BEFORE UPDATE ON public.patients
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_updated_at();
  END IF;
  
  -- Doctors
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_doctors'
  ) THEN
    CREATE TRIGGER set_updated_at_doctors
      BEFORE UPDATE ON public.doctors
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_updated_at();
  END IF;
  
  -- Hospitals
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_hospitals'
  ) THEN
    CREATE TRIGGER set_updated_at_hospitals
      BEFORE UPDATE ON public.hospitals
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;

-- ============================================================
-- VERIFICATION: Check if trigger is working
-- ============================================================

-- Test query to see if trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Query to verify all users have profiles
SELECT 
  COUNT(*) as total_users,
  COUNT(p.id) as users_with_profiles,
  COUNT(*) - COUNT(p.id) as users_missing_profiles
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id;

-- If any users are missing profiles, this will show them
SELECT 
  au.id,
  au.email,
  au.created_at,
  'Missing Profile' as issue
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- ============================================================
-- NOTES
-- ============================================================

-- This trigger will:
-- 1. Automatically create a profile record when a user signs up
-- 2. Create the appropriate role-specific record (patient/doctor/hospital)
-- 3. Handle errors gracefully without breaking the signup process
-- 4. Use user_metadata from the signup to populate fields

-- To test manually:
-- 1. Create a test user through the signup flow
-- 2. Check if profile and patient/doctor/hospital records are created
-- 3. Verify the trigger fired by checking the logs

-- To rollback (if needed):
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP FUNCTION IF EXISTS public.handle_new_user();
