/**
 * API Service - Handles switching between mock and real APIs
 * This is the main abstraction layer for all external data
 */

const isMockMode = process.env.REACT_APP_MODE === 'mock';

// Import mock and real API implementations
import * as mockData from './mockData';
import * as realAPIs from './realAPIs';

/**
 * Market Data Service
 */
export const marketService = {
  // Get all prediction markets
  async getMarkets() {
    if (isMockMode) {
      return mockData.getMockMarkets();
    }
    return realAPIs.fetchPolymarketData();
  },

  // Get specific market details
  async getMarketDetails(marketId) {
    if (isMockMode) {
      return mockData.getMockMarketDetails(marketId);
    }
    return realAPIs.fetchMarketDetails(marketId);
  },

  // Get market price history
  async getMarketHistory(marketId, timeframe = '30d') {
    if (isMockMode) {
      return mockData.generateMockHistory(marketId, timeframe);
    }
    return realAPIs.fetchMarketHistory(marketId, timeframe);
  }
};

/**
 * News Service
 */
export const newsService = {
  // Get breaking news alerts
  async getBreakingNews() {
    if (isMockMode) {
      return mockData.getMockBreakingNews();
    }
    return realAPIs.fetchBreakingNews();
  },

  // Get market-related news
  async getMarketNews(category = 'all') {
    if (isMockMode) {
      return mockData.getMockNews(category);
    }
    return realAPIs.fetchMarketNews(category);
  },

  // Get news sentiment analysis
  async getNewsSentiment() {
    if (isMockMode) {
      return mockData.getMockSentiment();
    }
    return realAPIs.analyzeNewsSentiment();
  }
};

/**
 * AI Assistant Service
 */
export const aiService = {
  // Generate AI response to user query
  async generateResponse(query, context = {}) {
    if (isMockMode) {
      return mockData.generateMockAIResponse(query, context);
    }
    return realAPIs.callOpenAIAPI(query, context);
  },

  // Analyze portfolio performance
  async analyzePortfolio(portfolioData) {
    if (isMockMode) {
      return mockData.generatePortfolioAnalysis(portfolioData);
    }
    return realAPIs.analyzePortfolioWithAI(portfolioData);
  },

  // Get trading recommendations
  async getTradingRecommendations(markets, userProfile) {
    if (isMockMode) {
      return mockData.generateTradingRecommendations(markets, userProfile);
    }
    return realAPIs.generateAIRecommendations(markets, userProfile);
  }
};

/**
 * User Service (for future social features)
 */
export const userService = {
  // Get leaderboard data
  async getLeaderboard() {
    if (isMockMode) {
      return mockData.getMockLeaderboard();
    }
    return realAPIs.fetchLeaderboard();
  },

  // Get user achievements
  async getUserAchievements(userId) {
    if (isMockMode) {
      return mockData.generateUserAchievements(userId);
    }
    return realAPIs.fetchUserAchievements(userId);
  }
};

/**
 * Configuration Service
 */
export const configService = {
  // Get current API mode
  getMode() {
    return isMockMode ? 'mock' : 'real';
  },

  // Check if feature is enabled
  isFeatureEnabled(featureName) {
    const envVar = `REACT_APP_ENABLE_${featureName.toUpperCase()}`;
    return process.env[envVar] === 'true';
  },

  // Get API configuration
  getAPIConfig() {
    return {
      mode: this.getMode(),
      openaiEnabled: !!process.env.REACT_APP_OPENAI_API_KEY,
      newsEnabled: !!process.env.REACT_APP_NEWS_API_KEY,
      polymarketEnabled: !!process.env.REACT_APP_POLYMARKET_API_KEY,
      features: {
        realTrading: this.isFeatureEnabled('real_trading'),
        socialFeatures: this.isFeatureEnabled('social_features'),
        customMarkets: this.isFeatureEnabled('custom_markets')
      }
    };
  }
};

/**
 * WebSocket Service (for real-time updates)
 */
export const websocketService = {
  connection: null,
  listeners: new Map(),

  // Connect to real-time data stream
  connect() {
    if (isMockMode) {
      // Simulate WebSocket with intervals
      return mockData.startMockWebSocket();
    }
    return realAPIs.connectWebSocket();
  },

  // Subscribe to market updates
  subscribeToMarket(marketId, callback) {
    if (isMockMode) {
      return mockData.subscribeToMockUpdates(marketId, callback);
    }
    return realAPIs.subscribeToMarketUpdates(marketId, callback);
  },

  // Disconnect
  disconnect() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }
};

// Export mode information for components
export const API_MODE = isMockMode ? 'mock' : 'real';
export const IS_MOCK_MODE = isMockMode;
