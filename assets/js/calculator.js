// assets/js/calculator.js

document.addEventListener('DOMContentLoaded', function() {
    const penghasilanInput = document.getElementById('penghasilan');
    const hasilZakatDiv = document.getElementById('hasil-zakat');
    const nisabValueSpan = document.getElementById('nisab-value');
    
    // Mengambil tombol utama kalkulator
    const bayarZakatButton = document.querySelector('#kalkulator-zakat .btn-primary');

    // Pastikan nilai NISAB konstan (sama dengan yang digunakan di donasi-form.html)
    const NISAB_BULANAN = 7083333; 

    // Update nilai nisab di tampilan
    if (nisabValueSpan) {
        // Menggunakan format ID yang benar
        nisabValueSpan.textContent = `Rp ${NISAB_BULANAN.toLocaleString('id-ID')}`;
    }

    // Gunakan listener 'click' pada tombol (Ini akan memastikan kalkulasi hanya terjadi saat tombol diklik, bukan setiap input)
    if (bayarZakatButton) {
        // Hentikan listener 'input' lama jika ada (Ini perlu diubah logikanya agar kalkulasi hanya terjadi saat tombol di klik, bukan saat DOMContentLoaded)
        if (penghasilanInput) {
            // Kita akan menggunakan tombol untuk memicu hitungZakat, jadi kita tidak perlu membuang listener 'input' jika tidak ada
        }
        
        // Tambahkan listener 'click' pada tombol
        bayarZakatButton.addEventListener('click', function(e) {
            // Hentikan perilaku default (navigasi langsung) saat tombol diklik
            e.preventDefault();
            
            // Panggil fungsi hitungZakat
            hitungZakat();
        });
        
        // Tambahkan listener 'input' ke input field untuk mengaktifkan kembali tampilan default tombol saat user mengetik
        if (penghasilanInput) {
            penghasilanInput.addEventListener('input', function() {
                // Reset tampilan tombol ke default 'Hitung Zakat' saat input berubah
                bayarZakatButton.setAttribute('href', '#kalkulator-zakat');
                bayarZakatButton.textContent = 'Hitung Zakat Sekarang';
                bayarZakatButton.classList.remove('btn-success');
                bayarZakatButton.classList.add('btn-primary');
                hasilZakatDiv.innerHTML = '<p class="text-secondary mt-3">Klik tombol untuk menghitung zakat.</p>';
            });
        }
    }

    // Fungsi Utama Kalkulasi
    function hitungZakat() {
        const rawValue = penghasilanInput.value.replace(/\D/g, '');
        const penghasilan = parseInt(rawValue) || 0;
        
        hasilZakatDiv.innerHTML = '';
        
        // Reset status tombol ke default jika input kosong/nol
        if (penghasilan <= 0) {
            bayarZakatButton.setAttribute('href', '#kalkulator-zakat');
            bayarZakatButton.textContent = 'Hitung Zakat Sekarang';
            bayarZakatButton.classList.remove('btn-success');
            bayarZakatButton.classList.add('btn-primary');
            hasilZakatDiv.innerHTML = '<p class="text-secondary mt-3">Masukkan penghasilan bulanan Anda.</p>';
            return;
        }

        let zakatWajib = 0;
        let pesan = '';

        if (penghasilan >= NISAB_BULANAN) {
            zakatWajib = Math.round(penghasilan * 0.025);
            
            // 1. Teks Tombol diubah menjadi Lanjutkan Pembayaran
            // 2. HREF diarahkan ke donasi-form.html dengan parameter
            
            // **PERBAIKAN UTAMA DI SINI:** Mengganti index.html#donasi-form menjadi donasi-form.html
            bayarZakatButton.setAttribute('href', `donasi-form.html?nominal=${zakatWajib}&jenis=Zakat%20Penghasilan`);
            bayarZakatButton.textContent = 'Lanjutkan Pembayaran Zakat';
            bayarZakatButton.classList.remove('btn-primary');
            bayarZakatButton.classList.add('btn-success');
            
            pesan = `
                <div class="alert alert-success mt-3 shadow-sm">
                    <h4 class="alert-heading">Wajib Zakat!</h4>
                    <p>Kewajiban Zakat Penghasilan Anda bulan ini adalah:</p>
                    <p class="display-6 fw-bold text-success">Rp ${zakatWajib.toLocaleString('id-ID')}</p>
                </div>
            `;
            
        } else {
            pesan = `
                <div class="alert alert-warning mt-3 shadow-sm">
                    <p class="mb-0">Penghasilan Anda (Rp ${penghasilan.toLocaleString('id-ID')}) belum mencapai Nisab bulanan.</p>
                    <p class="mb-0 small">Anda disarankan untuk berinfaq atau bersedekah.</p>
                </div>
            `;
            
            // Tombol diarahkan ke halaman donasi-form, tetapi tanpa nominal hasil kalkulator (karena tidak wajib)
            bayarZakatButton.setAttribute('href', 'donasi-form.html');
            bayarZakatButton.textContent = 'Lanjutkan ke Infaq/Sedekah';
            bayarZakatButton.classList.remove('btn-primary');
            bayarZakatButton.classList.add('btn-warning');
        }

        hasilZakatDiv.innerHTML = pesan;
    }
    
    // Inisialisasi: Panggil hitungZakat saat DOMContentLoaded hanya untuk menampilkan teks default
    hasilZakatDiv.innerHTML = '<p class="text-secondary mt-3">Klik tombol untuk menghitung zakat.</p>';
});
