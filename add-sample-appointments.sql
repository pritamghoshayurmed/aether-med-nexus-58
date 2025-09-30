-- Quick Sample Appointments Setup
-- This script helps you add sample appointments for testing

-- Step 1: Find your patient ID (must be logged in as patient)
DO $$
DECLARE
  v_patient_id UUID;
  v_doctor_ids UUID[];
BEGIN
  -- Get patient ID for current user
  SELECT id INTO v_patient_id FROM patients WHERE user_id = auth.uid();
  
  IF v_patient_id IS NULL THEN
    RAISE NOTICE 'No patient record found for current user. Please ensure you are logged in as a patient.';
    RETURN;
  END IF;

  -- Get available doctor IDs
  SELECT ARRAY_AGG(id) INTO v_doctor_ids FROM doctors LIMIT 3;
  
  IF ARRAY_LENGTH(v_doctor_ids, 1) IS NULL THEN
    RAISE NOTICE 'No doctors found in database. Please add doctors first.';
    RETURN;
  END IF;

  RAISE NOTICE 'Patient ID: %', v_patient_id;
  RAISE NOTICE 'Available Doctors: %', v_doctor_ids;
  
END $$;

-- Step 2: Insert sample appointments
-- Replace the patient_id and doctor_id values with actual UUIDs from Step 1

-- Example: Upcoming Video Appointment
INSERT INTO appointments (
  patient_id, 
  doctor_id, 
  appointment_date, 
  appointment_time,
  appointment_type,
  status,
  reason,
  consultation_fee,
  meeting_link
) 
SELECT 
  p.id as patient_id,
  d.id as doctor_id,
  CURRENT_DATE + INTERVAL '7 days' as appointment_date,
  '10:00:00'::TIME as appointment_time,
  'video' as appointment_type,
  'scheduled' as status,
  'Regular checkup and consultation' as reason,
  150.00 as consultation_fee,
  'https://meet.example.com/abc123' as meeting_link
FROM patients p
CROSS JOIN doctors d
WHERE p.user_id = auth.uid()
LIMIT 1
ON CONFLICT DO NOTHING;

-- Example: Upcoming In-Person Appointment
INSERT INTO appointments (
  patient_id, 
  doctor_id, 
  appointment_date, 
  appointment_time,
  appointment_type,
  status,
  reason,
  consultation_fee
) 
SELECT 
  p.id,
  d.id,
  CURRENT_DATE + INTERVAL '14 days',
  '14:30:00'::TIME,
  'in-person',
  'scheduled',
  'Follow-up examination',
  120.00
FROM patients p
CROSS JOIN doctors d
WHERE p.user_id = auth.uid()
  AND d.specialty = 'Cardiology'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Example: Completed Past Appointment
INSERT INTO appointments (
  patient_id, 
  doctor_id, 
  appointment_date, 
  appointment_time,
  appointment_type,
  status,
  reason,
  consultation_fee,
  notes
) 
SELECT 
  p.id,
  d.id,
  CURRENT_DATE - INTERVAL '15 days',
  '09:00:00'::TIME,
  'in-person',
  'completed',
  'Annual physical examination',
  180.00,
  'Patient in good health. Recommended regular exercise and balanced diet.'
FROM patients p
CROSS JOIN doctors d
WHERE p.user_id = auth.uid()
LIMIT 1
ON CONFLICT DO NOTHING;

-- Example: Cancelled Appointment
INSERT INTO appointments (
  patient_id, 
  doctor_id, 
  appointment_date, 
  appointment_time,
  appointment_type,
  status,
  reason,
  consultation_fee,
  notes
) 
SELECT 
  p.id,
  d.id,
  CURRENT_DATE - INTERVAL '30 days',
  '16:00:00'::TIME,
  'phone',
  'cancelled',
  'Dental consultation',
  100.00,
  'Cancelled by patient due to scheduling conflict'
FROM patients p
CROSS JOIN doctors d
WHERE p.user_id = auth.uid()
LIMIT 1
ON CONFLICT DO NOTHING;

-- Step 3: Verify appointments were created
SELECT 
  a.id,
  a.appointment_date,
  a.appointment_time,
  a.appointment_type,
  a.status,
  a.reason,
  a.consultation_fee,
  prof.full_name as doctor_name,
  d.specialty as doctor_specialty
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
JOIN profiles prof ON d.user_id = prof.id
JOIN patients p ON a.patient_id = p.id
WHERE p.user_id = auth.uid()
ORDER BY a.appointment_date DESC;

-- Step 4: Count appointments by status
SELECT 
  status,
  COUNT(*) as count
FROM appointments a
JOIN patients p ON a.patient_id = p.id
WHERE p.user_id = auth.uid()
GROUP BY status;
