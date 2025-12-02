// assets/js/calculator.js

document.addEventListener('DOMContentLoaded', function() {
    const penghasilanInput = document.getElementById('penghasilan');
    const hasilZakatDiv = document.getElementById('hasil-zakat');
    const nisabValueSpan = document.getElementById('nisab-value');

    // Nilai Nisab per Bulan (Contoh: Setara 85 gram Emas / 12 bulan)
    // Angka 7083333 diambil dari contoh di HTML Anda
    const NISAB_BULANAN = 7083333; 

    // Update nilai nisab di tampilan
    if (nisabValueSpan) {
        nisabValueSpan.textContent = `Rp ${NISAB_BULANAN.toLocaleString('id-ID')}`;
    }

    if (penghasilanInput) {
        penghasilanInput.addEventListener('input', hitungZakat);
    }

    function hitungZakat() {
        // Ambil nilai dan ubah ke integer
        const penghasilan = parseInt(penghasilanInput.value);
        
        // Bersihkan hasil sebelumnya
        hasilZakatDiv.innerHTML = '';
        
        if (isNaN(penghasilan) || penghasilan <= 0) {
            hasilZakatDiv.innerHTML = '<p class="text-secondary mt-3">Masukkan penghasilan bulanan Anda.</p>';
            return;
        }

        let zakatWajib = 0;
        let pesan = '';

        if (penghasilan >= NISAB_BULANAN) {
            // Wajib Zakat: 2.5% dari Penghasilan
            zakatWajib = Math.round(penghasilan * 0.025);
            pesan = `
                <div class="alert alert-success mt-3 shadow-sm">
                    <h4 class="alert-heading">Wajib Zakat!</h4>
                    <p>Kewajiban Zakat Penghasilan Anda bulan ini adalah:</p>
                    <p class="display-6 fw-bold text-success">Rp ${zakatWajib.toLocaleString('id-ID')}</p>
                </div>
            `;
        } else {
            // Belum wajib Zakat
            pesan = `
                <div class="alert alert-warning mt-3 shadow-sm">
                    <p class="mb-0">Penghasilan Anda (Rp ${penghasilan.toLocaleString('id-ID')}) belum mencapai Nisab bulanan.</p>
                    <p class="mb-0 small">Anda disarankan untuk berinfaq atau bersedekah.</p>
                </div>
            `;
        }

        hasilZakatDiv.innerHTML = pesan;
        
        // Opsional: Set nominal di form donasi jika user klik tombol 'Bayar Zakat Nominal Ini'
        const bayarZakatButton = document.querySelector('#kalkulator-zakat .btn-primary');
        if (bayarZakatButton) {
            bayarZakatButton.href = `#donasi-form?nominal=${zakatWajib > 0 ? zakatWajib : ''}&jenis=Zakat%20Penghasilan`;
        }
    }
});