# Kabiraj AI - Supabase Integration Guide

## 🚀 Quick Start

### 1. Database Setup

Run the following SQL script in your Supabase SQL Editor:

```bash
# Navigate to your Supabase project dashboard
# Go to SQL Editor
# Copy and paste the contents of supabase-schema.sql
# Click "Run"
```

The schema includes:
- ✅ User profiles (extends auth.users)
- ✅ Patients table
- ✅ Doctors table
- ✅ Appointments
- ✅ Vitals tracking
- ✅ Prescriptions
- ✅ Lab results
- ✅ Medical records
- ✅ Family members
- ✅ Notifications
- ✅ Billing
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance

### 2. Environment Variables

The project is configured with:
- **Project URL**: `https://nlcwteteanrcmcofjxte.supabase.co`
- **Anon Key**: Already configured in `.env.local`

### 3. Authentication Flow

#### Sign Up
1. Navigate to `/register`
2. Select role (patient/doctor/hospital/admin)
3. Fill in details
4. Submit form
5. User account created in Supabase Auth
6. Profile created in `profiles` table
7. If patient, record created in `patients` table
8. Verification email sent

#### Login
1. Navigate to `/login`
2. Select role
3. Enter email and password
4. System verifies role matches user's actual role
5. Redirect to role-specific dashboard

### 4. Protected Routes

All dashboard routes are protected and role-based:
- `/dashboard/patient/*` - Only accessible to patients
- `/dashboard/doctor/*` - Only accessible to doctors
- `/dashboard/hospital/*` - Only accessible to hospitals
- `/dashboard/admin/*` - Only accessible to admins

## 📊 Database Schema Overview

### Core Tables

#### profiles
- Extends Supabase auth.users
- Stores user metadata and role
- Links to role-specific tables

#### patients
- Extended patient information
- Medical history
- Insurance details
- Emergency contacts

#### appointments
- Links patients to doctors
- Supports video/in-person/phone consultations
- Status tracking
- Meeting links for video calls

#### vitals
- Time-series health data
- Heart rate, blood pressure, temperature, etc.
- Patient self-reporting or clinical data

#### prescriptions
- Medication tracking
- Dosage and frequency
- Active/completed status

#### lab_results
- Test results
- File attachments
- JSON structured data

#### medical_records
- Document management
- Diagnoses, procedures, imaging
- File storage integration

### Security

#### Row Level Security (RLS)
All tables have RLS enabled with policies:
- Users can only access their own data
- Doctors can view patient data for their appointments
- Cross-role access is carefully controlled

## 🔧 Integration in Components

### Using Authentication

```typescript
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, profile, signIn, signOut } = useAuth();
  
  // Access current user
  console.log(user?.email);
  console.log(profile?.role);
  
  // Sign in
  await signIn(email, password, role);
  
  // Sign out
  await signOut();
};
```

### Querying Data

```typescript
import { supabase } from '@/lib/supabase';

// Fetch patient data
const { data, error } = await supabase
  .from('patients')
  .select('*')
  .eq('user_id', user.id)
  .single();

// Fetch appointments with doctor info
const { data: appointments } = await supabase
  .from('appointments')
  .select(`
    *,
    doctors (
      user_id,
      specialty,
      profiles (full_name)
    )
  `)
  .eq('patient_id', patientId)
  .order('appointment_date', { ascending: false });

// Insert vitals
await supabase.from('vitals').insert({
  patient_id: patientId,
  heart_rate: 72,
  blood_pressure_systolic: 120,
  blood_pressure_diastolic: 80,
});
```

### Real-time Subscriptions

```typescript
// Subscribe to new appointments
const subscription = supabase
  .channel('appointments')
  .on('postgres_changes', 
    { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'appointments',
      filter: `patient_id=eq.${patientId}`
    }, 
    (payload) => {
      console.log('New appointment:', payload.new);
    }
  )
  .subscribe();

// Cleanup
return () => {
  subscription.unsubscribe();
};
```

## 📱 Patient Dashboard Features

### Implemented
- ✅ Authentication (signup/login)
- ✅ Protected routes
- ✅ Role-based access
- ✅ Session management
- ✅ Database schema

### To Implement with Supabase
1. **Profile Page** - Display and edit patient info from `patients` table
2. **Appointments** - CRUD operations on `appointments` table
3. **Vitals Tracking** - Insert and display from `vitals` table
4. **Prescriptions** - View from `prescriptions` table
5. **Lab Results** - View from `lab_results` table
6. **Medical Records** - View and upload to `medical_records` table
7. **Family Members** - CRUD on `family_members` table
8. **Billing** - View from `billing` table
9. **Notifications** - Real-time from `notifications` table

## 🔐 Security Best Practices

1. **Never expose service role key** - Only use anon key in frontend
2. **Use RLS policies** - Database level security
3. **Validate user roles** - Check profile.role before operations
4. **Sanitize inputs** - Prevent SQL injection (Supabase handles this)
5. **Use transactions** - For multi-step operations

## 🚦 Next Steps

1. ✅ Install Supabase client
2. ✅ Configure environment variables
3. ✅ Create auth context
4. ✅ Update login/signup pages
5. ✅ Add protected routes
6. ⏳ Run database schema
7. ⏳ Update dashboard components with real data
8. ⏳ Implement CRUD operations
9. ⏳ Add real-time features
10. ⏳ Test thoroughly

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [React Query with Supabase](https://tanstack.com/query/latest)
- [RLS Policies Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🐛 Troubleshooting

### Issue: Can't connect to Supabase
- Check environment variables are set
- Verify project URL and anon key
- Check network connectivity

### Issue: RLS blocks queries
- Verify user is authenticated
- Check RLS policies match your use case
- Use Supabase dashboard to test policies

### Issue: Data not showing
- Check browser console for errors
- Verify table names match schema
- Check user permissions

## 📞 Support

For issues or questions, refer to:
- Project documentation
- Supabase support
- GitHub issues
