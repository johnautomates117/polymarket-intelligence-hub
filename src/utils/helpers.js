// General Helper Functions

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format date to relative time
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return then.toLocaleDateString();
};

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Parse search query for advanced filters
 * @param {string} query - Search query
 * @returns {Object} Parsed filters
 */
export const parseSearchQuery = (query) => {
  const filters = {
    text: '',
    minVolume: null,
    maxOdds: null,
    minOdds: null,
    category: null,
  };
  
  // Extract volume filter (e.g., "volume:>1000")
  const volumeMatch = query.match(/volume:([><]?)(\d+)/i);
  if (volumeMatch) {
    filters.minVolume = volumeMatch[1] === '>' ? parseInt(volumeMatch[2]) : null;
    query = query.replace(volumeMatch[0], '').trim();
  }
  
  // Extract odds filter (e.g., "odds:0.2-0.8")
  const oddsMatch = query.match(/odds:(\d*\.?\d+)-(\d*\.?\d+)/i);
  if (oddsMatch) {
    filters.minOdds = parseFloat(oddsMatch[1]);
    filters.maxOdds = parseFloat(oddsMatch[2]);
    query = query.replace(oddsMatch[0], '').trim();
  }
  
  // Extract category filter (e.g., "cat:politics")
  const categoryMatch = query.match(/cat:(\w+)/i);
  if (categoryMatch) {
    filters.category = categoryMatch[1];
    query = query.replace(categoryMatch[0], '').trim();
  }
  
  filters.text = query;
  return filters;
};

/**
 * Validate trading amount
 * @param {number} amount - Amount to validate
 * @param {number} balance - Available balance
 * @param {number} maxPositionSize - Maximum position size
 * @returns {Object} Validation result
 */
export const validateTradeAmount = (amount, balance, maxPositionSize = 0.2) => {
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  
  if (amount > balance) {
    return { valid: false, error: 'Insufficient balance' };
  }
  
  const maxAllowed = balance * maxPositionSize;
  if (amount > maxAllowed) {
    return { 
      valid: false, 
      error: `Maximum position size is ${(maxPositionSize * 100).toFixed(0)}% of balance` 
    };
  }
  
  return { valid: true };
};

/**
 * Group items by key
 * @param {Array} items - Items to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped items
 */
export const groupBy = (items, key) => {
  return items.reduce((groups, item) => {
    const value = item[key];
    (groups[value] = groups[value] || []).push(item);
    return groups;
  }, {});
};

/**
 * Calculate moving average
 * @param {Array} data - Array of numbers
 * @param {number} period - Period for moving average
 * @returns {Array} Moving average values
 */
export const calculateMovingAverage = (data, period = 7) => {
  const result = [];
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }
  
  return result;
};

/**
 * Get color for percentage change
 * @param {number} value - Percentage value
 * @returns {string} Tailwind color class
 */
export const getChangeColor = (value) => {
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-gray-400';
};

/**
 * Export data to CSV
 * @param {Array} data - Data to export
 * @param {string} filename - File name
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};