# 🚀 Quick Start Guide - Zakat Digital

## 📦 What's Included

✅ Complete donation workflow (calculator → form → success)
✅ Transaction history with localStorage persistence
✅ Mobile-responsive design (Bootstrap 5)
✅ Form validation & error handling
✅ Clear history functionality
✅ Utility library (`utils.js`) for reusable functions
✅ Complete documentation

## ⚡ Getting Started (2 minutes)

### 1. Setup
```bash
# No installation needed! Just open in browser
# Option A: Double-click index.html
# Option B: Use live server (VS Code: Right-click → Open with Live Server)
```

### 2. Test Calculator
1. Open `index.html` in browser
2. Go to "Kalkulator Zakat Penghasilan" section
3. Enter penghasilan: `8500000`
4. Click "Hitung Zakat Sekarang"
5. Should show: **Rp 212.500**
6. Click "Lanjutkan Pembayaran Zakat"

### 3. Test Form & History
1. Fill donation form:
   - Jenis: "Zakat Penghasilan"
   - Nominal: "212500" (auto-filled)
   - Nama: "Budi Santoso"
   - Email: "budi@example.com"
   - WhatsApp: "081234567890"
2. Click "Lanjutkan ke Pembayaran"
3. Should show success message
4. Click "Lihat Riwayat Transaksi"
5. Transaction should appear in history

### 4. Test Clear History
1. On history page, click "Hapus Riwayat"
2. Confirm dialog
3. History should be cleared

## 📂 File Structure

```
zakat-sasi/
├── index.html              # Home + Calculator
├── calculator.html         # Dedicated calculator
├── donasi-form.html        # Donation form
├── history.html            # Transaction history
├── programs.html           # Program showcase
├── about.html              # About us
│
├── assets/
│   ├── js/
│   │   ├── calculator.js   # Zakat calculation
│   │   ├── donasi.js       # Form & history handling
│   │   ├── utils.js        # ⭐ NEW: Utility functions
│   │   └── History.js      # Deprecated
│   │
│   ├── css/
│   │   └── style.css       # Custom Bootstrap theme
│   │
│   └── images/             # Logo & illustrations
│
├── README.md               # Full documentation
├── CHANGELOG.md            # ⭐ NEW: What's been fixed
├── QUICKSTART.md           # This file
└── .github/
    └── copilot-instructions.md  # AI agent instructions
```

## 🔧 Common Tasks

### Add New Donation Type
Edit `donasi-form.html` line ~60:
```html
<option value="Wakaf">Wakaf (Islamic Endowment)</option>
```

### Update Nisab Value
Edit `assets/js/calculator.js` line ~12:
```javascript
const NISAB_BULANAN = 7083333; // Change this number
```

### Change Brand Colors
Edit `assets/css/style.css` around line 20:
```css
.bg-primary {
    background: linear-gradient(135deg, #0d47a1, #1976d2) !important;
}
```

### Use Utility Functions
In your scripts, you can now use:
```javascript
// Format to Rupiah
formatRupiah(1000000)  // → "1.000.000"

// Parse Rupiah
parseRupiah("1.000.000")  // → 1000000

// Calculate zakat
calculateZakat(8500000)  // → {eligible: true, amount: 212500, ...}

// Validate
isValidEmail("user@example.com")  // → true

// Save transaction
saveToHistory(transaction)  // → true/false

// Get all transactions
getHistory()  // → [{...}, {...}]
```

> **Include in your HTML**: 
> ```html
> <script src="assets/js/utils.js"></script>
> ```

## 🧪 Browser DevTools Tips

### Check localStorage
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Local Storage** → **file://**
4. Find key `zakatHistory`
5. Click to view all transactions

### Debug JavaScript
1. Open **Console** tab
2. Try commands:
   ```javascript
   // View transactions
   JSON.parse(localStorage.getItem('zakatHistory'))
   
   // Clear history
   localStorage.removeItem('zakatHistory')
   
   // Check if utils.js is loaded
   typeof formatRupiah  // Should return 'function'
   ```

### Check Network
1. Open **Network** tab
2. Refresh page
3. Verify CDN resources load:
   - bootstrap@5.3.3
   - fontawesome icons
   - Google Fonts (Poppins)

## 📱 Testing on Mobile

### Using Live Server (Recommended)
```bash
# VS Code: 
# 1. Install "Live Server" extension
# 2. Right-click index.html
# 3. Select "Open with Live Server"
# 4. Scan QR code with phone
```

### Manual Testing
1. Get your computer IP: `ipconfig` (Windows) or `ifconfig` (Mac)
2. Open phone browser: `http://192.168.1.X:5500`
3. Test touch interactions

### Mobile Checklist
- [ ] Forms accessible on small screen
- [ ] Buttons/links touch-friendly (44px minimum)
- [ ] Text readable without zoom
- [ ] Images load correctly
- [ ] Navigation works

## 🐛 Troubleshooting

### "localhost" Error When Opening HTML
**Solution**: Use Live Server extension or local server:
```bash
# Python 3.x
python -m http.server 8000

# Then open: http://localhost:8000
```

### Form Not Submitting
1. Check browser console (F12 → Console)
2. Verify email field is filled
3. Verify form field IDs match JS selectors
4. Clear browser cache (Ctrl+Shift+Delete)

### History Not Showing
1. Check localStorage in DevTools
2. Verify `zakatHistory` key exists
3. Try submitting form again
4. Check browser storage quota not exceeded

### Styling Looks Wrong
1. Check Bootstrap CDN is loading (Network tab)
2. Verify internet connection
3. Clear browser cache
4. Check `assets/css/style.css` path is correct

## 📊 Production Checklist

Before deploying:
- [ ] Test all pages in multiple browsers
- [ ] Test on mobile devices
- [ ] Verify localStorage persistence
- [ ] Check all links work
- [ ] Minify CSS & JS (optional)
- [ ] Add HTTPS certificate
- [ ] Setup backend for real payments
- [ ] Add proper error logging
- [ ] Setup analytics (optional)

## 🔐 Security Notes

⚠️ **Current Implementation**:
- All data stored in browser localStorage
- No backend or database
- No real payment processing
- Demo/simulation only

🔒 **For Production**:
1. Integrate payment gateway (Midtrans, Doku, etc.)
2. Setup backend for transaction storage
3. Add user authentication
4. Use HTTPS everywhere
5. Implement proper error handling
6. Add input sanitization
7. Add rate limiting
8. Add CORS headers

## 📚 Further Learning

- Bootstrap docs: https://getbootstrap.com/docs/5.3/
- MDN Web Docs: https://developer.mozilla.org/
- FontAwesome icons: https://fontawesome.com/icons/
- JavaScript: https://javascript.info/

## 💡 Tips & Tricks

### Quick Reset
```javascript
// In browser console
localStorage.clear()  // Clear ALL browser storage
location.reload()     // Reload page
```

### Test Different Incomes
Try these in calculator:
- **8.500.000** → Eligible (≥ nisab): Rp 212.500
- **7.083.333** → Eligible (= nisab): Rp 177.083
- **5.000.000** → Not eligible (< nisab)
- **100.000.000** → Large amount: Rp 2.500.000

### Debug Payment Form
```javascript
// Log form data before submit
const form = document.getElementById('donasiForm');
form.addEventListener('submit', (e) => {
    const data = new FormData(form);
    console.log({
        jenis: data.get('jenisDonasi'),
        nominal: data.get('nominalDonasi'),
        email: data.get('email')
    });
});
```

## 🤝 Support

For issues or questions:
1. Check the `README.md` for detailed documentation
2. Review `CHANGELOG.md` for recent changes
3. Check browser console for error messages
4. Verify all CDN links are accessible

---

**Happy Coding! 🎉**

**Zakat Digital © 2024**
