document.addEventListener('DOMContentLoaded', function() {
    const penghasilanInput = document.getElementById('penghasilan');
    const hasilZakatDiv = document.getElementById('hasil-zakat');
    const nisabValueSpan = document.getElementById('nisab-value');

    // Tombol yang benar sesuai HTML
    const bayarZakatButton = document.getElementById('hitungZakatButton');

    // Nisab bulanan (update sesuai harga emas) - 87.48 gram emas @ 610,000 per gram
    const NISAB_BULANAN = 7083333;
    const ZAKAT_PERCENTAGE = 0.025; // 2.5%

    // Update tampilan nisab
    if (nisabValueSpan) {
        nisabValueSpan.textContent = NISAB_BULANAN.toLocaleString('id-ID');
    }

    // Ketika tombol diklik → hitung
    if (bayarZakatButton) {
        bayarZakatButton.addEventListener('click', function() {
            hitungZakat();
        });
    }

    // Format input angka saat user mengetik
    if (penghasilanInput) {
        penghasilanInput.addEventListener('input', function() {
            let raw = penghasilanInput.value.replace(/\D/g, '');
            penghasilanInput.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';

            // Reset tampilan
            hasilZakatDiv.innerHTML = '<p class="text-secondary mt-3">Klik tombol untuk menghitung zakat.</p>';
            bayarZakatButton.textContent = 'Hitung Zakat Sekarang';
            bayarZakatButton.className = 'btn btn-primary btn-lg w-100 mt-3';
            bayarZakatButton.removeAttribute('href');
        });

        // Support Enter key untuk submit
        penghasilanInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                hitungZakat();
            }
        });
    }

    function hitungZakat() {
        const rawValue = penghasilanInput.value.replace(/\D/g, '');
        const penghasilan = parseInt(rawValue) || 0;

        if (penghasilan <= 0) {
            hasilZakatDiv.innerHTML = '<div class="alert alert-danger mt-3"><strong>Error:</strong> Masukkan penghasilan bulanan yang valid (lebih dari 0).</div>';
            bayarZakatButton.textContent = 'Hitung Zakat Sekarang';
            bayarZakatButton.className = 'btn btn-primary btn-lg w-100 mt-3';
            return;
        }

        // hitung
        if (penghasilan >= NISAB_BULANAN) {
            const zakat = Math.round(penghasilan * ZAKAT_PERCENTAGE);

            hasilZakatDiv.innerHTML = `
                <div class="alert alert-success mt-3 border-success border-3">
                    <h4 class="text-success fw-bold">✓ Wajib Zakat!</h4>
                    <p>Zakat penghasilan Anda bulan ini:</p>
                    <p class="display-6 fw-bold text-success">Rp ${zakat.toLocaleString('id-ID')}</p>
                    <p class="text-muted small mb-0">Perhitungan: ${penghasilan.toLocaleString('id-ID')} × 2.5% = Rp ${zakat.toLocaleString('id-ID')}</p>
                </div>
            `;

            bayarZakatButton.textContent = 'Lanjutkan Pembayaran Zakat';
            bayarZakatButton.className = 'btn btn-success btn-lg w-100 mt-3';
            bayarZakatButton.setAttribute('onclick', `window.location.href='donasi-form.html?nominal=${zakat}&jenis=Zakat%20Penghasilan'`);

        } else {
            const sisaNisab = NISAB_BULANAN - penghasilan;
            hasilZakatDiv.innerHTML = `
                <div class="alert alert-warning mt-3 border-warning border-3">
                    <h4 class="text-warning fw-bold">⚠ Belum Mencapai Nisab</h4>
                    <p><strong>Penghasilan Anda:</strong> Rp ${penghasilan.toLocaleString('id-ID')}</p>
                    <p><strong>Nisab Bulanan:</strong> Rp ${NISAB_BULANAN.toLocaleString('id-ID')}</p>
                    <p><strong>Kurang:</strong> Rp ${sisaNisab.toLocaleString('id-ID')}</p>
                    <p class="text-muted small mb-0">Namun, Anda tetap didorong untuk berinfaq atau sedekah sesuai kemampuan Anda.</p>
                </div>
            `;

            bayarZakatButton.textContent = 'Lanjutkan ke Infaq/Sedekah';
            bayarZakatButton.className = 'btn btn-warning btn-lg w-100 mt-3';
            bayarZakatButton.setAttribute('onclick', `window.location.href='donasi-form.html'`);
        }
    }

    // Default tampilan
    hasilZakatDiv.innerHTML = '<p class="text-secondary mt-3">Klik tombol untuk menghitung zakat.</p>';
});
