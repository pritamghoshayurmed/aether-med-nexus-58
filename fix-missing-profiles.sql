-- SQL Script to Fix Missing Profiles for Authenticated Users
-- Run this in your Supabase SQL Editor to create missing profiles

-- This query will show all authenticated users without profiles
SELECT 
    au.id,
    au.email,
    au.created_at,
    au.raw_user_meta_data
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- Create missing profiles for authenticated users
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    COALESCE(
        au.raw_user_meta_data->>'full_name',
        SPLIT_PART(au.email, '@', 1)
    ) as full_name,
    COALESCE(
        au.raw_user_meta_data->>'role',
        'patient'
    ) as role,
    au.created_at,
    NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Create missing patient records for users with patient role
INSERT INTO public.patients (user_id, created_at, updated_at)
SELECT 
    p.id,
    NOW(),
    NOW()
FROM public.profiles p
LEFT JOIN public.patients pat ON p.id = pat.user_id
WHERE p.role = 'patient' AND pat.id IS NULL
ON CONFLICT (user_id) DO NOTHING;

-- Verify the fix
SELECT 
    'Profiles Created' as status,
    COUNT(*) as count
FROM public.profiles
UNION ALL
SELECT 
    'Patients Created' as status,
    COUNT(*) as count
FROM public.patients;

-- Show current user's status (replace the UUID with your user ID)
-- SELECT 
--     au.id as user_id,
--     au.email,
--     p.id as profile_id,
--     p.full_name,
--     p.role,
--     pat.id as patient_id
-- FROM auth.users au
-- LEFT JOIN public.profiles p ON au.id = p.id
-- LEFT JOIN public.patients pat ON p.id = pat.user_id
-- WHERE au.id = 'db70b3b2-b965-4699-9faa-ba62c7b7f028';
