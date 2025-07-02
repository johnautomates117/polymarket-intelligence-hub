/**
 * Real API Service - Handles production API calls
 * This file contains all the real API implementations
 */

// API Configuration
const API_CONFIG = {
  openai: {
    url: process.env.REACT_APP_OPENAI_API_URL || 'https://api.openai.com/v1',
    key: process.env.REACT_APP_OPENAI_API_KEY
  },
  news: {
    url: process.env.REACT_APP_NEWS_API_URL || 'https://newsapi.org/v2',
    key: process.env.REACT_APP_NEWS_API_KEY
  },
  polymarket: {
    url: process.env.REACT_APP_POLYMARKET_API_URL || 'https://clob.polymarket.com',
    key: process.env.REACT_APP_POLYMARKET_API_KEY
  }
};

/**
 * Polymarket API Functions
 */
export const fetchPolymarketData = async () => {
  try {
    const response = await fetch(`${API_CONFIG.polymarket.url}/markets`, {
      headers: {
        'Authorization': `Bearer ${API_CONFIG.polymarket.key}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform Polymarket data to our format
    return data.map(market => ({
      id: market.id,
      title: market.question,
      category: mapPolymarketCategory(market.category),
      odds: market.outcomePrices?.[0] * 100 || 50,
      change24h: market.change24h || 0,
      volume: market.volume || 0,
      resolveDate: market.endDate,
      description: market.description,
      history: [] // Will be fetched separately
    }));
  } catch (error) {
    console.error('Failed to fetch Polymarket data:', error);
    throw error;
  }
};

export const fetchMarketDetails = async (marketId) => {
  try {
    const response = await fetch(`${API_CONFIG.polymarket.url}/markets/${marketId}`, {
      headers: {
        'Authorization': `Bearer ${API_CONFIG.polymarket.key}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Market details API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch market details:', error);
    throw error;
  }
};

export const fetchMarketHistory = async (marketId, timeframe = '30d') => {
  try {
    const response = await fetch(`${API_CONFIG.polymarket.url}/markets/${marketId}/history?timeframe=${timeframe}`, {
      headers: {
        'Authorization': `Bearer ${API_CONFIG.polymarket.key}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Market history API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform to our chart format
    return data.map(point => ({
      date: new Date(point.timestamp).toLocaleDateString(),
      odds: point.price * 100
    }));
  } catch (error) {
    console.error('Failed to fetch market history:', error);
    throw error;
  }
};

/**
 * News API Functions
 */
export const fetchBreakingNews = async () => {
  try {
    const response = await fetch(`${API_CONFIG.news.url}/top-headlines?category=business&country=us&apiKey=${API_CONFIG.news.key}`);
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for market-relevant news
    const marketKeywords = ['market', 'economy', 'election', 'bitcoin', 'fed', 'rates', 'tech'];
    
    return data.articles
      .filter(article => 
        marketKeywords.some(keyword => 
          article.title.toLowerCase().includes(keyword) ||
          article.description?.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 5)
      .map(article => ({
        id: article.url,
        headline: article.title,
        summary: article.description,
        timestamp: new Date(article.publishedAt),
        severity: classifyNewsSeverity(article.title),
        source: article.source.name,
        impact: generateImpactText(article.title)
      }));
  } catch (error) {
    console.error('Failed to fetch breaking news:', error);
    throw error;
  }
};

export const fetchMarketNews = async (category = 'all') => {
  try {
    const query = category === 'all' ? 'prediction markets' : category;
    const response = await fetch(`${API_CONFIG.news.url}/everything?q=${query}&sortBy=publishedAt&apiKey=${API_CONFIG.news.key}`);
    
    if (!response.ok) {
      throw new Error(`Market news API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.articles.slice(0, 10).map(article => ({
      id: article.url,
      headline: article.title,
      summary: article.description,
      timestamp: new Date(article.publishedAt),
      source: article.source.name,
      category: category
    }));
  } catch (error) {
    console.error('Failed to fetch market news:', error);
    throw error;
  }
};

/**
 * OpenAI API Functions
 */
export const callOpenAIAPI = async (query, context = {}) => {
  try {
    const systemPrompt = `You are an AI assistant specialized in prediction markets and trading analysis. 
    You help users understand market dynamics, analyze portfolios, and make informed trading decisions.
    Provide concise, actionable insights based on the user's query.
    
    Context: ${JSON.stringify(context)}`;
    
    const response = await fetch(`${API_CONFIG.openai.url}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.openai.key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to call OpenAI API:', error);
    throw error;
  }
};

export const analyzePortfolioWithAI = async (portfolioData) => {
  const prompt = `Analyze this trading portfolio and provide insights:

${JSON.stringify(portfolioData, null, 2)}

Provide analysis on:
1. Overall performance
2. Risk assessment
3. Diversification
4. Recommendations`;
  
  return await callOpenAIAPI(prompt, { type: 'portfolio_analysis' });
};

/**
 * WebSocket Functions
 */
export const connectWebSocket = () => {
  const ws = new WebSocket(`wss://${API_CONFIG.polymarket.url.replace('https://', '')}/ws`);
  
  ws.onopen = () => {
    console.log('Connected to Polymarket WebSocket');
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
};

export const subscribeToMarketUpdates = (marketId, callback) => {
  const ws = connectWebSocket();
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.marketId === marketId) {
      callback(data);
    }
  };
  
  // Subscribe to specific market
  ws.send(JSON.stringify({
    type: 'subscribe',
    marketId: marketId
  }));
  
  return () => ws.close();
};

/**
 * Utility Functions
 */
const mapPolymarketCategory = (polymarketCategory) => {
  const categoryMap = {
    'politics': 'Politics',
    'economics': 'Economics',
    'technology': 'Technology',
    'crypto': 'Crypto/Regulation',
    'sports': 'Sports',
    'entertainment': 'Culture'
  };
  
  return categoryMap[polymarketCategory?.toLowerCase()] || 'Other';
};

const classifyNewsSeverity = (headline) => {
  const highImpactKeywords = ['breaking', 'emergency', 'crisis', 'crash', 'surge'];
  const mediumImpactKeywords = ['announce', 'report', 'decision', 'change'];
  
  const lowerHeadline = headline.toLowerCase();
  
  if (highImpactKeywords.some(keyword => lowerHeadline.includes(keyword))) {
    return 'high';
  } else if (mediumImpactKeywords.some(keyword => lowerHeadline.includes(keyword))) {
    return 'medium';
  }
  
  return 'low';
};

const generateImpactText = (headline) => {
  // Simple keyword-based impact classification
  const lowerHeadline = headline.toLowerCase();
  
  if (lowerHeadline.includes('fed') || lowerHeadline.includes('rate')) {
    return 'Significant impact expected on interest rate and economic markets';
  } else if (lowerHeadline.includes('bitcoin') || lowerHeadline.includes('crypto')) {
    return 'Major implications for cryptocurrency prediction markets';
  } else if (lowerHeadline.includes('election') || lowerHeadline.includes('political')) {
    return 'High impact on political prediction markets';
  }
  
  return 'Moderate impact expected across relevant prediction markets';
};

// Rate limiting utility
const rateLimiter = {
  calls: new Map(),
  
  async checkLimit(apiName, maxCalls = 100, timeWindow = 60000) {
    const now = Date.now();
    const calls = this.calls.get(apiName) || [];
    
    // Remove old calls outside time window
    const recentCalls = calls.filter(timestamp => now - timestamp < timeWindow);
    
    if (recentCalls.length >= maxCalls) {
      throw new Error(`Rate limit exceeded for ${apiName}`);
    }
    
    recentCalls.push(now);
    this.calls.set(apiName, recentCalls);
  }
};

// Export rate limiter for use in API calls
export { rateLimiter };
