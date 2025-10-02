# Troubleshooting: Seeing Mock Data Instead of Real Facilities

## Problem
The location is detected correctly, but the app shows mock data (City General Hospital, MedPlus Pharmacy, etc.) instead of real nearby facilities.

## Why This Happens

1. **Cached Mock Data**: Previous mock data might be cached in localStorage
2. **No Facilities in Area**: OpenStreetMap might not have facilities listed in your area
3. **API Timeout**: Overpass API might have timed out
4. **Connection Issues**: Network problems prevented API response

## Solution Steps

### Step 1: Clear Cache and Reload

Open browser console (F12) and run:

```javascript
locationDebug.clearAndReload()
```

This will:
- Clear all cached location data
- Reload the page automatically
- Force fresh location detection
- Fetch new data from API

### Step 2: Check What's Cached

To see what data is currently cached:

```javascript
locationDebug.viewCache()
```

Look for:
- Places array with facility names
- If you see "City General Hospital" or "MedPlus Pharmacy" - it's mock data
- Real data will have actual facility names from your area

### Step 3: Monitor API Calls

Watch the console logs when loading the dashboard:

**Good Response (Real Data):**
```
🔍 Checking cache...
❌ No valid cache found. Will request location.
🔍 Fetching nearby places for location: {latitude: XX, longitude: XX}
📡 Sending request to Overpass API...
✅ Overpass API response received. Elements found: 45
📊 Processing summary: {totalElements: 45, processed: 12, ...}
✅ Found facilities: {hospitals: 3, pharmacies: 2, total: 5}
📍 Nearby places: [Array of real places]
```

**Bad Response (Mock Data):**
```
⚠️ No places found nearby. Using fallback data.
💡 Try increasing the search radius or check if your location has facilities in OpenStreetMap.
```

### Step 4: Test API Directly

Test if the Overpass API is working for your location:

```javascript
// Use your actual coordinates
locationDebug.testAPI(YOUR_LATITUDE, YOUR_LONGITUDE)
```

Example:
```javascript
locationDebug.testAPI(40.7128, -74.0060)  // New York
```

This will show if the API returns any results for your location.

### Step 5: Check Your Location

Verify your detected location:

```javascript
locationDebug.testLocation()
```

This shows your coordinates and accuracy.

## Common Issues & Fixes

### Issue 1: Mock Data Stuck in Cache

**Symptoms**: Always shows same 3 facilities regardless of location

**Fix**:
```javascript
locationDebug.clearAndReload()
```

### Issue 2: No Facilities in Your Area

**Symptoms**: Console shows "No places found nearby"

**Possible Reasons**:
- Your area might not have facilities mapped in OpenStreetMap
- You're in a rural/remote area
- Facilities exist but aren't tagged properly in OSM

**Fix Options**:

1. **Increase Search Radius** (requires code change):
   ```typescript
   // In useNearbyPlaces.ts, line ~136
   const radius = 10000; // Change from 5000 to 10000 (10km)
   ```

2. **Contribute to OpenStreetMap**:
   - Visit https://www.openstreetmap.org
   - Add missing hospitals/pharmacies in your area

3. **Use Different Location for Testing**:
   ```javascript
   // Test with a major city
   locationDebug.testAPI(40.7128, -74.0060)  // New York
   locationDebug.testAPI(51.5074, -0.1278)   // London
   locationDebug.testAPI(28.6139, 77.2090)   // Delhi
   ```

### Issue 3: API Request Fails

**Symptoms**: Console shows API errors

**Fix**:
1. Check internet connection
2. Try again in a few minutes (API might be busy)
3. Check Overpass API status: https://overpass-api.de/

### Issue 4: Browser Blocks Geolocation

**Symptoms**: Location permission denied

**Fix**:
1. Go to browser settings → Site settings → Location
2. Remove the site from blocked list
3. Reload page and allow permission

## Quick Fix Command

If you just want to force a fresh fetch, run this in console:

```javascript
// Clear cache and reload in one command
locationDebug.clearAndReload()
```

## Manual Verification

1. **Check localStorage**:
   - Open DevTools → Application → Local Storage
   - Look for keys: `patient_location`, `nearby_places`, `last_fetch_timestamp`
   - Delete them manually if needed

2. **Check Console Logs**:
   - Open DevTools → Console
   - Look for emoji logs (🔍, 📡, ✅, ❌)
   - These show what's happening step-by-step

3. **Check Network Tab**:
   - Open DevTools → Network
   - Look for request to `overpass-api.de`
   - Check response payload

## Still Not Working?

### Option 1: Force Test with Known Location

```javascript
// Clear everything
localStorage.clear();

// Set a known good location (e.g., New York City)
localStorage.setItem('patient_location', JSON.stringify({
  latitude: 40.7128,
  longitude: -74.0060
}));

// Reload
location.reload();
```

### Option 2: Check OpenStreetMap Coverage

1. Go to https://www.openstreetmap.org
2. Search for your city
3. Look for hospital/pharmacy markers
4. If none exist, the API won't return anything

### Option 3: View Raw API Response

```javascript
// Test and view full response
locationDebug.testAPI(YOUR_LAT, YOUR_LON)
```

Check the console for full element data.

## Expected Behavior After Fix

After clearing cache and reloading, you should see:

1. **In Console**:
   ```
   🔍 Checking cache...
   ❌ No valid cache found
   🔍 Fetching nearby places for location: {...}
   📡 Sending request to Overpass API...
   ✅ Overpass API response received. Elements found: X
   📊 Processing summary: {...}
   ✅ Found facilities: {...}
   📍 Nearby places: [real facility names]
   ```

2. **In UI**:
   - Real hospital names from your area
   - Real pharmacy names from your area
   - Accurate distances
   - Proper addresses

## Prevention

To avoid this in the future:

1. **Always use the refresh button** in the UI when changing location
2. **Don't manually edit localStorage** unless debugging
3. **Check console logs** if data seems wrong
4. **Clear cache periodically** during development

## Developer Notes

The app falls back to mock data when:
- Overpass API returns 0 results
- API request fails
- Network timeout occurs
- Response parsing fails

This is intentional to prevent broken UI, but you can disable fallback for debugging:

```typescript
// In useNearbyPlaces.ts
// Comment out these lines:
// if (places.length === 0) {
//   setFallbackData();
//   return;
// }
```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `locationDebug.clearAndReload()` | Clear cache & reload |
| `locationDebug.viewCache()` | See cached data |
| `locationDebug.testAPI(lat, lon)` | Test API for location |
| `locationDebug.testLocation()` | Check detected location |

---

**Most Common Fix**: `locationDebug.clearAndReload()` in browser console! 🚀
