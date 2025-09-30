-- Verify and Setup Appointments Table
-- Run this in Supabase SQL Editor to verify your appointments table is ready

-- 1. Check if appointments table exists and view its structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'appointments'
ORDER BY ordinal_position;

-- 2. Verify RLS policies for appointments
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'appointments';

-- 3. Count existing appointments by status
SELECT 
  status,
  COUNT(*) as count
FROM appointments
GROUP BY status;

-- 4. Sample query to test appointment fetching with doctor details
-- (This is what the frontend will execute)
SELECT 
  a.*,
  d.id as doctor_id,
  d.specialty,
  d.user_id as doctor_user_id,
  p.full_name as doctor_name,
  p.email as doctor_email
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
JOIN profiles p ON d.user_id = p.id
LIMIT 5;

-- 5. Optional: Insert sample appointment data for testing
-- Uncomment and modify the IDs to match your actual patient_id and doctor_id

/*
INSERT INTO appointments (
  patient_id, 
  doctor_id, 
  appointment_date, 
  appointment_time,
  appointment_type,
  status,
  reason,
  consultation_fee
) VALUES 
  (
    'YOUR_PATIENT_ID_HERE', -- Replace with actual patient UUID
    'YOUR_DOCTOR_ID_HERE',  -- Replace with actual doctor UUID
    '2025-10-15',           -- Appointment date
    '10:00:00',             -- Appointment time
    'video',                -- Type: 'video', 'in-person', or 'phone'
    'scheduled',            -- Status: 'scheduled', 'completed', 'cancelled', 'no-show'
    'Annual checkup',       -- Reason for visit
    150.00                  -- Consultation fee
  ),
  (
    'YOUR_PATIENT_ID_HERE',
    'YOUR_DOCTOR_ID_HERE',
    '2025-10-20',
    '14:30:00',
    'in-person',
    'scheduled',
    'Follow-up consultation',
    120.00
  );
*/

-- 6. Get your patient_id (run this if you're logged in as a patient)
-- SELECT id FROM patients WHERE user_id = auth.uid();

-- 7. Get available doctor_id options
-- SELECT d.id, p.full_name, d.specialty 
-- FROM doctors d 
-- JOIN profiles p ON d.user_id = p.id 
-- LIMIT 10;
