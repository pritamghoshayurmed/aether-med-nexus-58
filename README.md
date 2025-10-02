# Aether Med Nexus - Telemedicine Platform

A modern, full-featured telemedicine platform built with React, TypeScript, and Supabase.

## 🆕 Latest Feature: Location-Based Nearby Facilities

Find hospitals and pharmacies near you automatically! The Patient Dashboard now includes:
- 📍 Automatic location detection (once per day)
- 🏥 Nearby hospitals within 5km
- 💊 Nearby pharmacies within 5km
- 🔄 Manual refresh option
- 💾 Smart 24-hour caching
- 🆓 Completely free (no API keys required)

See [LOCATION_FEATURE.md](./LOCATION_FEATURE.md) for full details.

## ✨ Features

### For Patients
- 📅 **Appointment Booking** - Schedule appointments with doctors
- 💬 **AI Health Chat** - Get health advice from AI assistant
- 📊 **Vital Signs Tracking** - Monitor heart rate, blood pressure, oxygen levels
- 💊 **Prescription Management** - View and manage prescriptions
- 📄 **Medical Records** - Access your medical history
- 🏥 **Nearby Facilities** - Find hospitals and pharmacies near you
- 📱 **Mobile Responsive** - Works on all devices

### For Doctors
- 👥 **Patient Management** - View and manage patient list
- 📅 **Appointment Management** - Manage your schedule
- 💊 **Prescription Writing** - Create prescriptions for patients
- 📊 **Patient Vitals** - View patient health data
- 🎥 **Video Consultations** - Conduct remote appointments

### For Admins
- 👨‍⚕️ **Doctor Management** - Add and manage doctors
- 👥 **User Management** - Manage all users
- 📊 **Analytics Dashboard** - View platform statistics
- ⚙️ **System Settings** - Configure platform settings

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Supabase account (free tier works)
- Modern web browser with location services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pritamghoshayurmed/aether-med-nexus-58.git
   cd aether-med-nexus-58
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL scripts in order:
     - `supabase-schema.sql`
     - `supabase-auth-schema.sql`
     - `supabase-auto-profile-trigger.sql`
     - `supabase-rls-fix.sql`
     - `add-sample-doctors.sql` (optional)
     - `add-sample-appointments.sql` (optional)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   - Navigate to `http://localhost:5173`
   - Sign up as a patient to test features

## 📱 Usage

### Testing the Location Feature

1. **First Time**
   - Login as a patient
   - Navigate to dashboard
   - Allow location permission when prompted
   - Wait 2-3 seconds for facilities to load

2. **Subsequent Visits**
   - Data loads instantly from cache
   - No permission prompt needed
   - Auto-refreshes after 24 hours

3. **Manual Refresh**
   - Click the refresh button (↻) in Nearby Resources card
   - Updates location and fetches new facilities

### Debug Tools (Development Only)

Open browser console (F12) and use:
```javascript
locationDebug.viewCache()       // View cached data
locationDebug.clearCache()      // Clear cache
locationDebug.testLocation()    // Test geolocation
locationDebug.setMockData()     // Load mock data
```

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for complete testing instructions.

## 🏗️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Hooks, Context API
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Maps/Location**: Overpass API (OpenStreetMap)
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Project Structure

```
aether-med-nexus-58/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   ├── navigation/   # Navigation components
│   │   └── ui/          # UI primitives (shadcn)
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   │   ├── useDatabase.ts
│   │   ├── useDoctors.ts
│   │   └── useNearbyPlaces.ts  # ⭐ Location feature
│   ├── lib/              # Utility libraries
│   ├── pages/            # Page components
│   │   ├── dashboard/   # Dashboard pages
│   │   └── appointment/ # Appointment pages
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
│       └── locationDebug.ts  # ⭐ Debug tools
├── public/               # Static assets
├── supabase-*.sql       # Database schemas
├── LOCATION_FEATURE.md   # ⭐ Feature documentation
├── TESTING_GUIDE.md      # ⭐ Testing guide
├── ARCHITECTURE.md       # ⭐ Architecture docs
├── QUICK_REFERENCE.md    # ⭐ Quick reference
└── package.json          # Dependencies
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Manual Testing
See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing instructions.

### Test Coverage
- ✅ Authentication flows
- ✅ Appointment booking
- ✅ Location detection
- ✅ Cache management
- ✅ Error handling
- ✅ Mobile responsiveness

## 📚 Documentation

- **[LOCATION_FEATURE.md](./LOCATION_FEATURE.md)** - Location feature documentation
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Implementation guide
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing instructions
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Developer quick reference
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

## 🔒 Security & Privacy

- HTTPS required for location services
- User permission required for location access
- No personal data stored on external servers
- Location data stored locally only
- Supabase RLS (Row Level Security) enabled
- Authentication via Supabase Auth

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 5+ | ✅ Supported |
| Firefox | 3.5+ | ✅ Supported |
| Safari | 5+ | ✅ Supported |
| Edge | 12+ | ✅ Supported |
| Opera | 10.6+ | ✅ Supported |
| iOS Safari | - | ✅ Supported |
| Android Chrome | - | ✅ Supported |

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Hosting
The `dist/` folder can be deployed to:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront
- Any static hosting service

**Important**: Ensure HTTPS is configured for location services to work.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Neural Nerds Team** - Initial work
- Contributors - See GitHub contributors

## 🙏 Acknowledgments

- **OpenStreetMap** - Map data
- **Overpass API** - Free geocoding service
- **Supabase** - Backend infrastructure
- **shadcn/ui** - UI components
- **Radix UI** - Accessible component primitives
- **Lucide** - Icon library

## 📞 Support

- **Documentation**: See docs folder
- **Issues**: GitHub Issues
- **Questions**: GitHub Discussions

## 🗺️ Roadmap

### Current Version (v1.0.0)
- ✅ Patient dashboard
- ✅ Doctor dashboard
- ✅ Appointment booking
- ✅ Location-based facilities search
- ✅ Vital signs tracking
- ✅ AI health chat

### Upcoming Features
- [ ] Google Maps integration
- [ ] Real-time bed availability
- [ ] Pharmacy stock information
- [ ] Video consultations
- [ ] Prescription fulfillment
- [ ] Insurance integration
- [ ] Multi-language support
- [ ] Mobile apps (iOS/Android)

## 📊 Performance

| Metric | Value |
|--------|-------|
| First Load | < 3s |
| Cached Load | < 100ms |
| API Response | 1-2s |
| Lighthouse Score | 90+ |

## 🌟 Features Highlight

### Location Feature ⭐
- **Automatic**: Detects location once per day
- **Smart Cache**: 24-hour intelligent caching
- **Privacy First**: Local storage only
- **Free**: No API keys required
- **Fast**: Instant loads for returning users

### Patient Experience
- Clean, modern interface
- Mobile-first design
- Easy appointment booking
- Health tracking tools
- AI-powered assistance

### Doctor Tools
- Patient management
- Appointment scheduling
- Prescription writing
- Vital signs monitoring
- Video consultations

## 💻 Development

### Code Style
- ESLint for linting
- Prettier for formatting
- TypeScript for type safety

### Git Workflow
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches

### Commit Convention
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Maintenance

---

Made with ❤️ by Neural Nerds Team

**⭐ Star us on GitHub if you find this project useful!**
