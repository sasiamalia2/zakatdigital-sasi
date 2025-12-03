/**
 * ZAKAT DIGITAL - Utility Functions Library
 * 
 * Comprehensive utility functions for zakat calculation, currency formatting,
 * validation, and localStorage management.
 * 
 * Usage:
 * - Include this file in any HTML: <script src="assets/js/donasi.js"></script>
 * - All functions are globally available
 */

// ===== CURRENCY UTILITIES =====

/**
 * Format number as Rupiah currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted string like "1.000.000"
 * @example formatRupiah(1000000) → "1.000.000"
 */
function formatRupiah(amount) {
    if (!amount || amount === 0) return "0";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Parse Rupiah formatted string back to number
 * @param {string} rupiah - The Rupiah string like "1.000.000"
 * @returns {number} Numeric value
 * @example parseRupiah("1.000.000") → 1000000
 */
function parseRupiah(rupiah) {
    if (!rupiah) return 0;
    return parseInt(rupiah.toString().replace(/\D/g, '')) || 0;
}

/**
 * Format number with Rupiah prefix
 * @param {number} amount - The amount to format
 * @returns {string} Formatted string like "Rp 1.000.000"
 * @example formatRupiahWithPrefix(1000000) → "Rp 1.000.000"
 */
function formatRupiahWithPrefix(amount) {
    return `Rp ${formatRupiah(amount)}`;
}

/**
 * Get the locale string format for a currency amount
 * Using Indonesian locale for proper formatting
 * @param {number} amount - The amount to format
 * @returns {string} Locale formatted string
 * @example getFormattedCurrency(1000000) → "1.000.000"
 */
function getFormattedCurrency(amount) {
    if (!amount || amount === 0) return "0";
    return amount.toLocaleString('id-ID');
}

// ===== VALIDATION UTILITIES =====

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 * @example isValidEmail("user@example.com") → true
 */
function isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate Indonesian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 * @example isValidPhone("081234567890") → true
 */
function isValidPhone(phone) {
    if (!phone) return false;
    const phoneRegex = /^(?:\+62|0)[0-9]{9,12}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Validate nominal/amount is positive number
 * @param {string|number} nominal - Nominal to validate
 * @returns {boolean} True if valid positive number
 * @example isValidNominal("250000") → true
 */
function isValidNominal(nominal) {
    if (!nominal) return false;
    const num = parseRupiah(nominal.toString());
    return num > 0;
}

/**
 * Validate required form fields
 * @param {object} formData - Object with field names and values
 * @returns {object} {isValid: boolean, errors: array}
 * @example validateFormFields({email: "test@example.com", nominal: "250000"})
 */
function validateFormFields(formData) {
    const errors = [];
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push("Email tidak valid");
    }
    
    if (!formData.nominal || !isValidNominal(formData.nominal)) {
        errors.push("Nominal harus lebih dari 0");
    }
    
    if (formData.phone && !isValidPhone(formData.phone)) {
        errors.push("Nomor telepon tidak valid");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ===== ZAKAT CALCULATION UTILITIES =====

/**
 * Calculate zakat amount
 * @param {number} income - Monthly income
 * @param {number} nisab - Current nisab amount (default: 7.5M)
 * @returns {object} {eligible: boolean, amount: number, percentage: number, ...}
 * @example calculateZakat(8500000) → {eligible: true, amount: 212500, ...}
 */
function calculateZakat(income, nisab = 7500000) {
    const percentage = 2.5;
    const eligible = income >= nisab;
    const amount = eligible ? Math.round(income * (percentage / 100)) : 0;
    const shortfall = !eligible ? nisab - income : 0;
    
    return {
        eligible: eligible,
        amount: amount,
        percentage: percentage,
        income: income,
        nisab: nisab,
        shortfall: shortfall,
        message: eligible 
            ? `Anda wajib membayar zakat Rp ${formatRupiah(amount)} per bulan`
            : `Penghasilan Anda masih kurang Rp ${formatRupiah(shortfall)} untuk mencapai nisab`
    };
}

// ===== LOCALSTORAGE UTILITIES =====

/**
 * Save transaction to localStorage history
 * @param {object} transaction - Transaction object
 * @returns {boolean} Success status
 * @example saveToHistory({id: 1, jenis: "Zakat", nominal: 250000, ...})
 */
function saveToHistory(transaction) {
    try {
        const history = getHistory();
        history.unshift(transaction);
        localStorage.setItem('zakatHistory', JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Error saving to history:', error);
        return false;
    }
}

/**
 * Get all transactions from localStorage
 * @returns {array} Array of transaction objects
 * @example getHistory() → [{id: 1, jenis: "Zakat", ...}, ...]
 */
function getHistory() {
    try {
        const data = localStorage.getItem('zakatHistory');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading history:', error);
        return [];
    }
}

/**
 * Get single transaction by ID
 * @param {number} id - Transaction ID
 * @returns {object|null} Transaction object or null
 * @example getTransactionById(1702642800000)
 */
function getTransactionById(id) {
    const history = getHistory();
    return history.find(t => t.id === id) || null;
}

/**
 * Delete transaction from history
 * @param {number} id - Transaction ID to delete
 * @returns {boolean} Success status
 * @example deleteTransaction(1702642800000)
 */
function deleteTransaction(id) {
    try {
        let history = getHistory();
        history = history.filter(t => t.id !== id);
        localStorage.setItem('zakatHistory', JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return false;
    }
}

/**
 * Clear all transaction history
 * @returns {boolean} Success status
 * @example clearHistory()
 */
function clearHistory() {
    try {
        localStorage.removeItem('zakatHistory');
        return true;
    } catch (error) {
        console.error('Error clearing history:', error);
        return false;
    }
}

/**
 * Get transaction statistics
 * @returns {object} {total: number, count: number, average: number, ...}
 * @example getHistoryStats() → {total: 500000, count: 2, average: 250000, ...}
 */
function getHistoryStats() {
    const history = getHistory();
    if (history.length === 0) {
        return {
            total: 0,
            count: 0,
            average: 0,
            largest: 0,
            smallest: 0
        };
    }
    
    const totals = history.map(t => t.nominal || 0);
    const total = totals.reduce((a, b) => a + b, 0);
    
    return {
        total: total,
        count: history.length,
        average: Math.round(total / history.length),
        largest: Math.max(...totals),
        smallest: Math.min(...totals)
    };
}

// ===== TRANSACTION UTILITIES =====

/**
 * Create a transaction object
 * @param {object} data - Transaction data
 * @returns {object} Complete transaction object
 * @example createTransaction({jenis: "Zakat", nominal: 250000, nama: "Ahmad", ...})
 */
function createTransaction(data) {
    return {
        id: Date.now(),
        tanggal: getFormattedDate(),
        jenis: data.jenis || 'Donasi',
        nominal: parseRupiah(data.nominal) || 0,
        nama: data.nama || 'Donatur Anonim',
        emailhp: data.emailhp || '',
        status: data.status || 'Berhasil (Simulasi)',
        catatan: data.catatan || ''
    };
}

/**
 * Format transaction for display
 * @param {object} transaction - Transaction object
 * @returns {object} Formatted transaction with display strings
 * @example formatTransaction({nominal: 250000, ...})
 */
function formatTransaction(transaction) {
    return {
        ...transaction,
        nominalFormatted: formatRupiahWithPrefix(transaction.nominal),
        dateFormatted: transaction.tanggal
    };
}

// ===== DATE UTILITIES =====

/**
 * Get current date formatted in Indonesian
 * @returns {string} Formatted date like "3 Desember 2025, 10:20"
 * @example getFormattedDate() → "3 Desember 2025, 10:20"
 */
function getFormattedDate() {
    return new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format date object to Indonesian format
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date
 * @example formatDate(new Date()) → "3 Desember 2025"
 */
function formatDate(date) {
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 * @example getRelativeTime("2025-12-01") → "2 days ago"
 */
function getRelativeTime(date) {
    const now = new Date();
    const target = new Date(date);
    const diffMs = now - target;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return formatDate(target);
}

// ===== STRING UTILITIES =====

/**
 * Truncate string to max length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} Truncated string
 * @example truncateString("This is a long text", 10) → "This is a..."
 */
function truncateString(str, maxLength = 50) {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 * @example capitalizeString("hello") → "Hello"
 */
function capitalizeString(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to Title Case
 * @param {string} str - CamelCase string
 * @returns {string} Title Case string
 * @example camelToTitleCase("zakatPenghasilan") → "Zakat Penghasilan"
 */
function camelToTitleCase(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str[0].toUpperCase())
        .trim();
}

// ===== IMPORT/EXPORT UTILITIES =====

/**
 * Export history to JSON file
 * @param {string} filename - Output filename (default: "zakatHistory.json")
 * @returns {void} Downloads file
 * @example exportHistoryToJSON("my-zakat-history.json")
 */
function exportHistoryToJSON(filename = 'zakatHistory.json') {
    const history = getHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Export history to CSV file
 * @param {string} filename - Output filename (default: "zakatHistory.csv")
 * @returns {void} Downloads file
 * @example exportHistoryToCSV("my-zakat-history.csv")
 */
function exportHistoryToCSV(filename = 'zakatHistory.csv') {
    const history = getHistory();
    if (history.length === 0) {
        alert('Tidak ada data untuk diexport');
        return;
    }
    
    const headers = ['Tanggal', 'Jenis', 'Nominal (Rp)', 'Nama', 'Email/HP', 'Status'];
    const rows = history.map(t => [
        t.tanggal,
        t.jenis,
        t.nominal,
        t.nama,
        t.emailhp,
        t.status
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Import history from JSON file
 * @param {File} file - JSON file to import
 * @param {boolean} merge - Merge with existing history (default: false)
 * @returns {Promise} Promise resolving to success status
 * @example importHistoryFromJSON(fileInput.files[0])
 */
function importHistoryFromJSON(file, merge = false) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (!Array.isArray(imported)) {
                    reject('Invalid format: Expected array');
                    return;
                }
                
                if (merge) {
                    const existing = getHistory();
                    const combined = [...imported, ...existing];
                    localStorage.setItem('zakatHistory', JSON.stringify(combined));
                } else {
                    localStorage.setItem('zakatHistory', JSON.stringify(imported));
                }
                
                resolve(true);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => reject('Failed to read file');
        reader.readAsText(file);
    });
}

// ===== DISPLAY UTILITIES =====

/**
 * Display transaction history on page
 * Enhanced version with modern styling and sorting
 * @param {object} options - Display options
 * @example displayHistory({container: "history-container", sort: "date", reverse: true})
 */
function displayHistory(options = {}) {
    const {
        container = 'history-container',
        sort = 'date',
        reverse = true,
        maxItems = null
    } = options;
    
    const historyContainer = document.getElementById(container);
    if (!historyContainer) return;

    let history = getHistory();
    
    // Sort
    if (sort === 'date') {
        history.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    } else if (sort === 'amount') {
        history.sort((a, b) => b.nominal - a.nominal);
    }
    
    if (reverse) history.reverse();
    if (maxItems) history = history.slice(0, maxItems);

    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="alert alert-info text-center shadow-sm rounded-3 border-0" style="background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%); border-left: 4px solid #0284c7;">
                <i class="fas fa-inbox" style="font-size: 2rem; color: #0284c7; margin-bottom: 1rem; display: block;"></i>
                <p class="mb-2" style="color: #075985;"><strong>Belum ada riwayat transaksi</strong></p>
                <p class="text-muted small mb-3">Mulai donasi Anda sekarang untuk melihat riwayat di sini.</p>
                <a href="donasi-form.html" class="btn btn-primary btn-sm" style="background: linear-gradient(135deg, #0284c7 0%, #075985 100%); border: none;">
                    <i class="fas fa-plus me-1"></i> Donasi Sekarang
                </a>
            </div>
        `;
        return;
    }

    let historyHtml = '<div class="row g-3">';

    history.forEach((item) => {
        const nominalFormatted = formatRupiah(item.nominal);
        const relativeTime = getRelativeTime(item.tanggal);
        const statusColor = item.status.includes('Berhasil') ? '#10b981' : '#f59e0b';
        const statusBg = item.status.includes('Berhasil') ? '#f0fdf4' : '#fffbeb';

        historyHtml += `
            <div class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm h-100 transition-all" style="border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h6 class="card-title fw-bold mb-0 text-dark" style="flex: 1;">${item.jenis}</h6>
                            <span class="badge" style="background: ${statusBg}; color: ${statusColor}; font-size: 0.7rem; font-weight: 600;">
                                ${item.status}
                            </span>
                        </div>
                        
                        <h5 class="fw-bold mb-3" style="color: #10b981; font-size: 1.3rem;">Rp ${nominalFormatted}</h5>
                        
                        <div class="small text-muted mb-3">
                            <p class="mb-2"><i class="fas fa-user me-2" style="color: #6c757d;"></i> ${item.nama}</p>
                            <p class="mb-2"><i class="fas fa-envelope me-2" style="color: #6c757d;"></i> ${truncateString(item.emailhp, 30)}</p>
                            <p class="mb-0"><i class="fas fa-clock me-2" style="color: #6c757d;"></i> ${relativeTime}</p>
                        </div>
                        
                        <div style="border-top: 1px solid #e5e7eb; padding-top: 1rem; margin-top: 1rem;">
                            <small class="text-muted d-block" style="font-size: 0.8rem;">Tanggal Transaksi</small>
                            <small class="fw-bold text-dark">${item.tanggal}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    historyHtml += '</div>';
    historyContainer.innerHTML = historyHtml;
    
    // Add hover effects
    const cards = historyContainer.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        });
    });
}

// ===== INITIALIZATION =====

/**
 * Initialize utilities on page load
 * Automatically called when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Display history if on history page
    if (document.getElementById('history-container')) {
        displayHistory({sort: 'date', reverse: true});
    }
});
