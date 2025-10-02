# Location Feature Architecture & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Patient Dashboard                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │  useNearbyPlaces Hook                              │    │
│  │  - Manages state                                   │    │
│  │  - Handles location                                │    │
│  │  - Fetches places                                  │    │
│  │  - Manages cache                                   │    │
│  └───────────────┬────────────────────────────────────┘    │
│                  │                                          │
│                  ▼                                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Nearby Resources Card                             │    │
│  │  - Display facilities                              │    │
│  │  - Show loading states                             │    │
│  │  - Handle errors                                   │    │
│  │  - Refresh button                                  │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
    ┌───────────────┐           ┌──────────────────┐
    │ localStorage  │           │ Browser          │
    │ - location    │           │ Geolocation API  │
    │ - places      │           │                  │
    │ - timestamp   │           │                  │
    └───────────────┘           └────────┬─────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │ Overpass API    │
                                │ (OpenStreetMap) │
                                │ - Hospitals     │
                                │ - Pharmacies    │
                                └─────────────────┘
```

## Data Flow Diagram

### First-Time User Flow

```
User Opens Dashboard
        │
        ▼
Check localStorage
        │
        ├─ No Cache Found
        │       │
        │       ▼
        │  Request Location Permission
        │       │
        │       ├─ Granted ────┐
        │       │               ▼
        │       │          Get Coordinates
        │       │               │
        │       │               ▼
        │       │          Fetch from Overpass API
        │       │               │
        │       │               ├─ Success
        │       │               │     │
        │       │               │     ▼
        │       │               │  Process Results
        │       │               │     │
        │       │               │     ▼
        │       │               │  Sort by Distance
        │       │               │     │
        │       │               │     ▼
        │       │               │  Save to Cache
        │       │               │     │
        │       │               │     ▼
        │       │               │  Display Facilities
        │       │               │
        │       │               └─ Error
        │       │                     │
        │       │                     ▼
        │       │                Show Fallback Data
        │       │
        │       └─ Denied
        │               │
        │               ▼
        │          Show Error Message
        │               │
        │               ▼
        │          Show Fallback Data
        │
        └─ Cache Valid (<24h)
                │
                ▼
           Load from Cache
                │
                ▼
           Display Instantly
```

### Returning User Flow (Within 24 Hours)

```
User Opens Dashboard
        │
        ▼
Check localStorage
        │
        ▼
Cache Found & Valid
        │
        ▼
Load Cached Data
        │
        ▼
Display Facilities
(Instant - <100ms)
```

### Manual Refresh Flow

```
User Clicks Refresh Button
        │
        ▼
Show Loading State
        │
        ▼
Request Location Permission
(if not granted)
        │
        ▼
Get Current Coordinates
        │
        ▼
Fetch from Overpass API
        │
        ├─ Success
        │     │
        │     ▼
        │  Update Cache
        │     │
        │     ▼
        │  Update UI
        │
        └─ Error
              │
              ▼
         Show Error Message
              │
              ▼
         Keep Old Data
```

## State Management

```
useNearbyPlaces Hook State:
┌──────────────────────────────────┐
│ location: Location | null        │
│ nearbyPlaces: NearbyPlace[]      │
│ loading: boolean                 │
│ error: string | null             │
│ permissionDenied: boolean        │
└──────────────────────────────────┘
```

## Cache Strategy

```
Cache Check Decision Tree:
┌─────────────────────────┐
│   Check localStorage    │
└───────────┬─────────────┘
            │
            ├─ No Data
            │     │
            │     └─► Request Location
            │
            ├─ Data Exists
            │     │
            │     └─► Check Timestamp
            │              │
            │              ├─ < 24h Old
            │              │     │
            │              │     └─► Use Cache
            │              │
            │              └─ > 24h Old
            │                    │
            │                    └─► Request Location
            │
            └─ Force Refresh
                  │
                  └─► Request Location
```

## API Query Structure

```
Overpass API Query:
┌────────────────────────────────────┐
│ [out:json][timeout:25];           │
│ (                                  │
│   node["amenity"="hospital"]       │
│     (around:5000,lat,lon);         │
│   way["amenity"="hospital"]        │
│     (around:5000,lat,lon);         │
│   node["amenity"="clinic"]         │
│     (around:5000,lat,lon);         │
│   way["amenity"="clinic"]          │
│     (around:5000,lat,lon);         │
│   node["amenity"="pharmacy"]       │
│     (around:5000,lat,lon);         │
│   way["amenity"="pharmacy"]        │
│     (around:5000,lat,lon);         │
│ );                                 │
│ out body;                          │
└────────────────────────────────────┘
         │
         ▼
    Overpass API
         │
         ▼
    ┌─────────────────┐
    │ JSON Response   │
    │ - elements[]    │
    │   - name        │
    │   - lat/lon     │
    │   - tags        │
    │     - amenity   │
    │     - address   │
    │     - phone     │
    └─────────────────┘
```

## Component Hierarchy

```
PatientDashboard
└── Nearby Resources Card
    ├── Header
    │   ├── Title (with MapPin icon)
    │   └── Refresh Button
    │
    ├── Error Alert (conditional)
    │   └── Error Message
    │
    └── Content
        ├── Loading State
        │   └── Spinner + Text
        │
        ├── Facilities List
        │   └── For each place:
        │       ├── Name + Status Badge
        │       ├── Type + Distance
        │       ├── Address
        │       └── Icon (Hospital/Pharmacy)
        │
        └── Empty State
            ├── Icon
            ├── Message
            └── Refresh Button
```

## Performance Timeline

```
First Load Performance:
0ms     │ Component Mounts
        │
50ms    │ Check Cache (Miss)
        │
100ms   │ Request Location Permission
        │
2000ms  │ Location Acquired
        │ ↓
2100ms  │ API Request Sent
        │
3500ms  │ API Response Received
        │ ↓
3600ms  │ Process & Sort Results
        │ ↓
3650ms  │ Save to Cache
        │ ↓
3700ms  │ ✅ Display to User

Cached Load Performance:
0ms     │ Component Mounts
        │
50ms    │ Check Cache (Hit)
        │ ↓
75ms    │ Load from localStorage
        │ ↓
100ms   │ ✅ Display to User
```

## Distance Calculation Algorithm

```
Haversine Formula:
┌──────────────────────────────────────┐
│ Input: (lat1, lon1), (lat2, lon2)  │
│                                      │
│ 1. Convert to radians               │
│    dLat = (lat2 - lat1) * π/180     │
│    dLon = (lon2 - lon1) * π/180     │
│                                      │
│ 2. Apply Haversine                  │
│    a = sin²(dLat/2) +               │
│        cos(lat1) * cos(lat2) *      │
│        sin²(dLon/2)                 │
│                                      │
│ 3. Calculate distance               │
│    c = 2 * atan2(√a, √(1-a))       │
│    d = R * c                        │
│                                      │
│ Output: distance in km              │
└──────────────────────────────────────┘
Where R = 6371 km (Earth's radius)
```

## Error Handling Flow

```
Error Scenarios:
┌────────────────────────────────────┐
│ Permission Denied                  │
│ └─► Show error alert              │
│     └─► Show fallback data        │
│         └─► Offer refresh button  │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ API Request Failed                 │
│ └─► Catch error                   │
│     └─► Log to console            │
│         └─► Use fallback data     │
│             └─► Silent to user    │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ No Results Found                   │
│ └─► Show empty state              │
│     └─► Display message           │
│         └─► Offer refresh         │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Geolocation Timeout                │
│ └─► Catch timeout error           │
│     └─► Show error message        │
│         └─► Retry option          │
└────────────────────────────────────┘
```

## Security Considerations

```
Security Layer:
┌────────────────────────────────────┐
│ Browser Security                   │
│ - HTTPS required for geolocation   │
│ - User permission mandatory        │
│ - Revocable at any time            │
└────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ Data Storage                       │
│ - Only coordinates stored          │
│ - No personal identifiers          │
│ - Local storage only               │
│ - Can be cleared anytime           │
└────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ API Communication                  │
│ - Direct browser-to-API            │
│ - No server middleman              │
│ - No tracking                      │
│ - No data persistence on API       │
└────────────────────────────────────┘
```

## Mobile Responsiveness

```
Responsive Breakpoints:
┌──────────────────────────────────────────┐
│ Mobile (<640px)                          │
│ - Full width cards                       │
│ - Stacked layout                         │
│ - Touch-friendly buttons (44px min)      │
│ - Simplified info display                │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│ Tablet (640px - 1024px)                  │
│ - 2-column grid                          │
│ - Moderate info density                  │
│ - Balanced spacing                       │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│ Desktop (>1024px)                        │
│ - 3-column grid                          │
│ - Full info display                      │
│ - Hover effects enabled                  │
│ - Maximum data density                   │
└──────────────────────────────────────────┘
```

## Future Architecture Extensions

```
Potential Enhancements:
┌────────────────────────────────────┐
│ Google Maps Integration            │
│ └─► Directions                    │
│     └─► Street view               │
│         └─► Live traffic          │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Backend Integration                │
│ └─► Store preferences             │
│     └─► Favorite locations        │
│         └─► Visit history         │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Real-time Data                     │
│ └─► Hospital bed availability     │
│     └─► Pharmacy stock levels     │
│         └─► Wait times            │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Advanced Features                  │
│ └─► Emergency mode                │
│     └─► Appointment booking       │
│         └─► Reviews & ratings     │
└────────────────────────────────────┘
```

---

## Summary

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Efficient caching strategy
- ✅ Robust error handling
- ✅ Privacy-focused design
- ✅ Scalable structure
- ✅ Performance optimization
- ✅ Mobile-first approach
- ✅ User-centric experience

The system is designed to be maintainable, testable, and extensible for future enhancements.
