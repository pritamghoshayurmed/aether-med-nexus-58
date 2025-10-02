# Quick Reference Guide - Location Feature

## 🚀 Quick Setup

```bash
# 1. Navigate to project
cd d:\KabirajAI\aether-med-nexus-58

# 2. Install dependencies (if needed)
npm install

# 3. Start dev server
npm run dev

# 4. Open browser to localhost:5173
# 5. Login as patient and test!
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/hooks/useNearbyPlaces.ts` | Location & places logic |
| `src/pages/dashboard/PatientDashboard.tsx` | UI implementation |
| `src/utils/locationDebug.ts` | Debug tools |
| `LOCATION_FEATURE.md` | Full documentation |
| `TESTING_GUIDE.md` | Testing instructions |
| `ARCHITECTURE.md` | System architecture |

## 🎯 Core Hook Usage

```typescript
// In your component
import { useNearbyPlaces } from '@/hooks/useNearbyPlaces';

const {
  location,           // { latitude, longitude } | null
  nearbyPlaces,       // Array of facilities
  loading,            // Boolean
  error,              // String | null
  permissionDenied,   // Boolean
  refreshLocation     // Function to refresh
} = useNearbyPlaces();
```

## 🔧 Debug Commands (Browser Console)

```javascript
// View all cached data
locationDebug.viewCache()

// Clear cache
locationDebug.clearCache()

// Force cache to expire
locationDebug.expireCache()

// Test location detection
locationDebug.testLocation()

// Check permission status
locationDebug.checkPermission()

// Load mock data
locationDebug.setMockData()

// Test API
locationDebug.testAPI()

// Calculate distance
locationDebug.calculateDistance(lat1, lon1, lat2, lon2)
```

## 📊 Data Structure

```typescript
interface NearbyPlace {
  name: string;           // "City Hospital"
  type: 'Hospital' | 'Pharmacy';
  distance: string;       // "2.1 km"
  status: string;         // "available", "open", "limited", "closed"
  address?: string;       // Optional address
  phone?: string;         // Optional phone
}
```

## ⚙️ Configuration

```typescript
// In useNearbyPlaces.ts

// Cache duration (default: 24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Search radius (default: 5km)
const radius = 5000; // meters

// Cache keys
const LOCATION_CACHE_KEY = 'patient_location';
const PLACES_CACHE_KEY = 'nearby_places';
const LAST_FETCH_KEY = 'last_fetch_timestamp';
```

## 🌐 API Details

**Overpass API (OpenStreetMap)**
- Endpoint: `https://overpass-api.de/api/interpreter`
- Method: POST
- Cost: FREE
- Rate Limit: Reasonable usage
- No API key required

**Amenity Types Searched:**
- `hospital` - Hospitals
- `clinic` - Clinics
- `pharmacy` - Pharmacies/Drugstores

## 🔄 Cache Lifecycle

```
First Visit → Request Location → Fetch Places → Cache (24h)
           ↓
Second Visit (< 24h) → Load from Cache (instant)
           ↓
Visit (> 24h) → Cache Expired → Re-fetch → Update Cache
           ↓
Manual Refresh → Always Re-fetch → Update Cache
```

## ✅ Testing Checklist

- [ ] First-time load with permission granted
- [ ] First-time load with permission denied
- [ ] Cached data loads instantly
- [ ] Cache expiration works
- [ ] Manual refresh updates data
- [ ] Error states display correctly
- [ ] Mobile responsive
- [ ] Works on HTTPS
- [ ] No console errors

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Permission not prompted | Check browser settings, clear site data |
| No facilities found | User in remote area, increase radius |
| Slow loading | Overpass API busy, cache helps |
| Won't update | Clear cache with debug tools |
| HTTPS error | Geolocation requires HTTPS |

## 🎨 UI States

```typescript
// Loading
<LoadingSpinner />

// Error
<Alert variant="destructive">
  {error}
</Alert>

// Empty
<EmptyState 
  icon={MapPin}
  message="No nearby facilities found"
  action={<RefreshButton />}
/>

// Success
{nearbyPlaces.map(place => (
  <FacilityCard {...place} />
))}
```

## 📱 Mobile Optimizations

- Touch targets: 44px minimum
- Simplified address display
- Line clamping on long text
- Hover effects disabled on touch
- Responsive grid layout
- Bottom navigation friendly

## 🔐 Privacy & Security

- ✅ Only coordinates stored (no PII)
- ✅ Local storage only (no server)
- ✅ User controls permission
- ✅ Can revoke anytime
- ✅ HTTPS enforced
- ✅ No tracking

## 📈 Performance Targets

| Metric | Target | Acceptable |
|--------|--------|------------|
| First load | 2s | < 5s |
| Cached load | 100ms | < 500ms |
| Manual refresh | 2s | < 5s |
| API response | 1-2s | < 4s |

## 🚨 Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 1 | Permission denied | Show error, offer retry |
| 2 | Position unavailable | Location services off |
| 3 | Timeout | Network slow, retry |

## 🔮 Future Enhancements

```typescript
// Planned features
- [ ] Google Maps directions
- [ ] Real-time availability
- [ ] Favorite locations
- [ ] Filter by type/distance
- [ ] Emergency mode
- [ ] Appointment booking
- [ ] Reviews & ratings
- [ ] Opening hours
- [ ] Contact directly
- [ ] Street view integration
```

## 📞 Support

- Documentation: See `LOCATION_FEATURE.md`
- Testing: See `TESTING_GUIDE.md`
- Architecture: See `ARCHITECTURE.md`
- Debug: Use browser console tools

## 💡 Pro Tips

1. **Always test with cache cleared first**
   ```javascript
   locationDebug.clearCache()
   ```

2. **View cache before debugging**
   ```javascript
   locationDebug.viewCache()
   ```

3. **Test API connectivity separately**
   ```javascript
   locationDebug.testAPI()
   ```

4. **Use mock data for UI testing**
   ```javascript
   locationDebug.setMockData()
   ```

5. **Check permission before debugging location**
   ```javascript
   locationDebug.checkPermission()
   ```

## 🎓 Learning Resources

- [Geolocation API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Overpass API Documentation](https://wiki.openstreetmap.org/wiki/Overpass_API)
- [OpenStreetMap Wiki](https://wiki.openstreetmap.org/)
- [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)

## 📝 Code Snippets

### Add Custom Facility Type

```typescript
// In useNearbyPlaces.ts, update query
const query = `
  [out:json][timeout:25];
  (
    node["amenity"="hospital"](around:${radius},${latitude},${longitude});
    node["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
    node["amenity"="doctor"](around:${radius},${latitude},${longitude});  // Add this
  );
  out body;
`;
```

### Change Cache Duration

```typescript
// In useNearbyPlaces.ts
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours instead of 24
```

### Increase Search Radius

```typescript
// In useNearbyPlaces.ts
const radius = 10000; // 10km instead of 5km
```

### Add Distance Filter

```typescript
// In useNearbyPlaces.ts, after sorting
const filtered = places.filter(p => parseFloat(p.distance) <= 3); // Max 3km
```

## 🎯 Key Takeaways

1. **Free & No API Key** - Uses OpenStreetMap
2. **24-Hour Cache** - Minimizes API calls
3. **Manual Refresh** - User control
4. **Privacy First** - Local storage only
5. **Mobile Ready** - Responsive design
6. **Production Ready** - Error handling included

---

## Quick Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing (in browser console)
locationDebug.clearCache()      # Reset state
locationDebug.viewCache()       # Check cache
locationDebug.testLocation()    # Test geolocation
locationDebug.setMockData()     # Load mock data
```

---

**Last Updated**: Implementation Date  
**Version**: 1.0  
**Status**: ✅ Production Ready
