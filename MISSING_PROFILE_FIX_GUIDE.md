# Missing Profile Error - Complete Fix Guide

## Error Summary
```
Error: PGRST116 - Cannot coerce the result to a single JSON object
Error: violates foreign key constraint "patients_user_id_fkey"
```

## Root Cause
The user is authenticated (has a user ID in `auth.users`) but doesn't have a corresponding record in the `profiles` table. This creates a cascading failure where:
1. Profile fetch fails → returns null
2. Patient record can't be created → foreign key constraint violation (needs profile to exist first)
3. Settings page shows blank data → no profile or patient data available

## Why This Happens
This typically occurs when:
- Signup process was interrupted
- Database trigger failed during signup
- RLS policies blocked the profile creation
- Manual database changes were made

## Immediate Fix for Current Users

### Option 1: Run SQL Script (RECOMMENDED)
1. Open your Supabase Dashboard
2. Go to SQL Editor
3. Run the script from `fix-missing-profiles.sql`
4. This will:
   - Find all authenticated users without profiles
   - Create missing profile records
   - Create missing patient records
   - Link them properly

### Option 2: Manual Profile Creation
Run this SQL for the specific user:

```sql
-- Replace YOUR_USER_ID with actual user ID: db70b3b2-b965-4699-9faa-ba62c7b7f028
BEGIN;

-- Create profile
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'full_name', SPLIT_PART(email, '@', 1)),
    'patient',
    created_at,
    NOW()
FROM auth.users
WHERE id = 'db70b3b2-b965-4699-9faa-ba62c7b7f028'
ON CONFLICT (id) DO NOTHING;

-- Create patient record
INSERT INTO public.patients (user_id, created_at, updated_at)
VALUES ('db70b3b2-b965-4699-9faa-ba62c7b7f028', NOW(), NOW())
ON CONFLICT (user_id) DO NOTHING;

COMMIT;
```

### Option 3: User Re-authentication (Automatic Fix)
With the new code changes, users can now:
1. Log out completely
2. Log back in
3. The system will automatically detect missing profile
4. Create profile and patient records automatically

## Code Changes Made

### 1. AuthContext.tsx - Auto Profile Creation
Added `createProfileFromAuthUser()` function that:
- Detects when profile is missing (PGRST116 error)
- Fetches user data from auth
- Creates profile record automatically
- Creates patient record if role is patient

### 2. useDatabase.ts - Better Error Handling
Enhanced `createPatientRecord()` to:
- Check if profile exists before creating patient
- Handle duplicate records gracefully
- Provide helpful error messages
- Guide users to re-login if needed

### 3. Improved Error Messages
Users now see clear instructions:
- "Profile Setup Required"
- "Please log out and log in again"
- Specific error codes for debugging

## Testing the Fix

### Step 1: Verify Current State
Run in Supabase SQL Editor:
```sql
SELECT 
    au.id as user_id,
    au.email,
    p.id as has_profile,
    pat.id as has_patient
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
LEFT JOIN public.patients pat ON p.id = pat.user_id
WHERE au.id = 'db70b3b2-b965-4699-9faa-ba62c7b7f028';
```

### Step 2: Apply Fix
Choose one of the fix options above and apply it.

### Step 3: Verify Fix
Run the same query again. You should now see:
- `has_profile`: UUID (not null)
- `has_patient`: UUID (not null)

### Step 4: Test in App
1. Refresh the page
2. Check browser console - should see:
   ```
   Profile loaded successfully: {id: "...", email: "...", ...}
   Patient data loaded successfully: {id: "...", user_id: "...", ...}
   ```
3. Go to Settings page
4. Data should load properly
5. Try editing and saving data
6. Refresh page - data should persist

## Preventing Future Occurrences

### 1. Ensure RLS Policies Allow INSERT
Check these policies exist:

```sql
-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow users to insert their own patient record
CREATE POLICY "Users can insert patient record" ON patients 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());
```

### 2. Create Database Trigger (RECOMMENDED)
Add this trigger to auto-create profiles:

```sql
-- Function to create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')
  );
  
  -- If patient, also create patient record
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'patient') = 'patient' THEN
    INSERT INTO public.patients (user_id)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3. Improve Signup Flow
Ensure signup code includes profile creation:

```typescript
const { data: authData, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: fullName,
      role: role,
    },
  },
});

// Explicitly create profile
if (authData.user) {
  await supabase.from('profiles').insert({
    id: authData.user.id,
    email: email,
    full_name: fullName,
    role: role,
  });
}
```

## Troubleshooting

### Issue: "Still seeing PGRST116 error"
**Solution**: Clear browser cache and localStorage, then log in again.

### Issue: "Profile created but patient not created"
**Solution**: Run this SQL:
```sql
INSERT INTO public.patients (user_id)
SELECT id FROM public.profiles 
WHERE role = 'patient' 
AND id NOT IN (SELECT user_id FROM public.patients);
```

### Issue: "406 Not Acceptable error"
**Cause**: API can't return the data format requested
**Solution**: Check RLS policies allow SELECT on the table

### Issue: "User keeps getting logged out"
**Solution**: The auth session is valid, but profile is missing. Apply one of the fix options above.

## Summary

The fix includes:
✅ Automatic profile creation on login
✅ Better error messages
✅ SQL script to fix existing users
✅ Database trigger to prevent future issues
✅ Improved error handling throughout

All users should now either:
1. Have profiles auto-created on next login, OR
2. Be guided to re-authenticate with clear instructions

Run the SQL script for immediate fix of all affected users!
