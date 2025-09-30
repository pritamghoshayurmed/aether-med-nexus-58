-- Sample SQL to add doctor accounts for testing
-- Run this after setting up the main schema
-- IMPORTANT: Update the email addresses and create these users in Supabase Auth first

-- Note: Before running this, you need to:
-- 1. Create doctor user accounts in Supabase Auth dashboard (Authentication > Users)
-- 2. Copy their user IDs and replace the UUIDs below

-- Sample Doctor 1: Cardiologist
-- First create user in Auth with email: doctor1@example.com, password: Doctor123!
-- Then update the UUID below with the actual user ID from auth.users

-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-1', 'doctor1@example.com', 'Dr. Sarah Johnson', 'doctor');

-- INSERT INTO doctors (user_id, specialty, license_number, years_of_experience, qualification, consultation_fee, available_days, available_time_slots, rating, total_reviews)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-1', 
--    'Cardiology', 
--    'MED-CARD-2024-001', 
--    15, 
--    'MD - Cardiology, MBBS', 
--    150.00,
--    ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
--    '{"monday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"], 
--      "tuesday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"],
--      "wednesday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"],
--      "thursday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"],
--      "friday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM"],
--      "saturday": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"]}'::jsonb,
--    4.9,
--    324);

-- Sample Doctor 2: General Medicine
-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-2', 'doctor2@example.com', 'Dr. Michael Chen', 'doctor');

-- INSERT INTO doctors (user_id, specialty, license_number, years_of_experience, qualification, consultation_fee, available_days, available_time_slots, rating, total_reviews)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-2', 
--    'General Medicine', 
--    'MED-GEN-2024-002', 
--    12, 
--    'MD - General Medicine, MBBS', 
--    120.00,
--    ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
--    '{"monday": ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"], 
--      "tuesday": ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"],
--      "wednesday": ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"],
--      "thursday": ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"],
--      "friday": ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM"]}'::jsonb,
--    4.8,
--    256);

-- Sample Doctor 3: Dermatology
-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-3', 'doctor3@example.com', 'Dr. Emily Rodriguez', 'doctor');

-- INSERT INTO doctors (user_id, specialty, license_number, years_of_experience, qualification, consultation_fee, available_days, available_time_slots, rating, total_reviews)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-3', 
--    'Dermatology', 
--    'MED-DERM-2024-003', 
--    10, 
--    'MD - Dermatology, MBBS, DNB', 
--    180.00,
--    ARRAY['tuesday', 'thursday', 'friday', 'saturday'],
--    '{"tuesday": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
--      "thursday": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
--      "friday": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
--      "saturday": ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"]}'::jsonb,
--    4.7,
--    189);

-- Sample Doctor 4: Orthopedics
-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-4', 'doctor4@example.com', 'Dr. James Wilson', 'doctor');

-- INSERT INTO doctors (user_id, specialty, license_number, years_of_experience, qualification, consultation_fee, available_days, available_time_slots, rating, total_reviews)
-- VALUES 
--   ('REPLACE-WITH-ACTUAL-USER-ID-4', 
--    'Orthopedics', 
--    'MED-ORTHO-2024-004', 
--    18, 
--    'MS - Orthopedics, MBBS', 
--    200.00,
--    ARRAY['monday', 'wednesday', 'friday'],
--    '{"monday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM"],
--      "wednesday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "03:00 PM", "03:30 PM", "04:00 PM"],
--      "friday": ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"]}'::jsonb,
--    4.9,
--    412);

-- INSTRUCTIONS TO USE THIS FILE:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add user" > "Create new user"
-- 3. Enter email (e.g., doctor1@example.com) and password
-- 4. After creating, copy the User UID
-- 5. Uncomment the INSERT statements above
-- 6. Replace 'REPLACE-WITH-ACTUAL-USER-ID-X' with the actual UUID
-- 7. Run the SQL in Supabase SQL Editor
-- 8. Repeat for all doctors you want to add

-- Alternative: Quick test data (if you want to manually create users first)
-- This will fail if the user IDs don't exist in auth.users
-- Make sure to create the auth users FIRST before running these inserts
