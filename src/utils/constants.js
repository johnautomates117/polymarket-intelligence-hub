// App Configuration
export const APP_CONFIG = {
  MOCK_UPDATE_INTERVAL: 5000, // 5 seconds for market updates
  NEWS_UPDATE_INTERVAL: 15000, // 15 seconds for news
  INITIAL_BALANCE: 10000,
  MAX_POSITION_SIZE: 0.2, // 20% of portfolio max per position
};

// Market Categories
export const CATEGORIES = [
  { id: 'all', label: 'All Markets', icon: '📊' },
  { id: 'politics', label: 'Politics', icon: '🏛️' },
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'economics', label: 'Economics', icon: '📈' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'science', label: 'Science', icon: '🔬' },
];

// Time Filters
export const TIME_FILTERS = [
  { id: '24h', label: '24 Hours' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: 'all', label: 'All Time' },
];

// Sort Options
export const SORT_OPTIONS = [
  { id: 'volume', label: 'Volume', icon: '📊' },
  { id: 'odds', label: 'Odds', icon: '📈' },
  { id: 'recent', label: 'Recent', icon: '🕐' },
  { id: 'trending', label: 'Trending', icon: '🔥' },
];

// Chart Colors
export const CHART_COLORS = {
  primary: '#10b981', // green-400
  secondary: '#3b82f6', // blue-500
  danger: '#ef4444', // red-500
  warning: '#f59e0b', // amber-500
  grid: '#374151', // gray-700
  text: '#9ca3af', // gray-400
};

// News Sentiments
export const NEWS_SENTIMENTS = {
  BULLISH: { label: 'Bullish', color: 'text-green-400', bg: 'bg-green-900' },
  BEARISH: { label: 'Bearish', color: 'text-red-400', bg: 'bg-red-900' },
  NEUTRAL: { label: 'Neutral', color: 'text-gray-400', bg: 'bg-gray-800' },
};

// Trading Actions
export const TRADING_ACTIONS = {
  BUY_YES: 'BUY_YES',
  BUY_NO: 'BUY_NO',
  SELL_YES: 'SELL_YES',
  SELL_NO: 'SELL_NO',
};

// API Endpoints (for real mode)
export const API_ENDPOINTS = {
  POLYMARKET: process.env.REACT_APP_POLYMARKET_API_URL || 'https://api.polymarket.com',
  OPENAI: 'https://api.openai.com/v1',
  NEWS: 'https://newsapi.org/v2',
};