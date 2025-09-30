# Quick Start: Authentication Setup

## Step-by-Step Setup

### 1. Database Setup

Run these SQL files in your Supabase SQL Editor **in this exact order**:

```sql
-- First: Run supabase-schema.sql
-- This creates the base tables

-- Second: Run supabase-schema-update.sql  
-- This adds chat and conversation features

-- Third: Run supabase-auth-schema.sql
-- This adds authentication extensions and Remember Me functionality
```

### 2. Verify Tables Created

After running the SQL files, verify these tables exist in Supabase:

**Core Tables:**
- ✅ profiles
- ✅ patients
- ✅ doctors
- ✅ hospitals
- ✅ super_admins

**Auth Tables:**
- ✅ user_sessions
- ✅ doctor_verification_requests
- ✅ hospital_verification_requests

### 3. Test Each User Type

#### Test 1: Patient Registration & Login

```
1. Navigate to: http://localhost:5173/register
2. Select: Patient
3. Fill in:
   - Name: Test Patient
   - Email: patient@test.com
   - Password: test123
   - Confirm Password: test123
   - ✓ Accept Terms
4. Click: Create account as Patient
5. Navigate to: http://localhost:5173/login
6. Select: Patient
7. Enter credentials
8. ✓ Check Remember Me
9. Click: Sign In as Patient
10. Should redirect to: /dashboard/patient
```

#### Test 2: Doctor Registration & Login

```
1. Navigate to: http://localhost:5173/register
2. Select: Doctor
3. Fill in:
   - Name: Dr. Test Doctor
   - Email: doctor@test.com
   - Password: test123
   - Confirm Password: test123
   - Specialty: Cardiology
   - License Number: DOC123456
   - ✓ Accept Terms
4. Click: Create account as Doctor
5. Navigate to: http://localhost:5173/login
6. Select: Doctor
7. Enter credentials
8. ✓ Check Remember Me
9. Click: Sign In as Doctor
10. Should redirect to: /dashboard/doctor
```

#### Test 3: Hospital Registration & Login

```
1. Navigate to: http://localhost:5173/register
2. Select: Hospital/Clinic
3. Fill in:
   - Name: Hospital Admin
   - Email: hospital@test.com
   - Password: test123
   - Confirm Password: test123
   - Hospital Name: City General Hospital
   - Registration Number: HSP123456
   - ✓ Accept Terms
4. Click: Create account as Hospital/Clinic
5. Navigate to: http://localhost:5173/login
6. Select: Hospital
7. Enter credentials
8. ✓ Check Remember Me
9. Click: Sign In as Hospital
10. Should redirect to: /dashboard/hospital
```

#### Test 4: Super Admin Registration & Login

```
1. Navigate to: http://localhost:5173/register
2. Select: Admin
3. Fill in:
   - Name: Super Admin
   - Email: admin@test.com
   - Password: test123
   - Confirm Password: test123
   - ✓ Accept Terms
4. Click: Create account as Admin
5. Navigate to: http://localhost:5173/login
6. Select: Admin
7. Enter credentials
8. ✓ Check Remember Me
9. Click: Sign In as Admin
10. Should redirect to: /dashboard/super-admin
```

### 4. Test Remember Me Feature

```
1. Log in with any account with "Remember Me" checked
2. After successful login, open Browser DevTools
3. Go to Application > Local Storage
4. Verify these keys exist:
   - rememberMe: "true"
   - sessionToken: (UUID value)
   - userRole: (patient/doctor/hospital/admin)
5. Close the browser completely
6. Reopen browser
7. Navigate to: http://localhost:5173/login
8. Should automatically redirect to dashboard (1-2 seconds)
```

### 5. Test Role Verification

```
1. Create a doctor account (doctor@test.com)
2. Go to login page
3. Select: Patient (wrong role)
4. Enter doctor credentials
5. Click Sign In
6. Should see error: "Invalid role for this account"
7. Select: Doctor (correct role)
8. Enter same credentials
9. Should successfully log in
```

### 6. Verify Database Records

After creating test accounts, check Supabase:

**Check profiles table:**
```sql
SELECT id, email, full_name, role, created_at 
FROM profiles 
ORDER BY created_at DESC;
```

**Check user_sessions table (after Remember Me login):**
```sql
SELECT 
  user_id, 
  session_token, 
  remember_me, 
  expires_at,
  created_at,
  last_accessed
FROM user_sessions 
WHERE remember_me = true
ORDER BY created_at DESC;
```

**Check doctors table:**
```sql
SELECT 
  d.id,
  p.full_name,
  d.specialty,
  d.license_number,
  d.created_at
FROM doctors d
JOIN profiles p ON d.user_id = p.id;
```

**Check hospitals table:**
```sql
SELECT 
  h.id,
  p.full_name as admin_name,
  h.hospital_name,
  h.registration_number,
  h.verified,
  h.created_at
FROM hospitals h
JOIN profiles p ON h.user_id = p.id;
```

**Check verification requests:**
```sql
-- Doctor verifications
SELECT * FROM doctor_verification_requests ORDER BY submitted_at DESC;

-- Hospital verifications
SELECT * FROM hospital_verification_requests ORDER BY submitted_at DESC;
```

### 7. Common Issues & Solutions

#### Issue: "profiles" table doesn't exist
**Solution:** Run `supabase-schema.sql` first

#### Issue: "user_sessions" table doesn't exist  
**Solution:** Run `supabase-auth-schema.sql`

#### Issue: Can't create doctor/hospital
**Solution:** Ensure `doctors` and `hospitals` tables exist from auth schema

#### Issue: Remember Me not working
**Solution:** 
1. Check browser localStorage has the keys
2. Verify user_sessions table has a record
3. Check RLS policies are enabled

#### Issue: Auto-redirect too fast/slow
**Solution:** Adjust timeout in Login.tsx (currently 1000ms)

#### Issue: Role verification error
**Solution:** Make sure role in profiles table matches login selection

### 8. Clean Up Test Data

To remove test accounts:

```sql
-- Delete a specific test user (cascades to all related tables)
DELETE FROM auth.users 
WHERE email = 'patient@test.com';

-- Or clean up all test sessions
DELETE FROM user_sessions 
WHERE expires_at < NOW();
```

## Production Checklist

Before deploying to production:

- [ ] Change default passwords
- [ ] Enable email verification in Supabase Auth
- [ ] Set up proper CORS policies
- [ ] Configure rate limiting
- [ ] Enable 2FA for admin accounts
- [ ] Set up monitoring and alerts
- [ ] Review and test all RLS policies
- [ ] Enable audit logging
- [ ] Set up automated session cleanup
- [ ] Configure password complexity requirements
- [ ] Test account recovery flow
- [ ] Set up SSL/HTTPS

## Next Steps

After authentication is working:

1. **Build Dashboard Pages:**
   - Create/update `/dashboard/patient`
   - Create/update `/dashboard/doctor`
   - Create/update `/dashboard/hospital`
   - Create/update `/dashboard/super-admin`

2. **Add Protected Routes:**
   - Use `ProtectedRoute` component
   - Verify user role matches route requirement

3. **Implement Verification Flow:**
   - Admin panel to approve doctors
   - Admin panel to approve hospitals
   - Email notifications for approvals

4. **Add Profile Management:**
   - Edit profile information
   - Change password
   - Update role-specific details
   - Upload verification documents

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs
3. Verify all SQL scripts ran successfully
4. Review RLS policies in Supabase dashboard
5. Test with Supabase anonymous key temporarily to isolate RLS issues

## Testing Credentials

For development/testing, use these credentials:

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Patient | patient@test.com | test123 | Full access |
| Doctor | doctor@test.com | test123 | Needs verification |
| Hospital | hospital@test.com | test123 | Needs verification |
| Admin | admin@test.com | test123 | Full access |

**⚠️ Never use these in production!**
