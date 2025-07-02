// Trading Calculations

/**
 * Calculate profit/loss for a position
 * @param {Object} position - Trading position
 * @param {number} currentPrice - Current market price
 * @returns {Object} P&L data
 */
export const calculatePnL = (position, currentPrice) => {
  const { type, entryPrice, shares, amount } = position;
  
  // For YES positions
  if (type === 'YES') {
    const currentValue = shares * currentPrice;
    const pnl = currentValue - amount;
    const pnlPercent = (pnl / amount) * 100;
    return { pnl, pnlPercent, currentValue };
  }
  
  // For NO positions (inverse)
  const noPrice = 1 - currentPrice;
  const currentValue = shares * noPrice;
  const pnl = currentValue - amount;
  const pnlPercent = (pnl / amount) * 100;
  
  return { pnl, pnlPercent, currentValue };
};

/**
 * Calculate portfolio metrics
 * @param {Object} portfolio - Portfolio object
 * @param {Array} markets - Current market data
 * @returns {Object} Portfolio metrics
 */
export const calculatePortfolioMetrics = (portfolio, markets) => {
  const { balance, positions } = portfolio;
  
  let totalValue = balance;
  let totalPnL = 0;
  let openPositions = 0;
  
  positions.forEach(position => {
    if (position.status === 'open') {
      openPositions++;
      const market = markets.find(m => m.id === position.marketId);
      if (market) {
        const { pnl, currentValue } = calculatePnL(position, market.odds);
        totalValue += currentValue;
        totalPnL += pnl;
      }
    }
  });
  
  const totalInvested = 10000; // Initial balance
  const totalReturn = ((totalValue - totalInvested) / totalInvested) * 100;
  
  return {
    totalValue,
    totalPnL,
    totalReturn,
    openPositions,
    availableBalance: balance,
  };
};

/**
 * Calculate implied probability from odds
 * @param {number} odds - Market odds (0-1)
 * @returns {number} Implied probability percentage
 */
export const calculateImpliedProbability = (odds) => {
  return odds * 100;
};

/**
 * Calculate potential payout
 * @param {number} amount - Investment amount
 * @param {number} odds - Market odds
 * @param {string} type - YES or NO
 * @returns {number} Potential payout
 */
export const calculatePotentialPayout = (amount, odds, type) => {
  if (type === 'YES') {
    return amount / odds;
  }
  // For NO positions
  return amount / (1 - odds);
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

/**
 * Calculate market statistics
 * @param {Array} priceHistory - Array of historical prices
 * @returns {Object} Market statistics
 */
export const calculateMarketStats = (priceHistory) => {
  if (!priceHistory || priceHistory.length === 0) {
    return { high: 0, low: 0, average: 0, volatility: 0 };
  }
  
  const prices = priceHistory.map(p => p.value);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const average = prices.reduce((a, b) => a + b, 0) / prices.length;
  
  // Calculate volatility (standard deviation)
  const variance = prices.reduce((acc, price) => {
    return acc + Math.pow(price - average, 2);
  }, 0) / prices.length;
  
  const volatility = Math.sqrt(variance);
  
  return { high, low, average, volatility };
};

/**
 * Generate mock price history
 * @param {number} currentPrice - Current market price
 * @param {number} days - Number of days of history
 * @returns {Array} Price history array
 */
export const generatePriceHistory = (currentPrice, days = 30) => {
  const history = [];
  let price = currentPrice;
  
  for (let i = days; i >= 0; i--) {
    // Add some random walk
    const change = (Math.random() - 0.5) * 0.1;
    price = Math.max(0.01, Math.min(0.99, price + change));
    
    history.push({
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      value: price,
    });
  }
  
  // Ensure last price matches current
  history[history.length - 1].value = currentPrice;
  
  return history;
};