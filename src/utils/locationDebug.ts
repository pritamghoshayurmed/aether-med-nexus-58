// Utility functions for testing and debugging the location feature

/**
 * Clear all cached location data
 * Use this to test first-time user experience
 */
export const clearLocationCache = () => {
  localStorage.removeItem('patient_location');
  localStorage.removeItem('nearby_places');
  localStorage.removeItem('last_fetch_timestamp');
  console.log('✅ Location cache cleared');
  console.log('💡 Refresh the page to fetch new data');
};

/**
 * Clear cache and reload page automatically
 */
export const clearCacheAndReload = () => {
  localStorage.removeItem('patient_location');
  localStorage.removeItem('nearby_places');
  localStorage.removeItem('last_fetch_timestamp');
  console.log('✅ Cache cleared. Reloading page...');
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

/**
 * View current cached data
 */
export const viewCachedData = () => {
  const location = localStorage.getItem('patient_location');
  const places = localStorage.getItem('nearby_places');
  const timestamp = localStorage.getItem('last_fetch_timestamp');
  
  console.group('📍 Cached Location Data');
  console.log('Location:', location ? JSON.parse(location) : 'None');
  console.log('Places:', places ? JSON.parse(places) : 'None');
  console.log('Last Fetch:', timestamp ? new Date(parseInt(timestamp)).toLocaleString() : 'Never');
  console.log('Cache Age:', timestamp ? `${Math.floor((Date.now() - parseInt(timestamp)) / 1000 / 60)} minutes` : 'N/A');
  console.groupEnd();
};

/**
 * Force cache expiration for testing
 * Makes cache appear 25 hours old
 */
export const expireCache = () => {
  const twentyFiveHoursAgo = Date.now() - (25 * 60 * 60 * 1000);
  localStorage.setItem('last_fetch_timestamp', twentyFiveHoursAgo.toString());
  console.log('⏰ Cache expired (set to 25 hours ago)');
};

/**
 * Test location detection without page reload
 */
export const testLocationDetection = () => {
  if (!navigator.geolocation) {
    console.error('❌ Geolocation not supported');
    return;
  }

  console.log('🔍 Testing location detection...');
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.group('✅ Location detected');
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      console.log('Accuracy:', position.coords.accuracy, 'meters');
      console.groupEnd();
    },
    (error) => {
      console.group('❌ Location error');
      console.log('Code:', error.code);
      console.log('Message:', error.message);
      console.groupEnd();
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};

/**
 * Check if location permission is granted
 */
export const checkLocationPermission = async () => {
  if (!navigator.permissions) {
    console.log('⚠️ Permissions API not supported');
    return;
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    console.log('🔐 Location Permission:', result.state);
    
    result.addEventListener('change', () => {
      console.log('🔐 Permission changed to:', result.state);
    });
  } catch (error) {
    console.error('❌ Error checking permission:', error);
  }
};

/**
 * Simulate nearby places data for testing UI
 */
export const setMockPlaces = () => {
  const mockPlaces = [
    {
      name: "Test Hospital #1",
      type: "Hospital",
      distance: "1.2 km",
      status: "available",
      address: "123 Medical Street"
    },
    {
      name: "Test Pharmacy #1",
      type: "Pharmacy",
      distance: "0.5 km",
      status: "open",
      address: "456 Health Avenue"
    },
    {
      name: "Test Hospital #2",
      type: "Hospital",
      distance: "2.8 km",
      status: "limited",
      address: "789 Care Road"
    }
  ];

  localStorage.setItem('nearby_places', JSON.stringify(mockPlaces));
  localStorage.setItem('patient_location', JSON.stringify({ latitude: 0, longitude: 0 }));
  localStorage.setItem('last_fetch_timestamp', Date.now().toString());
  
  console.log('✅ Mock places data set');
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

/**
 * Test Overpass API connectivity
 */
export const testOverpassAPI = async (lat = 37.7749, lon = -122.4194) => {
  console.log('🔍 Testing Overpass API...');
  
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:5000,${lat},${lon});
      node["amenity"="pharmacy"](around:5000,${lat},${lon});
    );
    out body;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });

    if (!response.ok) {
      console.error('❌ API request failed:', response.status);
      return;
    }

    const data = await response.json();
    console.group('✅ Overpass API Response');
    console.log('Total results:', data.elements?.length || 0);
    console.log('First 3 results:', data.elements?.slice(0, 3));
    console.groupEnd();
  } catch (error) {
    console.error('❌ API error:', error);
  }
};

// Make functions available in browser console for debugging
if (typeof window !== 'undefined') {
  (window as any).locationDebug = {
    clearCache: clearLocationCache,
    clearAndReload: clearCacheAndReload,
    viewCache: viewCachedData,
    expireCache,
    testLocation: testLocationDetection,
    checkPermission: checkLocationPermission,
    setMockData: setMockPlaces,
    calculateDistance,
    testAPI: testOverpassAPI
  };
  
  console.log(`
🔧 Location Debug Tools Available:

locationDebug.clearCache()       - Clear all cached data
locationDebug.clearAndReload()   - Clear cache and reload page
locationDebug.viewCache()        - View current cache
locationDebug.expireCache()      - Force cache expiration
locationDebug.testLocation()     - Test location detection
locationDebug.checkPermission()  - Check location permission
locationDebug.setMockData()      - Set mock places data
locationDebug.testAPI()          - Test Overpass API
locationDebug.calculateDistance(lat1, lon1, lat2, lon2) - Calculate distance

⚠️  If you're seeing mock data, try:
1. locationDebug.viewCache() - Check what's cached
2. locationDebug.clearAndReload() - Clear and refresh
3. Check console logs for API responses

Example usage:
> locationDebug.clearAndReload()
  `);
}

export default {
  clearLocationCache,
  clearCacheAndReload,
  viewCachedData,
  expireCache,
  testLocationDetection,
  checkLocationPermission,
  setMockPlaces,
  calculateDistance,
  testOverpassAPI
};
