# Authentication System - Visual Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     KABIRAJ AI AUTH SYSTEM                       │
│                    Multi-Role Authentication                     │
└─────────────────────────────────────────────────────────────────┘

                              ↓

┌─────────────────────────────────────────────────────────────────┐
│                        REGISTRATION                              │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ PATIENT  │    │  DOCTOR  │    │ HOSPITAL │    │  ADMIN   │
    └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │                │                │
         ├─ Name         ├─ Name          ├─ Name          ├─ Name
         ├─ Email        ├─ Email         ├─ Email         ├─ Email
         ├─ Password     ├─ Password      ├─ Password      ├─ Password
         │               ├─ Specialty     ├─ Hospital Name │
         │               ├─ License #     ├─ Registration# │
         │               │                │                │
         ↓               ↓                ↓                ↓
    ┌────────────────────────────────────────────────────────────┐
    │              Supabase Auth + Profile Creation              │
    └────────────────────────────────────────────────────────────┘
         │               │                │                │
         ↓               ↓                ↓                ↓
    ┌─────────┐    ┌──────────────┐  ┌──────────────┐  ┌────────┐
    │patients │    │   doctors    │  │  hospitals   │  │ admins │
    │ table   │    │   table      │  │   table      │  │ table  │
    └─────────┘    └──────┬───────┘  └──────┬───────┘  └────────┘
                          │                  │
                          ↓                  ↓
                   ┌─────────────────────────────────┐
                   │   Verification Requests         │
                   │   (Pending Admin Approval)      │
                   └─────────────────────────────────┘

                              ↓

┌─────────────────────────────────────────────────────────────────┐
│                           LOGIN                                  │
└─────────────────────────────────────────────────────────────────┘

                    Select Role ▼
    ┌──────────┬──────────┬──────────┬──────────┐
    │ Patient  │  Doctor  │ Hospital │  Admin   │
    └──────────┴──────────┴──────────┴──────────┘
                          │
                    Enter Credentials
                          │
              ┌───────────┴───────────┐
              │                       │
         Remember Me?            Remember Me?
         ☐ Unchecked            ☑ Checked
              │                       │
              ↓                       ↓
      ┌──────────────┐        ┌──────────────┐
      │ Regular      │        │ Create       │
      │ Session      │        │ Persistent   │
      │              │        │ Session      │
      └──────┬───────┘        └──────┬───────┘
             │                       │
             │                       ├─ Generate UUID Token
             │                       ├─ Save to user_sessions
             │                       ├─ Store in localStorage
             │                       ├─ 30-day expiration
             │                       │
             ↓                       ↓
      ┌──────────────────────────────────────┐
      │      Verify Role Matches Profile     │
      └──────────────┬───────────────────────┘
                     │
              Valid Role?
                     │
         ┌───────────┴───────────┐
         │                       │
        NO                      YES
         │                       │
         ↓                       ↓
    ┌─────────┐          ┌──────────────┐
    │  Error  │          │   Redirect   │
    │ Invalid │          │  to Dashboard│
    │  Role   │          └──────────────┘
    └─────────┘                  │
                                 ↓
                    ┌────────────────────────┐
                    │   Dashboard Router     │
                    └────────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ↓                  ↓                  ↓
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   /patient   │  │   /doctor    │  │  /hospital   │
    └──────────────┘  └──────────────┘  └──────────────┘
                                 │
                                 ↓
                        ┌──────────────┐
                        │ /super-admin │
                        └──────────────┘

                              ↓

┌─────────────────────────────────────────────────────────────────┐
│                  REMEMBER ME - NEXT VISIT                        │
└─────────────────────────────────────────────────────────────────┘

              User returns to /login
                       │
                       ↓
              Check localStorage
                       │
         ┌─────────────┴─────────────┐
         │                           │
    No Token Found            Token Found
         │                           │
         ↓                           ↓
    Show Login Form       Query user_sessions table
                                     │
                          ┌──────────┴──────────┐
                          │                     │
                    Token Invalid         Token Valid
                    or Expired          & Not Expired
                          │                     │
                          ↓                     ↓
                   Clear Storage        Update last_accessed
                   Show Login Form              │
                                               ↓
                                      Auto-login User
                                               │
                                               ↓
                                    Redirect to Dashboard
                                        (1-2 seconds)

                              ↓

┌─────────────────────────────────────────────────────────────────┐
│                        LOGOUT                                    │
└─────────────────────────────────────────────────────────────────┘

                   User clicks Logout
                           │
                           ↓
              Delete session from database
                           │
                           ↓
                 Clear localStorage
                 (rememberMe, sessionToken, userRole)
                           │
                           ↓
                 Supabase Auth signOut()
                           │
                           ↓
                  Redirect to /login
```

## Database Schema Relationships

```
┌─────────────────┐
│  auth.users     │ (Supabase Auth)
│  - id (UUID)    │
│  - email        │
│  - password     │
└────────┬────────┘
         │ 1:1
         ↓
┌─────────────────┐
│   profiles      │ (Main User Profile)
│  - id           │
│  - email        │
│  - full_name    │
│  - role ───────┼──┐ Role determines which table
└────────┬────────┘  │
         │           │
    ┌────┴────┬──────┴────┬──────────┐
    │         │           │          │
    ↓         ↓           ↓          ↓
┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐
│patients │ │ doctors │ │hospitals │ │  admins  │
│         │ │         │ │          │ │          │
│Basic    │ │License  │ │Hospital  │ │Admin     │
│Info     │ │Specialty│ │RegNo     │ │Level     │
└─────────┘ └────┬────┘ └────┬─────┘ └──────────┘
                 │           │
                 ↓           ↓
        ┌────────────────────────┐
        │ Verification Requests  │
        │ (Pending/Approved)     │
        └────────────────────────┘

┌──────────────────┐
│  user_sessions   │ (Remember Me)
│  - user_id       │ ──→ references profiles(id)
│  - session_token │
│  - remember_me   │
│  - expires_at    │
│  - device_info   │
└──────────────────┘
```

## Authentication Flow States

```
STATE MACHINE:

┌─────────────┐
│ ANONYMOUS   │ ──register──→ ┌──────────────┐
│ (No Auth)   │               │  REGISTERED  │
└──────┬──────┘               │ (Auth Created)│
       │                      └──────┬────────┘
       │                             │
       │                             ↓
       │                      ┌──────────────┐
       └──────login──────────→│  LOGGED IN   │
                              │ (Authenticated)│
                              └──────┬────────┘
                                     │
                        ┌────────────┼────────────┐
                        │                         │
                  Remember Me = NO         Remember Me = YES
                        │                         │
                        ↓                         ↓
                ┌──────────────┐          ┌──────────────┐
                │   TEMPORARY  │          │  PERSISTENT  │
                │   SESSION    │          │   SESSION    │
                │ (Browser only)│         │ (DB + Local) │
                └──────┬───────┘          └──────┬───────┘
                       │                         │
                       │                    Auto-login
                       │                    on return
                       │                         │
                       └────────┬────────────────┘
                                │
                           (logout)
                                │
                                ↓
                        ┌──────────────┐
                        │  LOGGED OUT  │
                        │ (Back to     │
                        │  Anonymous)  │
                        └──────────────┘
```

## Data Flow Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                          FRONTEND                              │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Login.tsx  ←──→  AuthContext  ←──→  Signup.tsx              │
│      ↕                 ↕                  ↕                    │
│  Remember Me       signIn()           signUp()                │
│  Checkbox          signOut()          with role data          │
│                    check Session()                            │
│                                                                │
└────────────────────────┬──────────────────────────────────────┘
                         │
                         ↓ Supabase Client
                         │
┌────────────────────────┴──────────────────────────────────────┐
│                      SUPABASE BACKEND                          │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐        ┌──────────────┐                    │
│  │ Supabase     │        │  PostgreSQL  │                    │
│  │ Auth         │ ←────→ │  Database    │                    │
│  │              │        │              │                    │
│  │ - signUp     │        │ Tables:      │                    │
│  │ - signIn     │        │ - profiles   │                    │
│  │ - signOut    │        │ - patients   │                    │
│  │ - getSession │        │ - doctors    │                    │
│  └──────────────┘        │ - hospitals  │                    │
│                          │ - admins     │                    │
│                          │ - sessions   │                    │
│                          └──────────────┘                    │
│                                 ↕                              │
│                          ┌──────────────┐                    │
│                          │ RLS Policies │                    │
│                          │ (Security)   │                    │
│                          └──────────────┘                    │
└───────────────────────────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                          │
└─────────────────────────────────────────────────────────────┘

Layer 7: APPLICATION LOGIC
├─ Role verification on login
├─ Input validation and sanitization
└─ Error handling and logging

Layer 6: AUTHENTICATION
├─ Supabase Auth (JWT tokens)
├─ Password hashing
└─ Session management

Layer 5: AUTHORIZATION
├─ Role-based access control (RBAC)
├─ Route protection
└─ Feature gating

Layer 4: DATABASE SECURITY
├─ Row Level Security (RLS)
├─ Foreign key constraints
└─ Data type validation

Layer 3: SESSION SECURITY
├─ Secure token generation (UUID v4)
├─ Session expiration (30 days)
├─ Device tracking
└─ IP address logging

Layer 2: NETWORK SECURITY
├─ HTTPS/SSL encryption
├─ CORS policies
└─ Rate limiting

Layer 1: INFRASTRUCTURE
├─ Supabase hosting
├─ Database backups
└─ DDoS protection
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                     COMPONENT TREE                           │
└─────────────────────────────────────────────────────────────┘

App.tsx
  │
  ├─ AuthProvider (Context)
  │   │
  │   ├─ State: user, profile, session, loading
  │   ├─ Methods: signIn, signUp, signOut, checkSession
  │   └─ Effects: Listen to auth changes
  │
  ├─ Routes
  │   │
  │   ├─ /login → Login.tsx
  │   │   ├─ Role selector
  │   │   ├─ Email/Password inputs
  │   │   ├─ Remember Me checkbox
  │   │   └─ useAuth() hook
  │   │
  │   ├─ /register → Signup.tsx
  │   │   ├─ Role selector
  │   │   ├─ Common fields
  │   │   ├─ Role-specific fields
  │   │   └─ useAuth() hook
  │   │
  │   └─ Protected Routes
  │       ├─ /dashboard/patient
  │       ├─ /dashboard/doctor
  │       ├─ /dashboard/hospital
  │       └─ /dashboard/super-admin
  │
  └─ Other Components
```

## Timeline Visualization

```
USER JOURNEY WITH REMEMBER ME:

Day 1 - First Visit:
──────────────────────────────────────────────────────────
09:00 AM │ User visits site
09:01 AM │ Clicks "Register"
09:02 AM │ Selects "Doctor" role
09:05 AM │ Fills form + license number
09:06 AM │ Submits registration
09:07 AM │ Account created → Redirected to login
09:08 AM │ Enters credentials
09:08 AM │ ✓ Checks "Remember Me"
09:09 AM │ Clicks "Sign In"
09:09 AM │ ✓ Session created in DB (expires in 30 days)
09:09 AM │ ✓ Token saved to localStorage
09:09 AM │ Redirected to /dashboard/doctor
09:09 AM │ User browses dashboard
09:30 AM │ User closes browser
──────────────────────────────────────────────────────────

Day 2 - Return Visit:
──────────────────────────────────────────────────────────
10:00 AM │ User opens browser
10:00 AM │ Visits site
10:00 AM │ System checks localStorage
10:00 AM │ ✓ Token found
10:01 AM │ System queries user_sessions table
10:01 AM │ ✓ Token valid & not expired
10:01 AM │ Auto-login initiated
10:02 AM │ ✓ Automatically redirected to /dashboard/doctor
10:02 AM │ User continues from where they left off
──────────────────────────────────────────────────────────

Day 31 - Session Expired:
──────────────────────────────────────────────────────────
09:00 AM │ User opens browser (31 days later)
09:00 AM │ Visits site
09:00 AM │ System checks localStorage
09:00 AM │ ✓ Token found
09:01 AM │ System queries user_sessions table
09:01 AM │ ✗ Token expired (> 30 days)
09:01 AM │ System clears localStorage
09:01 AM │ Shows login form
09:01 AM │ User must login again
──────────────────────────────────────────────────────────
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   ERROR SCENARIOS                            │
└─────────────────────────────────────────────────────────────┘

Invalid Credentials:
  Login attempt → Supabase Auth → ✗ Invalid → Toast error → Stay on login

Wrong Role Selected:
  Login attempt → Auth success → Check profile role → ✗ Mismatch → 
  Logout → Toast error → Stay on login

Expired Session:
  Auto-login attempt → Query sessions → ✗ Expired → Clear storage →
  Show login form

Network Error:
  Any request → ✗ Network fail → Catch error → Toast error →
  Retry or fallback

Validation Error:
  Form submit → Client validation → ✗ Invalid → Display errors →
  Highlight fields → User corrects

Database Error:
  Create record → ✗ DB error → Rollback → Toast error →
  User tries again
```

---

*This diagram provides a visual overview of the authentication system's architecture, flow, and security layers.*
