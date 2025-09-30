# Authentication System Guide

## Overview
This application implements a comprehensive multi-role authentication system with "Remember Me" functionality for four different user types:

1. **Patient** - End users seeking medical services
2. **Doctor** - Medical professionals providing consultations
3. **Hospital/Clinic** - Healthcare facilities and institutions
4. **Super Admin** - System administrators with elevated privileges

## Features

### 1. Multi-Role Authentication
- Role-based sign-up and sign-in
- Role verification during login
- Separate dashboards for each role type
- Role-specific data collection during registration

### 2. Remember Me Functionality
- Persistent sessions across browser restarts
- Secure session token storage
- 30-day session expiration
- Automatic login on return visits
- Device and IP tracking for security

### 3. Database Schema

#### Core Tables
- **profiles** - Base user information
- **patients** - Patient-specific data
- **doctors** - Doctor credentials and specialties
- **hospitals** - Hospital/clinic information
- **super_admins** - Admin user data
- **user_sessions** - Remember Me session management

#### Verification Tables
- **doctor_verification_requests** - Doctor credential verification
- **hospital_verification_requests** - Hospital/clinic verification

## Database Setup

Run the following SQL files in order:

1. `supabase-schema.sql` - Core schema
2. `supabase-schema-update.sql` - Additional features
3. `supabase-auth-schema.sql` - Authentication extensions

```bash
# In Supabase SQL Editor, run these files in order
```

## Sign Up Process

### Patient Sign Up
Required fields:
- Full Name
- Email
- Password
- Accept Terms & Conditions

### Doctor Sign Up
Required fields:
- Full Name
- Email
- Password
- Medical Specialty
- Medical Council Registration Number
- Accept Terms & Conditions

**Note**: Doctor accounts require verification by admin before full access.

### Hospital/Clinic Sign Up
Required fields:
- Full Name (Admin contact)
- Email
- Password
- Hospital/Clinic Name
- Registration Number
- Accept Terms & Conditions

**Note**: Hospital accounts require verification by admin before full access.

### Super Admin Sign Up
Required fields:
- Full Name
- Email
- Password
- Accept Terms & Conditions

**Note**: Admin accounts should be created carefully and may require additional security measures.

## Sign In Process

### Basic Sign In
1. Select your role (Patient/Doctor/Hospital/Admin)
2. Enter email and password
3. Optionally check "Remember Me"
4. Click "Sign In as [Role]"

### Remember Me Feature
When "Remember Me" is checked:
- A secure session token is generated
- Session is stored in database with 30-day expiration
- Token is saved in browser's localStorage
- User's role is saved for automatic redirect

On subsequent visits:
- System checks for valid session token
- Automatically logs in user if session is valid
- Redirects to appropriate dashboard based on role

## Dashboard Routes

After successful authentication, users are redirected to:
- **Patient**: `/dashboard/patient`
- **Doctor**: `/dashboard/doctor`
- **Hospital/Clinic**: `/dashboard/hospital`
- **Super Admin**: `/dashboard/super-admin`

## Security Features

### Session Management
- Secure session tokens (UUID v4)
- Expiration tracking
- Device fingerprinting
- IP address logging
- Last accessed timestamp

### Row Level Security (RLS)
All tables have RLS policies ensuring:
- Users can only view their own data
- Role-based access control
- Admins have elevated permissions
- Cross-role data access only where appropriate

### Password Security
- Minimum 6 characters (can be increased)
- Handled by Supabase Auth
- Password reset functionality available

## API Integration

### AuthContext Methods

```typescript
// Sign In
const { error } = await signIn(email, password, role, rememberMe);

// Sign Up
const { error } = await signUp({
  email: string,
  password: string,
  fullName: string,
  role: string,
  // Role-specific fields
  licenseNumber?: string,      // For doctors
  specialty?: string,           // For doctors
  hospitalName?: string,        // For hospitals
  registrationNumber?: string,  // For hospitals
  hospitalType?: string,        // For hospitals
});

// Sign Out
await signOut();

// Check Remembered Session
const isValid = await checkRememberedSession();

// Update Profile
await updateProfile({ full_name: "New Name" });
```

### Usage in Components

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, profile, loading, signIn, signUp, signOut } = useAuth();
  
  // Your component logic
}
```

## Testing the System

### 1. Test Patient Registration
```
1. Go to /register
2. Select "Patient" role
3. Fill in required fields
4. Submit form
5. Check email for verification (if enabled)
6. Log in at /login
```

### 2. Test Doctor Registration
```
1. Go to /register
2. Select "Doctor" role
3. Fill in specialty and license number
4. Submit form
5. Account pending verification
6. Admin must approve in admin dashboard
```

### 3. Test Remember Me
```
1. Log in with "Remember Me" checked
2. Close browser completely
3. Reopen browser and visit /login
4. Should automatically redirect to dashboard
```

### 4. Test Role Verification
```
1. Create a doctor account
2. Try to log in as "Patient" using doctor credentials
3. Should receive "Invalid role" error
```

## Troubleshooting

### Session Not Persisting
- Check browser localStorage for keys: `rememberMe`, `sessionToken`, `userRole`
- Verify session record in `user_sessions` table
- Check session expiration date

### User Not Redirected After Login
- Verify role is correctly set in profiles table
- Check dashboard routes are properly configured
- Ensure user has completed email verification (if required)

### Doctor/Hospital Can't Access Features
- Check verification status in respective verification tables
- Admins must approve verification requests
- Verify account status in admin dashboard

### Auto-Login Not Working
- Ensure `supabase-auth-schema.sql` has been run
- Check `user_sessions` table exists
- Verify RLS policies allow user to read own sessions

## Future Enhancements

Potential improvements:
- [ ] Two-factor authentication (2FA)
- [ ] OAuth providers (Google, Facebook)
- [ ] Biometric authentication
- [ ] Session device management (view/revoke devices)
- [ ] Email verification before full access
- [ ] Password strength requirements
- [ ] Account lockout after failed attempts
- [ ] Activity logging and audit trail

## Support

For issues or questions:
1. Check Supabase logs for database errors
2. Review browser console for client-side errors
3. Verify all SQL migrations have been applied
4. Check RLS policies are correctly configured

## Security Best Practices

1. **Never expose session tokens** in URLs or logs
2. **Rotate tokens** after password changes
3. **Implement rate limiting** on authentication endpoints
4. **Use HTTPS only** in production
5. **Regular security audits** of user accounts
6. **Monitor suspicious activity** patterns
7. **Expire old sessions** periodically (implemented via cleanup function)

## License

This authentication system is part of the Kabiraj AI project.
