# Copilot Instructions for zakat-sasi

## Project Overview
This is a static web application for Zakat Digital, a platform to facilitate digital zakat, infaq, and sedekah (ZIS) payments. The site is built with HTML, CSS (custom + Bootstrap), and vanilla JavaScript. There is no backend or build system; all logic runs client-side in the browser.

## Major Components & Data Flow

### Key Pages & Workflows
1. **index.html** (Home): Hero section + inline calculator + program showcase
2. **calculator.html** (Dedicated calculator): Standalone calculator page
3. **donasi-form.html** (Donation form): Accepts URL params from calculator
4. **history.html** (Transaction history): Displays localStorage data

### Critical Data Flow
```
Calculator (input penghasilan) 
  → Hitung zakat 2.5%
  → Navigate: donasi-form.html?nominal=X&jenis=Zakat%20Penghasilan
  → Form pre-fills + user submits
  → Save to localStorage[zakatHistory]
  → Redirect to success screen
  → User can view at history.html
```

### JavaScript Modules
- **`calculator.js`**: 
  - Listens to `#penghasilan` input
  - Handles format as Rupiah (via `toLocaleString('id-ID')`)
  - Validates penghasilan > 0
  - Compares against `NISAB_BULANAN` constant (currently 7,083,333)
  - On "Hitung" click: displays result + dynamic button (success or warning state)
  - Button onclick navigates to donasi-form with URL params
  
- **`donasi.js`**:
  - **Form submission handler**: Listens to `#donasiForm` submit
  - **Validation**: Required fields (jenisDonasi, nominalDonasi, email)
  - **Save to localStorage**: Prepends new transaction to `zakatHistory` array
  - **displayHistory()**: Renders transaction list from localStorage on history.html
  - Format numbers via `toLocaleString('id-ID')` throughout
  
- **`History.js`**: DEPRECATED - all functionality migrated to donasi.js

### Utility Library (utils.js)
Reusable helper functions untuk currency, validation, localStorage:
```javascript
// Currency formatting
formatRupiah(1000000)  // → "1.000.000"
parseRupiah("1.000.000")  // → 1000000

// Validation
isValidEmail("user@example.com")  // → true
isValidPhone("08123456789")  // → true

// Zakat calculation
calculateZakat(8500000)  // → {eligible: true, amount: 212500, ...}

// localStorage helpers
saveToHistory(transaction)  // → true/false
getHistory()  // → [transaction, ...]
clearHistory()  // → true/false

// Transaction creation
createTransaction({jenis, nominal, nama, emailhp})

// Input formatting
setupRupiahInput(element)  // Auto-format element as Rupiah input

// Date formatting
getFormattedDate()  // → "3 Desember 2025, 10:20"
```
Include dengan: `<script src="assets/js/utils.js"></script>`

### LocalStorage Schema
```json
zakatHistory: [
  {
    "id": 1733231234567,
    "tanggal": "3 Desember 2025, 10:20",
    "jenis": "Zakat Penghasilan",
    "nominal": 250000,
    "nama": "Ahmad Haramain",
    "emailhp": "ahmad@email.com / 081234567890",
    "status": "Berhasil (Simulasi)"
  }
]
```

## Developer Workflows

### Testing Locally
1. Open any `.html` in browser - no build step needed
2. Test calculator: Enter penghasilan → click "Hitung Zakat"
3. Test form: Fill form → submit → check localStorage in DevTools
4. Test history: Go to history.html → should display all transactions

### Debugging Tips
- **DevTools → Application → Local Storage**: Inspect zakatHistory data
- **DevTools → Console**: Watch for validation errors, form submission logs
- **Network tab**: Verify CDN resources (Bootstrap, FontAwesome) load

### Common Edits
- **Update Nisab**: `calculator.js` line ~14, change `NISAB_BULANAN` constant
- **Add donation type**: Edit `donasi-form.html` `<select>` options
- **Change colors**: Edit `assets/css/style.css` Bootstrap variable overrides
- **Add new page**: Create new `.html`, include same header/footer nav, load Bootstrap + custom CSS

## Project-Specific Patterns & Conventions

### Currency Formatting
**Always** use `toLocaleString('id-ID')` for Rupiah display:
```javascript
// Good
const formatted = nominal.toLocaleString('id-ID'); // "1.000.000"

// Bad - don't manually format
const formatted = nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Avoid
```

### Form Input Pattern
Use `type="text"` (NOT `type="number"`) for currency fields so we can format as Rupiah:
```html
<!-- Good -->
<input type="text" class="form-control" id="nominalDonasi" placeholder="Contoh: 250.000">

<!-- Bad - type="number" breaks formatting -->
<input type="number" class="form-control" id="nominalDonasi">
```

### URL Parameter Passing
Pass calculated values via query params:
```javascript
// From calculator.js
const nominal = 250000;
const jenis = "Zakat Penghasilan";
window.location.href = `donasi-form.html?nominal=${nominal}&jenis=${encodeURIComponent(jenis)}`;
```

### Form Validation
Always validate before saving:
```javascript
if (!jenisDonasi.trim()) { alert('Pilih jenis'); return; }
if (parseInt(nominal) <= 0) { alert('Nominal invalid'); return; }
if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { alert('Email invalid'); return; }
```

### localStorage Operations
```javascript
// Read
const history = JSON.parse(localStorage.getItem('zakatHistory')) || [];

// Write (prepend new = most recent first)
history.unshift(newTransaction);
localStorage.setItem('zakatHistory', JSON.stringify(history));

// Clear
localStorage.removeItem('zakatHistory');
```

### UI Feedback
- **Success**: Bootstrap `.alert-success` with icon `fa-check-circle`
- **Warning**: `.alert-warning` for nisab not met
- **Error**: `.alert-danger` for validation failures
- Always prevent default form submission: `e.preventDefault()`

### Responsive Design
- Mobile-first with Bootstrap grid: `col-md-6`, `row-cols-md-3`, etc.
- Header is sticky: `sticky-top`
- Footer on every page with consistent structure
- Use `d-none d-lg-block` to hide elements on mobile if needed

## Integration Points
- **Bootstrap 5.3.3**: Loaded via CDN in every HTML (no build needed)
- **FontAwesome 5.15.4**: Icons via CDN
- **Google Fonts (Poppins)**: Imported in `style.css`
- **No external APIs**: All logic runs locally in browser

## Key Files & Directories
- `assets/js/calculator.js`: Zakat calculation logic
- `assets/js/donasi.js`: Form handling + history display
- `assets/js/utils.js`: ⭐ Reusable utility functions (formatRupiah, validation, localStorage helpers)
- `assets/css/style.css`: Custom styles, color schemes, responsive tweaks
- `index.html`: Home + embedded calculator
- `calculator.html`: Standalone calculator page
- `donasi-form.html`: Donation form (URL param aware)
- `history.html`: Transaction history display (with clear history button)
- `programs.html`: 4 donation program cards
- `about.html`: About us page
- `README.md`: User-facing documentation
- `QUICKSTART.md`: Quick start guide for developers
- `CHANGELOG.md`: List of fixes and improvements

## Examples

### Adding a new donation type
1. Edit `donasi-form.html`:
```html
<select id="jenisDonasi" required>
  <option value="">-- Pilih Jenis --</option>
  <option value="Zakat Penghasilan">Zakat Penghasilan</option>
  <option value="Zakat Maal">Zakat Maal</option>
  <option value="Infaq/Sedekah">Infaq/Sedekah</option>
  <option value="Fidyah">Fidyah</option>
  <option value="Wakaf">Wakaf</option> <!-- NEW -->
</select>
```

### Updating nisab value
Edit `calculator.js`:
```javascript
// Update this constant (currently 87.48g gold @ 610k/g = 7,083,333)
const NISAB_BULANAN = 7083333; // Change this number
```

### Clearing transaction history
Users can click "Hapus Riwayat" button on history.html, which calls:
```javascript
function clearHistory() {
    if (confirm('Yakin hapus semua?')) {
        localStorage.removeItem('zakatHistory');
        location.reload();
    }
}
```

---

**Note:** This project is intentionally simple and does not use frameworks, build tools, or a backend. Keep all logic client-side and maintain compatibility with modern browsers. For production use, integrate with a real payment gateway and backend API.