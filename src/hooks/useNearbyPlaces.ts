import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  source?: 'gps' | 'ip' | 'manual';
}

interface NearbyPlace {
  name: string;
  type: 'Hospital' | 'Pharmacy';
  distance: string;
  status: string;
  address?: string;
  rating?: number;
  phone?: string;
  place_id?: string;
  latitude?: number;
  longitude?: number;
}

const LOCATION_CACHE_KEY = 'patient_location';
const PLACES_CACHE_KEY = 'nearby_places';
const LAST_FETCH_KEY = 'last_fetch_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const LOCATION_ACCURACY_THRESHOLD = 100; // meters - acceptable GPS accuracy

export const useNearbyPlaces = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [locationSource, setLocationSource] = useState<'gps' | 'ip' | 'manual' | null>(null);

  // Load cached data on mount
  useEffect(() => {
    loadCachedData();
  }, []);

  const loadCachedData = () => {
    try {
      const cachedLocation = localStorage.getItem(LOCATION_CACHE_KEY);
      const cachedPlaces = localStorage.getItem(PLACES_CACHE_KEY);
      const lastFetch = localStorage.getItem(LAST_FETCH_KEY);

      console.log('🔍 Checking cache...', {
        hasLocation: !!cachedLocation,
        hasPlaces: !!cachedPlaces,
        hasTimestamp: !!lastFetch
      });

      if (cachedLocation && cachedPlaces && lastFetch) {
        const timeSinceLastFetch = Date.now() - parseInt(lastFetch);
        const cacheAgeHours = timeSinceLastFetch / (1000 * 60 * 60);

        console.log('📦 Cache found. Age:', cacheAgeHours.toFixed(1), 'hours');

        // If cache is still valid (less than 24 hours old)
        if (timeSinceLastFetch < CACHE_DURATION) {
          console.log('✅ Using cached data');
          const parsedLocation = JSON.parse(cachedLocation);
          const places = JSON.parse(cachedPlaces);

          setLocation(parsedLocation);
          setNearbyPlaces(places);
          console.log('📍 Loaded from cache:', places.length, 'places');
          console.log('📍 Cached places:', places);
          return true;
        } else {
          console.log('⏰ Cache expired. Will fetch fresh data.');
          // Clear expired cache
          localStorage.removeItem(LOCATION_CACHE_KEY);
          localStorage.removeItem(PLACES_CACHE_KEY);
          localStorage.removeItem(LAST_FETCH_KEY);
        }
      } else {
        console.log('❌ No valid cache found. Will request location.');
      }

      // If no valid cache, request location
      if (!permissionDenied) {
        requestLocationAndFetchPlaces();
      }
      return false;
    } catch (err) {
      console.error('❌ Error loading cached data:', err);
      return false;
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  const tryIPGeolocation = async (): Promise<Location | null> => {
    try {
      console.log('🌐 Attempting IP-based geolocation...');

      // Using ipapi.co - free, no API key required
      const response = await fetch('https://ipapi.co/json/');

      if (!response.ok) {
        console.error('❌ IP geolocation API error:', response.status);
        return null;
      }

      const data = await response.json();

      if (data.latitude && data.longitude) {
        console.log('📍 IP Location received:', {
          latitude: data.latitude.toFixed(6),
          longitude: data.longitude.toFixed(6),
          city: data.city,
          region: data.region,
          country: data.country_name
        });

        // Validate location is in India
        if (data.country_code !== 'IN') {
          console.warn('⚠️ IP location not in India:', data.country_name);
          setError(`Detected location: ${data.country_name}. Please set your location manually for accurate results.`);
          setLoading(false);
          return null;
        }

        const ipLocation: Location = {
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: 5000, // IP geolocation is typically accurate to ~5km
          source: 'ip'
        };

        setLocation(ipLocation);
        setLocationSource('ip');
        localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(ipLocation));

        await fetchNearbyPlaces(data.latitude, data.longitude);

        setError('Using approximate location from your IP address. For precise results, enable GPS or set location manually.');
        setLoading(false);

        return ipLocation;
      } else {
        console.error('❌ Invalid IP geolocation response');
        setError('Could not determine your location. Please set it manually.');
        setLoading(false);
        return null;
      }
    } catch (err) {
      console.error('❌ IP geolocation failed:', err);
      setError('Location detection failed. Please set your location manually for accurate results.');
      setLoading(false);
      return null;
    }
  };

  const requestLocationAndFetchPlaces = async (forceRefresh = false) => {
    if (loading) {
      console.log('⏳ Already loading, skipping request');
      return;
    }

    // Check if we have valid cache and it's not a force refresh
    if (!forceRefresh) {
      const hasCachedData = loadCachedData();
      if (hasCachedData) {
        console.log('✅ Using cached data, skipping new request');
        return;
      }
    } else {
      console.log('🔄 Force refresh requested, fetching new data');
    }

    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    console.log('🎯 Attempting high-precision GPS location...');

    // Try high-precision GPS first
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        console.log('📍 GPS Location received:', {
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
          accuracy: accuracy ? `${accuracy.toFixed(1)}m` : 'unknown'
        });

        // Validate location is in India (rough bounds)
        if (latitude < 8 || latitude > 37 || longitude < 68 || longitude > 97) {
          console.warn('⚠️ GPS location outside India bounds, trying IP geolocation...');
          await tryIPGeolocation();
          return;
        }

        // Check if accuracy is acceptable
        if (accuracy && accuracy > LOCATION_ACCURACY_THRESHOLD) {
          console.warn(`⚠️ GPS accuracy (${accuracy.toFixed(1)}m) exceeds threshold (${LOCATION_ACCURACY_THRESHOLD}m)`);
          console.log('🔄 Attempting to improve accuracy with IP geolocation...');

          // Try IP geolocation for comparison
          const ipLocation = await tryIPGeolocation();

          if (ipLocation) {
            // Compare GPS and IP locations
            const distance = calculateDistance(latitude, longitude, ipLocation.latitude, ipLocation.longitude);
            console.log(`📊 GPS vs IP distance: ${distance.toFixed(2)}km`);

            // If they're very different, ask user which to trust
            if (distance > 5) {
              console.warn('⚠️ GPS and IP locations differ significantly');
              setError(`Location accuracy: ${accuracy.toFixed(0)}m. You may want to manually set your location for better results.`);
            }
          }
        } else {
          console.log('✅ GPS accuracy is good!');
        }

        const newLocation: Location = {
          latitude,
          longitude,
          accuracy,
          source: 'gps'
        };

        setLocation(newLocation);
        setLocationSource('gps');
        localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(newLocation));

        // Fetch nearby places using Overpass API
        await fetchNearbyPlaces(latitude, longitude);

        setPermissionDenied(false);
        setLoading(false);
      },
      async (error) => {
        console.error('❌ GPS Error:', error.message);

        if (error.code === error.PERMISSION_DENIED) {
          console.log('🚫 GPS permission denied, trying IP geolocation...');
          setPermissionDenied(true);
          await tryIPGeolocation();
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          console.log('📡 GPS unavailable, trying IP geolocation...');
          setError('GPS unavailable. Using approximate location...');
          await tryIPGeolocation();
        } else if (error.code === error.TIMEOUT) {
          console.log('⏱️ GPS timeout, trying IP geolocation...');
          setError('GPS timeout. Using approximate location...');
          await tryIPGeolocation();
        } else {
          console.log('❓ Unknown GPS error, trying IP geolocation...');
          await tryIPGeolocation();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000, // 20 seconds for high accuracy
        maximumAge: 0 // Don't use cached GPS data
      }
    );
  };

  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    console.log('🔍 Fetching nearby places for location:', { latitude, longitude });

    try {
      // Increased radius to 25km to find more results
      const radius = 25000; // 25km in meters

      const query = `
        [out:json][timeout:45];
        (
          node["amenity"="hospital"](around:${radius},${latitude},${longitude});
          way["amenity"="hospital"](around:${radius},${latitude},${longitude});
          node["amenity"="clinic"](around:${radius},${latitude},${longitude});
          way["amenity"="clinic"](around:${radius},${latitude},${longitude});
          node["amenity"="doctors"](around:${radius},${latitude},${longitude});
          way["amenity"="doctors"](around:${radius},${latitude},${longitude});
          node["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
          way["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `;

      console.log('📡 Sending request to Overpass API...');
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (!response.ok) {
        console.error('❌ Overpass API error. Status:', response.status);
        throw new Error(`Overpass API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Overpass API response received. Elements found:', data.elements?.length || 0);

      if (data.elements && data.elements.length > 0) {
        console.log('📋 Sample element:', data.elements[0]);
      }

      const places: NearbyPlace[] = [];

      if (data.elements && data.elements.length > 0) {
        let processedCount = 0;
        let skippedNoName = 0;
        let skippedNoCoords = 0;

        data.elements.forEach((element: any) => {
          // Skip elements without names
          if (!element.tags?.name) {
            skippedNoName++;
            return;
          }

          const lat = element.lat || element.center?.lat;
          const lon = element.lon || element.center?.lon;

          if (!lat || !lon) {
            skippedNoCoords++;
            return;
          }

          const distance = calculateDistance(latitude, longitude, lat, lon);

          // Skip if distance is more than 25km
          if (distance > 25) {
            console.log(`⚠️ Skipping ${element.tags.name} - too far (${distance.toFixed(1)} km)`);
            return;
          }

          const amenity = element.tags.amenity;
          let type: 'Hospital' | 'Pharmacy';
          let status = 'available';

          if (amenity === 'hospital' || amenity === 'clinic' || amenity === 'doctors') {
            type = 'Hospital';
            status = element.tags.emergency === 'yes' ? 'available' : 'limited';
          } else if (amenity === 'pharmacy') {
            type = 'Pharmacy';
            status = element.tags.opening_hours ? 'open' : 'open';
          } else {
            return;
          }

          // Build a more detailed address
          const street = element.tags['addr:street'];
          const houseNumber = element.tags['addr:housenumber'];
          const city = element.tags['addr:city'];
          const district = element.tags['addr:district'];
          const state = element.tags['addr:state'];

          let addressParts = [];
          if (street) {
            addressParts.push(houseNumber ? `${houseNumber} ${street}` : street);
          }
          if (city) addressParts.push(city);
          if (district && district !== city) addressParts.push(district);
          if (state) addressParts.push(state);

          const fullAddress = addressParts.length > 0
            ? addressParts.join(', ')
            : 'Address not available';

          places.push({
            name: element.tags.name,
            type: type,
            distance: `${distance.toFixed(1)} km`,
            status: status,
            address: fullAddress,
            phone: element.tags.phone || element.tags['contact:phone'],
            latitude: lat,
            longitude: lon
          });

          processedCount++;

          // Log each place as we add it
          console.log(`✅ Added: ${element.tags.name} (${type}) - ${distance.toFixed(1)}km - ${city || district || 'Unknown location'}`);
        });

        console.log('📊 Processing summary:', {
          totalElements: data.elements.length,
          processed: processedCount,
          skippedNoName,
          skippedNoCoords,
          validPlaces: places.length
        });
      }

      // If no places found, just return empty
      if (places.length === 0) {
        console.warn('⚠️ No places found nearby.');
        setNearbyPlaces([]);
        return;
      }

      // Sort by distance
      places.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });

      // Limit to top results (3 hospitals + 2 pharmacies)
      const hospitals = places.filter(p => p.type === 'Hospital').slice(0, 3);
      const pharmacies = places.filter(p => p.type === 'Pharmacy').slice(0, 2);
      const limitedPlaces = [...hospitals, ...pharmacies];

      console.log('✅ Found facilities:', {
        hospitals: hospitals.length,
        pharmacies: pharmacies.length,
        total: limitedPlaces.length
      });

      console.log('📍 Nearby places:', limitedPlaces.map(p => ({
        name: p.name,
        type: p.type,
        distance: p.distance,
        address: p.address
      })));

      // Update state with new data
      console.log('🔄 Updating state with new places...');
      setNearbyPlaces(limitedPlaces);

      // Cache the results
      localStorage.setItem(PLACES_CACHE_KEY, JSON.stringify(limitedPlaces));
      localStorage.setItem(LAST_FETCH_KEY, Date.now().toString());

      console.log('💾 Data cached successfully');
      console.log('✨ State should now show:', limitedPlaces.length, 'places');

    } catch (err) {
      console.error('❌ Error fetching nearby places:', err);
      setError('Failed to fetch nearby places. Please try again later.');
      setNearbyPlaces([]);
    }
  };



  const refreshLocation = () => {
    console.log('🔄 Manual refresh triggered');
    // Clear cache before refreshing
    localStorage.removeItem(LOCATION_CACHE_KEY);
    localStorage.removeItem(PLACES_CACHE_KEY);
    localStorage.removeItem(LAST_FETCH_KEY);
    requestLocationAndFetchPlaces(true);
  };

  const setManualLocation = async (latitude: number, longitude: number) => {
    console.log('🎯 Manual location set:', { latitude, longitude });

    // Validate coordinates are reasonable for India
    if (latitude < 8 || latitude > 37 || longitude < 68 || longitude > 97) {
      setError('Invalid coordinates. Please enter valid Indian coordinates.');
      return;
    }

    const newLocation: Location = {
      latitude,
      longitude,
      accuracy: 0,
      source: 'manual'
    };
    setLocation(newLocation);
    setLocationSource('manual');
    setError(null);

    // Clear cache and fetch new data
    localStorage.removeItem(PLACES_CACHE_KEY);
    localStorage.removeItem(LAST_FETCH_KEY);
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(newLocation));

    setLoading(true);
    await fetchNearbyPlaces(latitude, longitude);
    setLoading(false);
  };

  const searchByPinCode = async (pinCode: string) => {
    console.log('🔍 Searching by PIN code:', pinCode);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pinCode}&country=India&format=json`);

      if (!response.ok) {
        throw new Error('Failed to fetch location from PIN code');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        console.log('📍 PIN code location found:', { latitude, longitude, display_name });

        const newLocation: Location = {
          latitude,
          longitude,
          accuracy: 0,
          source: 'manual'
        };

        setLocation(newLocation);
        setLocationSource('manual');

        // Clear cache and fetch new data
        localStorage.removeItem(PLACES_CACHE_KEY);
        localStorage.removeItem(LAST_FETCH_KEY);
        localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(newLocation));

        await fetchNearbyPlaces(latitude, longitude);
      } else {
        setError('Invalid PIN code or location not found. Please try a different PIN code.');
        setNearbyPlaces([]);
      }
    } catch (err) {
      console.error('❌ Error searching by PIN code:', err);
      setError('Failed to search by PIN code. Please try again.');
      setNearbyPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationInfo = () => {
    if (!location) return null;

    // Arambagh coordinates (approximate)
    const arambaghLat = 22.8833;
    const arambaghLon = 87.7833;

    const distanceFromArambagh = calculateDistance(
      location.latitude,
      location.longitude,
      arambaghLat,
      arambaghLon
    );

    return {
      coordinates: location,
      distanceFromArambagh: distanceFromArambagh.toFixed(1) + ' km',
      isNearArambagh: distanceFromArambagh < 50 // Within 50km of Arambagh
    };
  };

  return {
    location,
    nearbyPlaces,
    loading,
    error,
    permissionDenied,
    locationSource,
    refreshLocation,
    setManualLocation,
    searchByPinCode,
    getCurrentLocationInfo,
    requestLocationAndFetchPlaces
  };
};
