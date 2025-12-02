// assets/js/donasi.js

// 1. FUNGSI UNTUK MENYIMPAN RIWAYAT (Dipanggil saat formulir disubmit di index.html)
document.addEventListener('DOMContentLoaded', function() {
    const formPembayaran = document.getElementById('form-pembayaran');
    
    if (formPembayaran) {
        formPembayaran.addEventListener('submit', function(e) {
            e.preventDefault();

            // Ambil data dari formulir
            const jenisZakat = document.getElementById('jenisZakat').value;
            const nominal = parseInt(document.getElementById('nominal').value);
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;

            // Buat objek transaksi
            const transaction = {
                id: Date.now(), // ID unik berdasarkan timestamp
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

            // Bersihkan formulir
            formPembayaran.reset();
        });
    }
});

// Fungsi Helper untuk menyimpan ke LocalStorage
function saveTransaction(transaction) {
    // Ambil riwayat yang sudah ada, atau buat array kosong
    const history = JSON.parse(localStorage.getItem('zakatHistory')) || [];
    
    // Tambahkan transaksi baru di awal (terbaru di atas)
    history.unshift(transaction);
    
    // Simpan kembali ke LocalStorage
    localStorage.setItem('zakatHistory', JSON.stringify(history));
}

// Fungsi Helper untuk menampilkan Alert Sukses
function displaySuccessAlert(transaction) {
    const mainElement = document.querySelector('main');
    
    // Buat HTML Alert
    const alertHtml = `
        <div class="container my-5">
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

    // Ganti konten main dengan alert (untuk simulasi, ini menghilangkan konten form/kalkulator)
    mainElement.innerHTML = alertHtml;
}


// 2. FUNGSI UNTUK MENAMPILKAN RIWAYAT (Dipanggil di history.html)
function displayHistory() {
    const historyContainer = document.getElementById('history-container');
    if (!historyContainer) return; // Keluar jika bukan di halaman riwayat

    const history = JSON.parse(localStorage.getItem('zakatHistory')) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="alert alert-info text-center shadow-sm">
                <p class="mb-0">Belum ada riwayat transaksi yang tersimpan di *browser* Anda.</p>
                <a href="index.html#donasi-form" class="btn btn-info mt-3">Bayar Zakat Sekarang</a>
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

// Panggil displayHistory saat DOM fully loaded (sudah ditambahkan di history.html)