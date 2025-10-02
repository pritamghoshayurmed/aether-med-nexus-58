/**
 * Convert DMS (Degrees, Minutes, Seconds) to Decimal Degrees
 * Example: 22°46'54.2"N becomes 22.781717
 */
export function dmsToDecimal(
  degrees: number,
  minutes: number,
  seconds: number,
  direction: 'N' | 'S' | 'E' | 'W'
): number {
  let decimal = degrees + minutes / 60 + seconds / 3600;
  
  // South and West are negative
  if (direction === 'S' || direction === 'W') {
    decimal = -decimal;
  }
  
  return decimal;
}

/**
 * Parse DMS string to decimal
 * Supports formats:
 * - 22°46'54.2"N or 22°46'54.2''N
 * - 22 46 54.2 N
 * - 22d46m54.2sN
 */
export function parseDMS(dmsString: string): number | null {
  try {
    // Clean the string
    dmsString = dmsString.trim().toUpperCase();
    
    // Extract direction (N, S, E, W)
    const direction = dmsString.match(/[NSEW]$/)?.[0] as 'N' | 'S' | 'E' | 'W' | undefined;
    if (!direction) return null;
    
    // Remove direction and clean
    let cleaned = dmsString.replace(/[NSEW]$/i, '').trim();
    
    // Replace common separators with spaces
    cleaned = cleaned.replace(/[°'"dms]/gi, ' ').replace(/\s+/g, ' ').trim();
    
    // Split into parts
    const parts = cleaned.split(' ').map(p => parseFloat(p));
    
    if (parts.length < 1 || parts.length > 3) return null;
    
    const degrees = parts[0] || 0;
    const minutes = parts[1] || 0;
    const seconds = parts[2] || 0;
    
    return dmsToDecimal(degrees, minutes, seconds, direction);
  } catch (error) {
    console.error('Error parsing DMS:', error);
    return null;
  }
}

/**
 * Format decimal degrees to readable string
 */
export function formatCoordinate(decimal: number, type: 'lat' | 'lng'): string {
  const direction = type === 'lat' 
    ? (decimal >= 0 ? 'N' : 'S')
    : (decimal >= 0 ? 'E' : 'W');
    
  return `${Math.abs(decimal).toFixed(6)}°${direction}`;
}

/**
 * Validate if coordinates are within India bounds
 */
export function isInIndia(lat: number, lng: number): boolean {
  return lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97;
}

/**
 * Common Indian city coordinates for quick reference
 */
export const INDIAN_CITIES = {
  arambagh: { lat: 22.8833, lng: 87.7833, name: 'Arambagh' },
  kolkata: { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
  delhi: { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
  mumbai: { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
  bangalore: { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
  chennai: { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
  hyderabad: { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
};
