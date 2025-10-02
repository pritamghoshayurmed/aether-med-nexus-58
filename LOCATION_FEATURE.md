# Location-Based Nearby Facilities Feature

## Overview
This feature automatically detects the user's location and displays nearby hospitals and pharmacies on the Patient Dashboard. The data is cached for 24 hours to minimize API calls and improve performance.

## Features

### 1. **Automatic Location Detection**
- When a patient logs into the dashboard, the app requests location permission
- Location is detected only once per day automatically
- Data is cached in browser's localStorage for 24 hours

### 2. **Nearby Facilities Search**
- Searches for hospitals and clinics within 5km radius
- Searches for pharmacies within 5km radius
- Displays up to 5 facilities (3 hospitals/clinics + 2 pharmacies)
- Results are sorted by distance (closest first)

### 3. **Manual Refresh**
- Users can manually refresh their location using the refresh button
- This updates the location and fetches new nearby facilities
- Useful when users change location or want updated information

### 4. **Data Provider**
Currently using **Overpass API (OpenStreetMap)**:
- ✅ Free and no API key required
- ✅ Global coverage
- ✅ Community-maintained data
- ✅ No rate limits for reasonable usage

## Implementation Details

### Files Created/Modified

#### 1. `src/hooks/useNearbyPlaces.ts`
Custom React hook that handles:
- Location detection via browser's Geolocation API
- Fetching nearby hospitals and pharmacies from Overpass API
- Caching location and places data in localStorage
- 24-hour cache expiration
- Error handling and fallback data

#### 2. `src/pages/dashboard/PatientDashboard.tsx`
Updated to:
- Import and use the `useNearbyPlaces` hook
- Display real location-based data
- Show loading states while fetching data
- Display error messages when location permission is denied
- Add refresh button to manually update location

### Key Functions

```typescript
useNearbyPlaces() returns:
{
  location: { latitude, longitude } | null,
  nearbyPlaces: Array<NearbyPlace>,
  loading: boolean,
  error: string | null,
  permissionDenied: boolean,
  refreshLocation: () => void,
  requestLocationAndFetchPlaces: (forceRefresh?: boolean) => Promise<void>
}
```

### Cache Strategy

1. **On First Load:**
   - Check localStorage for cached data
   - If cache exists and is less than 24 hours old → Use cached data
   - If cache is stale or doesn't exist → Request location and fetch new data

2. **On Manual Refresh:**
   - Always fetch new location
   - Always fetch new nearby places
   - Update cache with new data

3. **Cache Keys:**
   - `patient_location`: Stores user's coordinates
   - `nearby_places`: Stores array of nearby facilities
   - `last_fetch_timestamp`: Timestamp of last data fetch

## Data Structure

### NearbyPlace Interface
```typescript
interface NearbyPlace {
  name: string;
  type: 'Hospital' | 'Pharmacy';
  distance: string;      // e.g., "2.1 km"
  status: string;        // 'available', 'limited', 'open', 'closed'
  address?: string;
  rating?: number;
  phone?: string;
  place_id?: string;
}
```

## API Used: Overpass API

### Why Overpass API?
1. **Free**: No API key required
2. **Open Data**: Based on OpenStreetMap
3. **Reliable**: Well-maintained and stable
4. **Global**: Works worldwide
5. **No CORS Issues**: Supports direct browser requests

### Query Details
```
Endpoint: https://overpass-api.de/api/interpreter
Method: POST
Radius: 5000 meters (5 km)
Amenities searched: hospital, clinic, pharmacy
```

## Alternative: Google Places API

To switch to Google Places API (requires API key and billing):

1. Get a Google Maps API Key
2. Enable Places API in Google Cloud Console
3. Add environment variable: `VITE_GOOGLE_MAPS_API_KEY=your_api_key`
4. The hook already has commented logic for Google Places API
5. Uncomment and modify the `fetchNearbyPlaces` function

**Note**: Google Places API requires:
- API key
- Billing enabled
- Server-side implementation (or CORS proxy) for security

## User Experience

### First Time User
1. User logs into patient dashboard
2. Browser prompts for location permission
3. User grants permission
4. App fetches location
5. App fetches nearby facilities
6. Results displayed with distances
7. Data cached for 24 hours

### Returning User (within 24 hours)
1. User logs into patient dashboard
2. Cached data loads instantly
3. No location permission prompt
4. No API calls made

### Returning User (after 24 hours)
1. User logs into patient dashboard
2. Cache is stale
3. Browser prompts for location permission
4. New data fetched and cached

### Manual Refresh
1. User clicks refresh button
2. Location re-requested
3. New nearby facilities fetched
4. Cache updated
5. UI updates with new data

## Error Handling

### Location Permission Denied
- Shows error message: "Location permission denied..."
- Displays instructions to enable location
- Shows fallback dummy data
- Refresh button available to retry

### API Request Failed
- Catches network errors
- Falls back to dummy data
- User can retry with refresh button

### No Results Found
- Shows "No nearby facilities found" message
- Provides refresh button to retry
- May indicate remote location

## Privacy & Security

### Data Storage
- Only coordinates stored locally (no personal identification)
- Data stored in browser's localStorage only
- No server-side storage of location data

### Permissions
- Uses browser's native Geolocation API
- Requires explicit user permission
- Permission can be revoked anytime in browser settings

### Data Sharing
- Location data not shared with backend
- API calls made directly from browser
- No tracking or analytics on location data

## Future Enhancements

1. **Add Directions**: Integrate with Google Maps for navigation
2. **Real-time Availability**: Show real-time bed availability (requires hospital APIs)
3. **Emergency Services**: Add emergency contact numbers
4. **Filter Options**: Allow users to filter by type, distance, rating
5. **Save Favorites**: Let users save frequently visited facilities
6. **Appointment Booking**: Direct booking from nearby facilities
7. **Reviews & Ratings**: Show patient reviews (requires backend integration)

## Testing

### Test Scenarios
1. ✅ First-time user grants location permission
2. ✅ User denies location permission
3. ✅ Cached data loads within 24 hours
4. ✅ Cache expires after 24 hours
5. ✅ Manual refresh updates data
6. ✅ No nearby facilities found
7. ✅ API request fails
8. ✅ Network offline

## Browser Compatibility

Geolocation API is supported in:
- ✅ Chrome 5+
- ✅ Firefox 3.5+
- ✅ Safari 5+
- ✅ Edge 12+
- ✅ Opera 10.6+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

**Note**: HTTPS required for Geolocation API in modern browsers (localhost exempted)

## Troubleshooting

### Location not updating
1. Check browser location permissions
2. Ensure HTTPS connection
3. Clear localStorage and refresh
4. Try manual refresh button

### No facilities showing
1. Check if location is remote
2. Increase search radius in code
3. Verify Overpass API is accessible
4. Check browser console for errors

### Slow loading
1. Overpass API may be busy
2. Network connection slow
3. Consider adding timeout
4. Fall back to cached data sooner

## Performance Considerations

- **Initial Load**: ~2-3 seconds (location + API call)
- **Cached Load**: Instant (<100ms)
- **Manual Refresh**: ~2-3 seconds
- **API Calls**: Max 1 per 24 hours per user (automatic)
- **Data Transfer**: ~5-10 KB per request

## Conclusion

This location-based feature enhances the patient experience by providing immediate access to nearby healthcare facilities and pharmacies. The 24-hour caching strategy balances freshness with performance, while the manual refresh option gives users control when needed.
