# 🚀 Quick Start Guide - Kabiraj AI Patient Dashboard

## 🎯 What You Have Now

✅ **Complete Authentication System** - Login/Signup with Supabase  
✅ **Protected Routes** - Role-based access control  
✅ **Patient Profile Page** - Fully functional with database integration  
✅ **Patient Dashboard** - Shows real appointments and vitals  
✅ **Database Schema** - Ready to deploy  
✅ **Custom Hooks** - Reusable data operations  

## ⚡ 5-Minute Setup

### Step 1: Run Database Schema (CRITICAL!)

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `nlcwteteanrcmcofjxte`
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Open `supabase-schema.sql` file in your project
6. Copy **ALL** the contents
7. Paste into SQL Editor
8. Click **RUN** (or press Ctrl/Cmd + Enter)
9. Wait for success message
10. Verify in **Table Editor** - you should see 11 tables

**Tables created:**
- profiles
- patients
- doctors
- appointments
- vitals
- prescriptions
- lab_results
- medical_records
- family_members
- notifications
- billing

### Step 2: Start Development Server

```bash
cd d:\KabirajAI\aether-med-nexus-58
npm install  # if not already done
npm run dev
```

### Step 3: Create Your First Patient Account

1. Navigate to: `http://localhost:5173/register`
2. Select **Patient** role
3. Fill in details:
   - Full Name: John Doe
   - Email: john@example.com
   - Password: password123
4. Click **Create account**
5. ✅ Account created!

### Step 4: Login

1. Navigate to: `http://localhost:5173/login`
2. Select **Patient** role
3. Enter credentials
4. Click **Sign In**
5. ✅ Redirected to `/dashboard/patient`

### Step 5: Update Your Profile

1. Click on **User Icon** (top right)
2. Or navigate to: `/dashboard/patient/profile`
3. Click **Edit Profile**
4. Fill in your information
5. Click **Save**
6. ✅ Profile updated in database!

## 📊 Verify Database Integration

### Check Supabase Dashboard

1. Go to **Authentication** tab
   - See your user account created
   
2. Go to **Table Editor** > **profiles**
   - See your profile record
   
3. Go to **Table Editor** > **patients**
   - See your patient record linked to profile

## 🎨 Test Features

### 1. Profile Management ✅
- View profile data
- Edit information
- Update medical history
- Add allergies
- Set emergency contacts

### 2. Dashboard ✅
- See personalized greeting
- View appointments (empty initially)
- Check vitals (none initially)
- Notification counter

### 3. Navigation ✅
- Click quick action buttons
- Use bottom navigation (mobile)
- Test protected routes

## 📝 Add Sample Data (Optional)

### Add Sample Appointment

Go to Supabase **SQL Editor** and run:

```sql
-- First, get your patient ID
SELECT id FROM patients WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'john@example.com'
);

-- Use that ID to create a sample appointment
-- Note: You'll need a doctor first, so let's create one

-- Create a sample doctor
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  gen_random_uuid(),
  'dr.smith@example.com',
  'Dr. Sarah Smith',
  'doctor'
);

-- Get the doctor's profile ID
WITH doctor_profile AS (
  SELECT id FROM profiles WHERE email = 'dr.smith@example.com'
)
INSERT INTO doctors (user_id, specialty, license_number)
SELECT id, 'Cardiologist', 'MED12345'
FROM doctor_profile;

-- Now create an appointment
WITH 
patient_rec AS (SELECT id FROM patients WHERE user_id = (SELECT id FROM auth.users WHERE email = 'john@example.com')),
doctor_rec AS (SELECT id FROM doctors WHERE user_id = (SELECT id FROM profiles WHERE email = 'dr.smith@example.com'))
INSERT INTO appointments (
  patient_id,
  doctor_id,
  appointment_date,
  appointment_time,
  appointment_type,
  status,
  reason
)
SELECT 
  p.id,
  d.id,
  CURRENT_DATE + INTERVAL '2 days',
  '14:00:00',
  'video',
  'scheduled',
  'Regular checkup'
FROM patient_rec p, doctor_rec d;
```

### Add Sample Vitals

```sql
-- Add your vitals
WITH patient_rec AS (
  SELECT id FROM patients WHERE user_id = (
    SELECT id FROM auth.users WHERE email = 'john@example.com'
  )
)
INSERT INTO vitals (
  patient_id,
  heart_rate,
  blood_pressure_systolic,
  blood_pressure_diastolic,
  temperature,
  oxygen_saturation,
  weight,
  height
)
SELECT 
  id,
  72,
  120,
  80,
  98.6,
  98,
  70.5,
  175.0
FROM patient_rec;
```

### Add Sample Notification

```sql
WITH user_rec AS (
  SELECT id FROM auth.users WHERE email = 'john@example.com'
)
INSERT INTO notifications (
  user_id,
  title,
  message,
  type,
  read
)
SELECT
  id,
  'Welcome to Kabiraj AI!',
  'Thank you for joining. Your health journey starts here.',
  'general',
  false
FROM user_rec;
```

## 🔄 Refresh & See Changes

1. Go back to your dashboard: `/dashboard/patient`
2. Refresh the page
3. ✅ See your appointment!
4. ✅ See your vitals!
5. ✅ See notification badge!

## 🎯 Next Steps

### Immediate
- [x] Run database schema
- [x] Create patient account
- [x] Test login
- [x] Update profile
- [ ] Add sample data
- [ ] Test all features

### Short Term
- [ ] Implement Appointments page
- [ ] Implement Vitals tracking page
- [ ] Implement Prescriptions page
- [ ] Implement Notifications page
- [ ] Implement Medical Records

### Long Term
- [ ] File upload for medical records
- [ ] Real-time chat
- [ ] Video calls
- [ ] AI chat integration
- [ ] Analytics dashboard

## 🐛 Troubleshooting

### Issue: Can't login
- Check email/password
- Verify user in Supabase Authentication tab
- Check browser console for errors
- Verify role selected matches database

### Issue: No data showing
- Check if database schema is run
- Verify user is authenticated
- Check browser console for errors
- Verify data exists in Supabase tables

### Issue: Profile not saving
- Check browser console
- Verify RLS policies are created
- Check network tab for API errors
- Verify user has permission

### Issue: Build errors
- Run `npm install`
- Delete `node_modules` and reinstall
- Check TypeScript errors
- Verify all imports are correct

## 📚 File Reference

### Core Files
- `src/lib/supabase.ts` - Database client
- `src/contexts/AuthContext.tsx` - Authentication
- `src/hooks/useDatabase.ts` - Data operations
- `src/components/auth/ProtectedRoute.tsx` - Route protection

### Pages
- `src/pages/Login.tsx` - Login page
- `src/pages/Signup.tsx` - Registration
- `src/pages/dashboard/PatientDashboard.tsx` - Main dashboard
- `src/pages/dashboard/patient/ProfileNew.tsx` - Profile page

### Configuration
- `.env.local` - Environment variables
- `supabase-schema.sql` - Database schema
- `.vscode/mcp.json` - MCP configuration

## 🎓 Learn More

- [Supabase Docs](https://supabase.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

## ✨ Success Checklist

- [ ] Database schema deployed
- [ ] Can create new user account
- [ ] Can login successfully
- [ ] Dashboard loads with user data
- [ ] Profile is editable
- [ ] Changes save to database
- [ ] Appointments display (if added)
- [ ] Vitals display (if added)
- [ ] Notifications work
- [ ] Mobile responsive
- [ ] No console errors

## 🎉 You're Ready!

Your patient dashboard is now fully integrated with Supabase!

**What works:**
✅ Authentication (signup/login)
✅ Protected routes
✅ Profile management
✅ Dashboard with real data
✅ Responsive design
✅ Error handling
✅ Loading states

**Next:** Build more features using the same patterns!

---

Need help? Check:
- `SUPABASE_INTEGRATION.md` - Detailed integration guide
- `IMPLEMENTATION_STATUS.md` - What's implemented
- `IMPLEMENTATION_SUMMARY.md` - Complete overview
