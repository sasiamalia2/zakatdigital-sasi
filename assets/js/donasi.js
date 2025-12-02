// assets/js/donasi.js

// 1. FUNGSI UNTUK MENYIMPAN RIWAYAT (Dipanggil saat formulir disubmit di donasi-form.html)
document.addEventListener('DOMContentLoaded', function() {
    const formPembayaran = document.getElementById('form-pembayaran');
    
    // Pengecekan URL untuk mengisi nominal otomatis dari Kalkulator (autofill)
    // Cek apakah kita berada di halaman donasi-form.html yang menerima parameter URL
    if (formPembayaran) {
        const urlParams = new URLSearchParams(window.location.search);
        const nominalParam = urlParams.get('nominal');
        const jenisParam = urlParams.get('jenis');

        if (nominalParam && jenisParam) {
            document.getElementById('nominal').value = nominalParam;
            // Gunakan decodeURIComponent untuk menangani spasi atau karakter khusus lainnya
            document.getElementById('jenisZakat').value = decodeURIComponent(jenisParam.replace(/\+/g, ' '));
        }

        // Event Listener untuk Form Submisi
        formPembayaran.addEventListener('submit', function(e) {
            e.preventDefault();

            // Ambil data dari formulir
            const jenisZakat = document.getElementById('jenisZakat').value;
            const nominal = parseInt(document.getElementById('nominal').value);
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;

            // Validasi minimal nominal
            if (nominal < 10000) {
                 alert("Nominal pembayaran minimal adalah Rp 10.000.");
                 return;
            }
            if (jenisZakat === "") {
                 alert("Harap pilih jenis pembayaran.");
                 return;
            }

            // Buat objek transaksi
            const transaction = {
                id: Date.now(),
                tanggal: new Date().toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                jenis: jenisZakat,
                nominal: nominal,
                nama: nama,
                email: email,
                status: 'Berhasil (Simulasi)'
            };

            // Simpan transaksi ke LocalStorage
            saveTransaction(transaction);

            // Tampilkan Alert Berhasil
            displaySuccessAlert(transaction);

            // Tidak perlu mereset form karena konten 'main' akan diganti oleh displaySuccessAlert
            // formPembayaran.reset();
        });
    }
    
    // Karena displayHistory() dipanggil secara eksplisit di history.html (di luar DOMContentLoaded), 
    // kita tidak perlu memanggilnya di sini.
});

// Fungsi Helper untuk menyimpan ke LocalStorage
function saveTransaction(transaction) {
    const history = JSON.parse(localStorage.getItem('zakatHistory')) || [];
    history.unshift(transaction);
    localStorage.setItem('zakatHistory', JSON.stringify(history));
}

// Fungsi Helper untuk menampilkan Alert Sukses (Mengganti konten utama)
function displaySuccessAlert(transaction) {
    const mainElement = document.querySelector('main');
    
    // Buat HTML Alert
    const alertHtml = `
        <div class="container my-5 pt-5">
            <div class="row justify-content-center">
                <div class="col-md-7">
                    <div class="card p-5 text-center shadow-lg border-success border-3">
                        <h2 class="text-success fw-bold">Pembayaran Berhasil! <i class="far fa-check-circle"></i></h2>
                        <hr>
                        <p class="lead">Terima kasih, <strong>${transaction.nama}</strong>!</p>
                        <p>Pembayaran <strong>"${transaction.jenis}"</strong> sebesar <strong>Rp ${transaction.nominal.toLocaleString('id-ID')}</strong> telah berhasil kami terima (Simulasi).</p>
                        <p class="text-muted small">Kami akan segera memproses penyaluran dana Anda. Jazaakallahu Khairan Katsiran.</p>
                        <a href="index.html" class="btn btn-success btn-lg mt-3">Kembali ke Beranda</a>
                        <a href="history.html" class="btn btn-outline-secondary btn-sm mt-3">Lihat Riwayat Transaksi</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Ganti konten main dengan alert
    mainElement.innerHTML = alertHtml;
}


// 2. FUNGSI UNTUK MENAMPILKAN RIWAYAT (Dipanggil di history.html)
function displayHistory() {
    const historyContainer = document.getElementById('history-container');
    if (!historyContainer) return;

    const history = JSON.parse(localStorage.getItem('zakatHistory')) || [];

    if (history.length === 0) {
        // PERBAIKAN 2: Mengganti link di halaman riwayat kosong
        historyContainer.innerHTML = `
            <div class="alert alert-info text-center shadow-sm">
                <p class="mb-0">Belum ada riwayat transaksi yang tersimpan di *browser* Anda.</p>
                <a href="donasi-form.html" class="btn btn-info mt-3">Bayar Zakat Sekarang</a>
            </div>
        `;
        return;
    }

    let historyHtml = '<div class="list-group">';

    history.forEach(item => {
        const nominalFormatted = item.nominal.toLocaleString('id-ID');

        historyHtml += `
            <div class="list-group-item list-group-item-action py-3 mb-3 shadow-sm rounded-3">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 text-primary fw-bold">${item.jenis} - Rp ${nominalFormatted}</h5>
                    <small class="text-success fw-bold">${item.status}</small>
                </div>
                <p class="mb-1"><strong>Nama:</strong> ${item.nama}</p>
                <p class="mb-1"><strong>Email/HP:</strong> ${item.email}</p>
                <small class="text-muted"><i class="far fa-calendar-alt me-1"></i> Tanggal Transaksi: ${item.tanggal}</small>
            </div>
        `;
    });

    historyHtml += '</div>';
    historyContainer.innerHTML = historyHtml;
}
