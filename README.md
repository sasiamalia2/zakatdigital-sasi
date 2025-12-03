# Zakat Digital - Platform Penyaluran ZIS

Platform web statis untuk memfasilitasi pembayaran dan penyaluran Zakat, Infaq, dan Sedekah (ZIS) secara digital, amanah, dan transparan.

## 🎯 Fitur Utama

- **Kalkulator Zakat**: Hitung kewajiban zakat penghasilan (2.5%) berdasarkan nisab bulanan
- **Form Donasi**: Pengiriman zakat/infaq/sedekah dengan berbagai jenis
- **Riwayat Transaksi**: Lihat semua transaksi yang tersimpan di browser (localStorage)
- **Program Penyaluran**: 4 pilar utama (Cerdas, Sehat, Mandiri, Peduli)
- **UI Responsif**: Mobile-friendly dengan Bootstrap 5.3.3

## 🏗️ Arsitektur

### Frontend Stack
- **HTML5**: Struktur markup semantik
- **CSS3**: Custom styling + Bootstrap 5.3.3 (CDN)
- **JavaScript (Vanilla)**: Event handling, validasi form, localStorage management
- **FontAwesome 5.15.4**: Ikon UI

### Struktur File
```
├── index.html              # Halaman home + kalkulator zakat
├── calculator.html         # Halaman kalkulator standalone
├── donasi-form.html        # Form donasi/pembayaran
├── history.html            # Riwayat transaksi
├── programs.html           # 4 pilar program penyaluran
├── about.html              # Tentang kami
├── assets/
│   ├── js/
│   │   ├── calculator.js   # Logic kalkulator zakat
│   │   ├── donasi.js       # Logic form donasi + history rendering
│   │   └── History.js      # (Deprecated - gunakan donasi.js)
│   ├── css/
│   │   └── style.css       # Custom styles & Bootstrap overrides
│   └── images/             # Logo & ilustrasi
└── README.md               # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### Setup
1. Clone atau download repository
2. Tidak ada build step - semua file sudah siap digunakan
3. Buka `index.html` di browser modern (Chrome, Firefox, Safari, Edge)

### Workflow Pengguna
1. **Home (`index.html`)**: User melihat pengenalan platform
2. **Kalkulator**: Input penghasilan bulanan → sistem hitung zakat otomatis
3. **Form Donasi**: Pilih jenis donasi, masukkan nominal, data pribadi
4. **Riwayat**: Lihat semua transaksi yang telah dilakukan (disimpan di localStorage)

## 🔑 Fitur Teknis

### Currency Formatting
Semua nilai Rupiah menggunakan:
```javascript
toLocaleString('id-ID')
```
Contoh: `1000000` → `1.000.000`

### Data Persistence
- **Storage**: `localStorage` (browser-only, tidak ada backend)
- **Key**: `zakatHistory`
- **Format**: Array of transaction objects
```json
{
  "id": 1733231234567,
  "tanggal": "3 Desember 2025, 10:20",
  "jenis": "Zakat Penghasilan",
  "nominal": 250000,
  "nama": "Ahmad Haramain",
  "emailhp": "ahmad@email.com / 081234567890",
  "status": "Berhasil (Simulasi)"
}
```

### Navigation Flow
- Calculator → Donation Form: Via URL parameters
  ```
  donasi-form.html?nominal=250000&jenis=Zakat%20Penghasilan
  ```
- Form → Success → History: Direct navigation

### Validation
- Form donasi memvalidasi:
  - Jenis donasi (required)
  - Nominal > 0 (required)
  - Email (required)
- Calculator memvalidasi:
  - Penghasilan > 0
  - Tidak ada karakter non-numerik

## 📱 Responsif Design
- **Mobile First**: Menggunakan Bootstrap grid system
- **Breakpoints**: `xs`, `sm`, `md`, `lg` sesuai Bootstrap
- **Touch-Friendly**: Button dan form elements disesuaikan untuk mobile

## 🎨 Tema & Styling
- **Warna Utama**: 
  - Primary (Blue): `#0d47a1` - Kepercayaan & Profesional
  - Success (Green): `#2e7d32` - Zakat/Pembayaran
  - Warning (Yellow): `#ffb300` - CTA utama
- **Font**: Poppins (Google Fonts)
- **Radius**: 15px (modern, softer design)

## 🔄 Alur Form Donasi

```
1. User klik "Bayar Zakat" dari kalkulator
2. URL params diisi: nominal + jenis
3. donasi-form.js:
   - Baca URL params
   - Auto-fill form fields
   - Show info alert
4. User submit form
5. Validasi → Simpan ke localStorage
6. Tampilkan success page
7. User bisa lihat di history.html
```

## 📋 Nisab Bulanan
- **Nilai Saat Ini**: Rp 7.083.333
- **Basis**: 87.48 gram emas @ Rp 610.000/gram
- **Update**: Manual di `calculator.js` baris 9 (constant `NISAB_BULANAN`)

## 🛠️ Troubleshooting

### History tidak muncul?
- Pastikan browser support localStorage
- Cek di DevTools → Application → Local Storage → zakatHistory
- Clear browser cache dan coba lagi

### Form tidak submit?
- Pastikan semua field required terisi
- Buka DevTools → Console untuk melihat error message
- Check localStorage size tidak penuh

### Styling tidak muncul?
- Pastikan `assets/css/style.css` dapat diakses
- Check Bootstrap CDN link aktif (internet connection needed)
- Try refresh Ctrl+F5 untuk clear cache

## 📝 Development Notes

### Adding New Donation Type
1. Edit `donasi-form.html` - tambah option di `<select id="jenisDonasi">`
2. Update validation logic jika diperlukan di script form

### Updating Nisab Value
Edit `calculator.js` line ~14:
```javascript
const NISAB_BULANAN = 7083333; // Update angka ini
```

### Migrating to Backend
Untuk production:
1. Ganti `localStorage` dengan API calls
2. Ubah `displaySuccessAlert()` → redirect ke payment gateway
3. Setup backend untuk handle transaction storage
4. Implement proper authentication

## 🌐 Browser Compatibility
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License
Zakat Digital © 2024 - Amanah & Transparan

---

**Dibuat dengan ❤️ untuk memudahkan penyaluran ZIS digital**
