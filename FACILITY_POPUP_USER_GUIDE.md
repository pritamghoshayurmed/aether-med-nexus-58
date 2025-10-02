# Quick Guide: Facility Details Popup

## 🎯 How It Works

### Step 1: View Nearby Facilities
Look at the "Nearby Resources" card in your dashboard. You'll see:
```
┌─────────────────────────────┐
│ 💡 Click on any facility to │
│    view details, contact     │
│    info, and get directions  │
└─────────────────────────────┘

┌─────────────────────────────┐
│ City Hospital               │
│ Hospital • 2.3 km   [Open]  │
│ 📍 Main St, Arambagh        │
│ 🏥 Healthcare Facility      │
│           Tap for details → │
└─────────────────────────────┘
```

### Step 2: Click Any Facility
The facility card will:
- Show blue border on hover
- Change cursor to pointer
- Open detailed popup on click

### Step 3: View Complete Details

The popup shows:

```
╔═════════════════════════════════════╗
║ 🏥 City Hospital          [Close X] ║
║ [Open] Hospital                     ║
╠═════════════════════════════════════╣
║                                     ║
║ ┌─────────────────────────────┐   ║
║ │ 📍 Distance                 │   ║
║ │ From your location          │   ║
║ │                      2.3 km │   ║
║ └─────────────────────────────┘   ║
║                                     ║
║ ⭐ 4.5 Rating                       ║
║                                     ║
║ 📍 Address                 [Copy]   ║
║ 123 Main Street, Arambagh           ║
║ West Bengal                         ║
║                                     ║
║ 📞 Contact                 [Copy]   ║
║ +91-1234567890                      ║
║                                     ║
║ 🕐 Emergency Services               ║
║ Most hospitals provide 24/7         ║
║ emergency services                  ║
║                                     ║
║ ┌─────────────────────────────┐   ║
║ │  📍 Get Directions           │   ║
║ └─────────────────────────────┘   ║
║ ┌─────────────────────────────┐   ║
║ │  📞 Call Now                 │   ║
║ └─────────────────────────────┘   ║
║ ┌─────────────────────────────┐   ║
║ │  🔍 Search on Google         │   ║
║ └─────────────────────────────┘   ║
║                                     ║
╠═════════════════════════════════════╣
║ 💡 Tap on phone/address to copy •  ║
║    Directions open in Google Maps   ║
╚═════════════════════════════════════╝
```

---

## 🎬 Action Buttons Explained

### 1. 📍 Get Directions
**What it does:**
- Opens Google Maps with turn-by-turn navigation
- Shows route from your current location
- Estimates travel time and distance

**On Mobile:**
- Opens Google Maps app (if installed)
- Falls back to mobile web

**On Desktop:**
- Opens Google Maps in new tab
- Can switch to Street View

---

### 2. 📞 Call Now
**What it does:**
- Directly calls the facility
- Opens phone dialer with number pre-filled

**On Mobile:**
- Instant phone call
- No need to copy/paste number

**On Desktop:**
- Opens default calling app (Skype, Teams, etc.)
- Or copies number to clipboard

---

### 3. 🔍 Search on Google
**What it does:**
- Opens Google search for the facility
- Find reviews, photos, website, hours

**Useful for:**
- Reading patient reviews
- Viewing facility photos
- Finding official website
- Checking current hours
- Seeing more contact options

---

## 📋 Copy Buttons

### Phone Number Copy
```
📞 Contact                 [📋]
+91-1234567890
```
Click the copy icon → ✅ Checkmark appears → Number copied!

### Address Copy
```
📍 Address                 [📋]
123 Main Street, Arambagh
```
Click the copy icon → ✅ Checkmark appears → Address copied!

**Why copy?**
- Share with family/friends
- Paste in other apps
- Send via WhatsApp/SMS
- Add to contacts

---

## 🗺️ Navigation Examples

### Example 1: Hospital Emergency
```
Your Location: Home (22.781717, 87.863430)
Hospital: City Hospital (22.783456, 87.861234)

Click "Get Directions"
↓
Google Maps Opens
↓
Shows: 2.3 km • 5 min drive
Route: Via Main Road
Turn-by-turn navigation ready
```

### Example 2: Pharmacy Visit
```
You need medicine urgently

1. See "MedPlus Pharmacy" - 0.8 km
2. Click card → Modal opens
3. Check status: "Open"
4. Click "Get Directions"
5. Follow Google Maps
6. Arrive at pharmacy
```

---

## 💡 Pro Tips

### Tip 1: Check Before Visiting
```
Before leaving home:
1. Click facility
2. Check "Open" status
3. Click "Call Now"
4. Confirm they have what you need
5. Then get directions
```

### Tip 2: Share Location
```
Telling someone where to meet:
1. Open facility details
2. Click "Search on Google"
3. Copy Google Maps link
4. Share via WhatsApp/SMS
```

### Tip 3: Save for Later
```
Found a good hospital:
1. Click copy on address
2. Save in Notes app
3. Or bookmark in browser
4. Quick access next time
```

### Tip 4: Compare Facilities
```
Multiple options nearby:
1. Click first facility
2. Note distance and phone
3. Close modal
4. Click second facility
5. Compare and decide
```

---

## 🎯 Quick Actions Cheat Sheet

| Want to...              | Action                     |
|------------------------|----------------------------|
| Get there              | Click "Get Directions"     |
| Call them              | Click "Call Now"           |
| Read reviews           | Click "Search on Google"   |
| Share address          | Click copy → Paste to chat |
| Save phone number      | Click copy → Add to contact|
| Check if open          | Look at status badge       |
| See distance           | Top of modal (blue card)   |
| Close popup            | Click X or outside         |

---

## 📱 Mobile Gestures

- **Tap card** = Open details
- **Tap outside modal** = Close
- **Tap X button** = Close
- **Tap "Get Directions"** = Opens Maps app
- **Tap "Call Now"** = Direct dial
- **Tap copy icon** = Copy to clipboard
- **Scroll modal** = See all info

---

## 🎨 Visual Indicators

### Status Badges
- 🟢 **Open** = Currently operating
- 🟢 **Available** = Hospital accepting patients
- 🟡 **Limited** = Limited services/hours

### Icons Meaning
- 🏥 = Hospital
- 💊 = Pharmacy
- 📍 = Location/Address
- 📞 = Phone number
- ⭐ = User rating
- 🕐 = Hours/Emergency info
- 📋 = Copy button
- ✅ = Copied successfully
- → = Clickable/More info

---

## ❓ FAQ

**Q: Will it use my mobile data?**
A: Opening Google Maps uses minimal data. Directions work offline if maps are downloaded.

**Q: Can I close the popup quickly?**
A: Yes! Click anywhere outside the popup or press the X button.

**Q: What if there's no phone number?**
A: The "Call Now" button won't appear. Use "Search on Google" to find contact info.

**Q: Does it work on iPhone/Android?**
A: Yes! Works on all smartphones and tablets.

**Q: Can I use it without internet?**
A: You need internet to open the modal and load Maps. Calling works offline.

**Q: Is my location shared with facilities?**
A: No! Your location is only used locally to calculate distances and provide directions.

---

## ✅ Benefits Summary

✅ **Fast Access** - All info in one place
✅ **One-Click Actions** - Call, navigate, search instantly
✅ **No Typing** - Copy phone numbers and addresses
✅ **Accurate Directions** - GPS-based routing
✅ **Mobile Optimized** - Works great on phones
✅ **Always Available** - Access anytime, anywhere
✅ **Privacy Focused** - Your location stays private

**Need help quickly? Just tap and go!** 🚀
