/**
 * Utility functions untuk Zakat Digital
 * Helper functions untuk currency, validation, localStorage operations
 */

/**
 * Format number ke Rupiah dengan Indonesian locale
 * @param {number} num - Number to format
 * @returns {string} Formatted Rupiah string
 * @example formatRupiah(1000000) → "1.000.000"
 */
function formatRupiah(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return parseInt(num).toLocaleString('id-ID');
}

/**
 * Extract numeric value dari formatted Rupiah string
 * @param {string} str - Formatted Rupiah string
 * @returns {number} Numeric value
 * @example parseRupiah("1.000.000") → 1000000
 */
function parseRupiah(str) {
    if (!str) return 0;
    const cleaned = str.replace(/\D/g, '');
    return parseInt(cleaned) || 0;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (minimal Indonesian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
function isValidPhone(phone) {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Get formatted current date in Indonesian format
 * @returns {string} Formatted date string
 * @example "3 Desember 2025, 10:20"
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
 * Save transaction to localStorage
 * @param {Object} transaction - Transaction object to save
 */
function saveToHistory(transaction) {
    try {
        const history = JSON.parse(localStorage.getItem('zakatHistory')) || [];
        history.unshift(transaction); // Add to beginning (most recent first)
        localStorage.setItem('zakatHistory', JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

/**
 * Get all transactions from localStorage
 * @returns {Array} Array of transaction objects
 */
function getHistory() {
    try {
        return JSON.parse(localStorage.getItem('zakatHistory')) || [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

/**
 * Clear all transaction history
 * @returns {boolean} Success status
 */
function clearHistory() {
    try {
        localStorage.removeItem('zakatHistory');
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
}

/**
 * Calculate zakat from income
 * @param {number} income - Monthly income
 * @param {number} nisab - Nisab value (default: 7083333)
 * @returns {Object} {eligible: boolean, amount: number, message: string}
 */
function calculateZakat(income, nisab = 7083333) {
    if (income <= 0) {
        return {
            eligible: false,
            amount: 0,
            message: 'Penghasilan tidak valid'
        };
    }

    if (income >= nisab) {
        const amount = Math.round(income * 0.025);
        return {
            eligible: true,
            amount: amount,
            message: `Wajib zakat: Rp ${formatRupiah(amount)}`
        };
    } else {
        return {
            eligible: false,
            amount: 0,
            shortfall: nisab - income,
            message: `Belum mencapai nisab. Kurang: Rp ${formatRupiah(nisab - income)}`
        };
    }
}

/**
 * Create transaction object with all required fields
 * @param {Object} data - Transaction data
 * @returns {Object} Complete transaction object
 */
function createTransaction(data) {
    return {
        id: Date.now(),
        tanggal: getFormattedDate(),
        jenis: data.jenis || '',
        nominal: parseInt(data.nominal) || 0,
        nama: data.nama || 'Donatur Anonim',
        emailhp: data.emailhp || '',
        status: 'Berhasil (Simulasi)'
    };
}

/**
 * Format currency input as user types (remove non-numeric, format as Rupiah)
 * @param {HTMLInputElement} element - Input element
 */
function setupRupiahInput(element) {
    if (!element) return;

    element.addEventListener('input', (e) => {
        const raw = e.target.value.replace(/\D/g, '');
        e.target.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';
    });
}

/**
 * Show alert dialog dengan Bootstrap styling (manual)
 * @param {string} message - Message to show
 * @param {string} type - Alert type: 'success', 'error', 'warning', 'info'
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('main') || document.body;
    container.insertBefore(alertDiv, container.firstChild);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function} Debounced function
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Export untuk digunakan di module lain (jika ada)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatRupiah,
        parseRupiah,
        isValidEmail,
        isValidPhone,
        getFormattedDate,
        saveToHistory,
        getHistory,
        clearHistory,
        calculateZakat,
        createTransaction,
        setupRupiahInput,
        showAlert,
        debounce
    };
}