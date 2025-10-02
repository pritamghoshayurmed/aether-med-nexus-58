# Facility Details Modal - Implementation Guide

## 🎯 Feature Overview

Users can now click on any nearby hospital or pharmacy to view detailed information in a beautiful popup modal with:

- 📱 **Contact Information** - Phone numbers with tap-to-call
- 🗺️ **Navigation** - Direct Google Maps directions
- 📋 **Address** - Full address with copy functionality
- ⭐ **Rating** - Facility ratings (if available)
- 📏 **Distance** - Precise distance from user location
- 🔍 **Search** - Quick Google search for more info

---

## 🎨 User Experience

### Visual Indicators
1. **Hover Effect**: Cards highlight with blue border on hover
2. **Cursor Change**: Pointer cursor indicates clickable
3. **Helper Text**: "Tap for details →" appears on each card
4. **Info Banner**: Blue banner at top explains the feature

### Modal Features

#### Header Section
- Facility name and type icon (🏥 Hospital / 💊 Pharmacy)
- Status badge (Available/Open/Limited)
- Close button (X)

#### Content Sections

**1. Distance Card** (Blue highlight)
```
📍 Distance
From your location
2.3 km
```

**2. Rating** (if available)
```
⭐ 4.5 Rating
```

**3. Address**
```
📍 Address
123 Main Street, Arambagh, West Bengal
[Copy Button]
```

**4. Contact**
```
📞 Contact
+91-XXXXXXXXXX
[Copy Button]
```

**5. Service Info**
```
🕐 Emergency Services / Operating Hours
Context-specific information
```

#### Action Buttons

1. **Get Directions** (Primary)
   - Opens Google Maps with turn-by-turn navigation
   - Uses GPS coordinates when available
   - Falls back to address search

2. **Call Now** (if phone available)
   - Tap to call directly
   - Mobile-optimized

3. **Search on Google**
   - Opens Google search with facility name + address
   - Find reviews, photos, hours, etc.

---

## 🔧 Technical Implementation

### Components Created

#### `FacilityDetailsModal.tsx`
Location: `src/components/sections/FacilityDetailsModal.tsx`

**Props:**
```typescript
interface FacilityDetailsModalProps {
  facility: {
    name: string;
    type: 'Hospital' | 'Pharmacy';
    distance: string;
    status: string;
    address?: string;
    phone?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
  };
  userLocation: Location | null;
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**
- Backdrop click to close
- ESC key to close (handled by parent)
- Animated entrance (zoom + fade)
- Responsive design
- Dark mode support
- Copy-to-clipboard functionality
- Mobile-optimized buttons

### Data Flow

```
User clicks facility card
         ↓
PatientDashboard sets selectedFacility
         ↓
Opens FacilityDetailsModal
         ↓
Modal fetches data from facility object
         ↓
User interacts (call/directions/copy)
         ↓
External actions executed
```

### Files Modified

#### 1. `src/hooks/useNearbyPlaces.ts`
**Changes:**
- Added `latitude` and `longitude` to `NearbyPlace` interface
- Places now store coordinates from Overpass API
```typescript
interface NearbyPlace {
  // ... existing fields
  latitude?: number;
  longitude?: number;
}
```

#### 2. `src/pages/dashboard/PatientDashboard.tsx`
**Changes:**
- Imported `FacilityDetailsModal`
- Added state for selected facility and modal visibility
- Made facility cards clickable
- Added visual indicators
- Added info banner
- Rendered modal at bottom

**New State:**
```typescript
const [selectedFacility, setSelectedFacility] = useState<any>(null);
const [showFacilityModal, setShowFacilityModal] = useState(false);
```

**Card Enhancement:**
```typescript
<div 
  className="... cursor-pointer hover:border-primary/50"
  onClick={() => {
    setSelectedFacility(place);
    setShowFacilityModal(true);
  }}
>
```

---

## 🗺️ Navigation Implementation

### Google Maps Integration

#### 1. **With GPS Coordinates** (Most Accurate)
```javascript
https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}
```
- Uses exact coordinates
- Provides turn-by-turn navigation
- Works offline with Maps app

#### 2. **With Address** (Fallback)
```javascript
https://www.google.com/maps/dir/?api=1
  &origin=${userLat},${userLng}
  &destination=${facilityName}, ${address}
```
- Searches by name and address
- Calculates route from user location

#### 3. **Search Only** (Last Resort)
```javascript
https://www.google.com/maps/search/?api=1
  &query=${facilityName}, ${address}
```
- Just opens Maps at facility location
- No route calculation

### Platform-Specific Behavior

**Desktop:**
- Opens Google Maps web interface
- New tab/window

**Mobile:**
- Tries to open native Google Maps app
- Falls back to mobile web if app not installed
- Deep linking supported

---

## 📱 Mobile Optimizations

### Touch Interactions
- Large tap targets (min 44x44px)
- Hover effects work on tap
- Native scroll behavior
- Swipe-friendly modal

### Phone Integration
```javascript
window.location.href = `tel:${phone}`
```
- Direct dial on mobile
- Click-to-call on desktop (Skype, etc.)

### Clipboard
```javascript
navigator.clipboard.writeText(text)
```
- Works on all modern browsers
- Visual confirmation (checkmark icon)
- 2-second timeout

---

## 🎯 User Journey Examples

### Example 1: Finding Nearest Hospital

1. **User sees nearby resources**
   ```
   City Hospital
   Hospital • 2.3 km
   📍 Main Street, Arambagh
   Tap for details →
   ```

2. **Clicks on card**
   - Modal opens with full details

3. **Views information**
   - Distance: 2.3 km
   - Phone: +91-XXXXXXXXXX
   - Address: 123 Main Street...
   - Status: Available

4. **Gets directions**
   - Clicks "Get Directions"
   - Google Maps opens
   - Navigation starts

### Example 2: Calling Pharmacy

1. **User clicks pharmacy card**
2. **Modal shows contact info**
3. **Clicks "Call Now"**
4. **Phone dialer opens**
5. **User makes call**

### Example 3: Copying Address

1. **User opens facility modal**
2. **Sees address with copy icon**
3. **Clicks copy button**
4. **Checkmark appears**
5. **Address copied to clipboard**
6. **Can paste in other apps**

---

## 🎨 Styling Details

### Color Scheme
- **Primary**: Blue accents for actions
- **Success**: Green for available/open status
- **Muted**: Gray for secondary info
- **Yellow**: Star ratings

### Animations
```css
/* Modal entrance */
animate-in fade-in zoom-in-95 duration-200

/* Backdrop */
backdrop-blur-sm

/* Hover states */
hover:bg-muted/70 transition-all
hover:border-primary/50
```

### Responsive Breakpoints
- **Mobile**: Full width with padding
- **Tablet**: Max width 28rem (448px)
- **Desktop**: Centered modal
- **Max Height**: 90vh with scroll

---

## ⚙️ Configuration Options

### Customizable Features

**Distance Display:**
```typescript
distance: `${distance.toFixed(1)} km`
```
Change `toFixed(1)` for different precision

**Modal Size:**
```typescript
className="max-w-md w-full"
```
Change `max-w-md` to `max-w-lg` for larger modal

**Auto-close Timer:**
Add timeout for copy feedback:
```typescript
setTimeout(() => setCopied(false), 2000)
```

---

## 🐛 Error Handling

### No GPS Coordinates
- Falls back to address-based navigation
- Still provides search and call options

### No Phone Number
- "Call Now" button hidden
- Other features still work

### No Address
- Shows "Address not available"
- Maps search still works with name

### Network Issues
- Maps opens in new tab (user can retry)
- Copy functionality works offline
- Phone call works offline

---

## 🚀 Future Enhancements

### Potential Additions

1. **Save Favorites**
   - Let users bookmark facilities
   - Quick access to saved places

2. **Reviews & Ratings**
   - Integration with Google Places API
   - Show user reviews

3. **Real-time Hours**
   - Current open/closed status
   - Next opening time

4. **Emergency Mode**
   - One-tap emergency services
   - Quick call to ambulance

5. **Insurance Info**
   - Show accepted insurance
   - Network hospitals

6. **Wait Times**
   - Estimated wait times
   - Crowd levels

7. **Street View**
   - Preview location
   - Help finding entrance

8. **Share Location**
   - Send facility info to others
   - Share via WhatsApp/SMS

---

## 📊 Performance

### Load Time
- Modal renders instantly (already in DOM)
- No API calls required (data from cache)
- Animations: 200ms

### Bundle Size
- Component: ~5KB
- No external dependencies
- Uses existing UI components

### Accessibility
- Keyboard navigation ready
- Screen reader compatible
- High contrast mode support
- Focus management

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Click facility card opens modal
- [ ] Close button works
- [ ] Backdrop click closes modal
- [ ] All action buttons work
- [ ] Phone numbers are clickable
- [ ] Copy buttons work
- [ ] Checkmarks appear on copy
- [ ] Google Maps opens correctly
- [ ] Directions work with coordinates
- [ ] Directions work without coordinates
- [ ] Modal is responsive on mobile
- [ ] Dark mode looks good
- [ ] All icons display correctly
- [ ] Text is readable and aligned

### Test Scenarios

**Scenario 1: Complete Data**
- Facility with all fields populated
- Should show all features

**Scenario 2: Missing Phone**
- Facility without phone number
- Should hide "Call Now" button

**Scenario 3: No Coordinates**
- Facility without lat/lng
- Should use address-based navigation

**Scenario 4: Mobile Device**
- Test on actual phone
- Verify tap-to-call works
- Check Maps app opens

---

## 📱 Screenshots Flow

```
[Nearby Resources Card]
     ↓ (Click)
[Modal Backdrop Fade In]
     ↓
[Modal Zoom In]
     ↓
[Full Details Displayed]
     ↓ (User Action)
[External App Opens] OR [Copy Confirmation]
```

---

## 💡 Pro Tips

**For Users:**
- Long-press facility name to copy
- Click outside modal to close quickly
- Use "Search on Google" for photos and reviews
- Save frequent hospitals in browser bookmarks

**For Developers:**
- Modal is portal-rendered (z-index 50)
- Backdrop prevents background scrolling
- State is controlled by parent component
- Easy to extend with more actions

---

## ✅ Summary

### What We Built
✅ Interactive facility cards with hover effects
✅ Beautiful modal with complete facility details
✅ One-click navigation to Google Maps
✅ Tap-to-call phone functionality
✅ Copy-to-clipboard for phone & address
✅ Visual feedback for all actions
✅ Mobile-optimized experience
✅ Dark mode support
✅ Accessibility features

### User Benefits
🎯 Quick access to facility information
📱 Easy contact via phone
🗺️ Instant turn-by-turn directions
📋 Copy info for later use
🔍 Quick Google search for reviews
⚡ Fast, responsive interface
🌙 Works in all lighting conditions

**No more writing down addresses or searching manually - everything is one tap away!** 🎉
