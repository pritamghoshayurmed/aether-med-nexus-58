# Testing Guide for Location-Based Nearby Facilities

## Prerequisites
- Modern browser (Chrome, Firefox, Safari, Edge)
- HTTPS connection (or localhost for development)
- Location services enabled on device

## Quick Start

### 1. Start Development Server
```bash
cd d:\KabirajAI\aether-med-nexus-58
npm run dev
```

### 2. Open Browser
Navigate to: `http://localhost:5173` (or whatever port Vite uses)

### 3. Login as Patient
- Use your patient account credentials
- Navigate to Patient Dashboard

## Test Scenarios

### Test Case 1: First-Time User Experience
**Goal**: Verify location permission prompt and data fetch

**Steps**:
1. Open browser console (F12)
2. Run: `locationDebug.clearCache()`
3. Refresh the page
4. Navigate to Patient Dashboard
5. Browser should prompt for location permission
6. Click "Allow"
7. Wait 2-3 seconds
8. Verify nearby facilities appear in the sidebar

**Expected Results**:
- ✅ Permission prompt appears
- ✅ Loading spinner shows while fetching
- ✅ Facilities load with real data
- ✅ Sorted by distance (closest first)
- ✅ Shows 3 hospitals/clinics + 2 pharmacies (max)

---

### Test Case 2: Cached Data Loading
**Goal**: Verify instant loading from cache

**Steps**:
1. Complete Test Case 1 first
2. View cached data: `locationDebug.viewCache()`
3. Refresh the page or close and reopen browser
4. Navigate to Patient Dashboard
5. Facilities should load instantly

**Expected Results**:
- ✅ No permission prompt
- ✅ No loading spinner
- ✅ Instant data display (<100ms)
- ✅ Same facilities as before

---

### Test Case 3: Cache Expiration
**Goal**: Verify automatic refresh after 24 hours

**Steps**:
1. Complete Test Case 2
2. Open console
3. Run: `locationDebug.expireCache()`
4. Refresh the page
5. Navigate to Patient Dashboard
6. Should re-fetch location and places

**Expected Results**:
- ✅ Permission prompt may appear (depends on browser)
- ✅ Loading spinner shows
- ✅ New data fetched
- ✅ Cache updated with new timestamp

---

### Test Case 4: Permission Denied
**Goal**: Verify graceful handling of denied permission

**Steps**:
1. Clear cache: `locationDebug.clearCache()`
2. Refresh page
3. Navigate to Patient Dashboard
4. When prompted, click "Block" or "Deny"
5. Verify error message appears

**Expected Results**:
- ✅ Error alert shows
- ✅ Message explains permission is needed
- ✅ Instructions to enable location shown
- ✅ Fallback data displayed (or empty state)
- ✅ Refresh button available

---

### Test Case 5: Manual Refresh
**Goal**: Verify manual location update

**Steps**:
1. On Patient Dashboard with facilities loaded
2. Click the refresh button (↻) next to "Nearby Resources"
3. Grant permission if prompted
4. Wait for new data

**Expected Results**:
- ✅ Refresh button shows spinning animation
- ✅ Loading state displayed
- ✅ New location detected
- ✅ New facilities fetched
- ✅ UI updates with fresh data
- ✅ Cache updated

---

### Test Case 6: No Facilities Found
**Goal**: Verify handling when no nearby facilities exist

**Steps**:
1. Use mock location in remote area
2. Or test in actual remote location
3. Navigate to Patient Dashboard

**Expected Results**:
- ✅ "No nearby facilities found" message
- ✅ Helpful icon displayed
- ✅ Refresh button available to retry
- ✅ No error messages

---

### Test Case 7: API Failure
**Goal**: Verify graceful degradation

**Steps**:
1. Disable internet connection
2. Clear cache: `locationDebug.clearCache()`
3. Refresh page
4. Navigate to Patient Dashboard
5. Grant location permission

**Expected Results**:
- ✅ Fallback to dummy data
- ✅ No application crash
- ✅ Error handled silently
- ✅ User can still use dashboard

---

### Test Case 8: Mobile Testing
**Goal**: Verify mobile responsiveness

**Steps**:
1. Open browser DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, Android)
4. Navigate to Patient Dashboard
5. Test all features

**Expected Results**:
- ✅ UI responsive on small screens
- ✅ Touch targets adequate size (44px min)
- ✅ Text readable without zoom
- ✅ Buttons easily clickable
- ✅ Location permission works on mobile

---

## Debug Tools (Development Only)

Open browser console and use these commands:

### View Current Cache
```javascript
locationDebug.viewCache()
```
Shows all cached location data and timestamp.

### Clear Cache
```javascript
locationDebug.clearCache()
```
Removes all cached data to test first-time experience.

### Force Cache Expiration
```javascript
locationDebug.expireCache()
```
Makes cache appear 25 hours old to trigger refresh.

### Test Location Detection
```javascript
locationDebug.testLocation()
```
Tests browser location API without page reload.

### Check Permission Status
```javascript
locationDebug.checkPermission()
```
Shows current location permission state.

### Set Mock Data
```javascript
locationDebug.setMockData()
```
Loads fake facilities data for UI testing.

### Test Overpass API
```javascript
locationDebug.testAPI()
// Or with custom coordinates
locationDebug.testAPI(37.7749, -122.4194)
```
Tests API connectivity and response.

### Calculate Distance
```javascript
locationDebug.calculateDistance(lat1, lon1, lat2, lon2)
// Example: Distance from San Francisco to New York
locationDebug.calculateDistance(37.7749, -122.4194, 40.7128, -74.0060)
```

---

## Common Issues & Solutions

### Issue: Permission prompt not appearing
**Solutions**:
1. Check if location was previously blocked
2. Go to browser settings → Site settings → Location
3. Remove aether-med-nexus from blocked list
4. Refresh page

### Issue: No facilities showing
**Solutions**:
1. Check browser console for errors
2. Verify internet connection
3. Test API: `locationDebug.testAPI()`
4. Try different location
5. Increase search radius in code

### Issue: Facilities not updating
**Solutions**:
1. Clear cache: `locationDebug.clearCache()`
2. Hard refresh: Ctrl+Shift+R
3. Check if cache is expired: `locationDebug.viewCache()`
4. Try manual refresh button

### Issue: "Geolocation not supported"
**Solutions**:
1. Use modern browser (Chrome 5+, Firefox 3.5+, Safari 5+)
2. Ensure HTTPS connection (required for geolocation)
3. Check if location services enabled on device

### Issue: Slow loading
**Solutions**:
1. Check internet speed
2. Overpass API may be busy (try later)
3. Cache will prevent slow loads on subsequent visits
4. Consider implementing timeout

---

## Performance Benchmarks

Expected load times:

| Scenario | Expected Time | Acceptable Range |
|----------|--------------|------------------|
| First load (with location) | 2-3 seconds | 1-5 seconds |
| Cached load | <100ms | <500ms |
| Manual refresh | 2-3 seconds | 1-5 seconds |
| API response | 1-2 seconds | 1-4 seconds |

---

## Browser Compatibility Testing

Test on these browsers (minimum):
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Chrome Android
- ✅ Safari iOS

---

## Production Testing Checklist

Before deploying to production:

- [ ] Test with real user accounts
- [ ] Verify HTTPS is configured
- [ ] Test on multiple devices
- [ ] Test in different geographic locations
- [ ] Verify cache expiration works
- [ ] Test permission denial handling
- [ ] Verify API rate limits not exceeded
- [ ] Check mobile responsiveness
- [ ] Test offline functionality
- [ ] Verify no console errors
- [ ] Test manual refresh button
- [ ] Verify data persistence
- [ ] Check privacy compliance
- [ ] Test accessibility features
- [ ] Verify performance metrics

---

## Automated Testing (Future)

### Unit Tests
```typescript
// Test distance calculation
test('calculateDistance returns correct value', () => {
  const distance = calculateDistance(37.7749, -122.4194, 37.7849, -122.4094);
  expect(distance).toBeCloseTo(1.3, 1);
});

// Test cache validity
test('cache expires after 24 hours', () => {
  const timestamp = Date.now() - (25 * 60 * 60 * 1000);
  const isExpired = isCacheExpired(timestamp);
  expect(isExpired).toBe(true);
});
```

### Integration Tests
```typescript
// Test location request
test('requests location on mount', async () => {
  render(<PatientDashboard />);
  await waitFor(() => {
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
  });
});

// Test API call
test('fetches nearby places after location', async () => {
  const { result } = renderHook(() => useNearbyPlaces());
  await waitFor(() => {
    expect(result.current.nearbyPlaces.length).toBeGreaterThan(0);
  });
});
```

---

## Monitoring in Production

### Metrics to Track
1. Location permission grant rate
2. Average load time
3. API success rate
4. Cache hit rate
5. Error frequency
6. Mobile vs desktop usage

### Logging
Enable logging for:
- Location errors
- API failures
- Permission denials
- Cache misses
- Performance issues

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Use debug tools to diagnose
3. Verify environment variables
4. Check API status: https://overpass-api.de/
5. Review LOCATION_FEATURE.md documentation

---

Happy Testing! 🧪✨
