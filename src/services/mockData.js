/**
 * Mock Data Service - Provides realistic simulation data
 * This file contains all the mock implementations for testing
 */

// Mock market data (current implementation from the component)
export const getMockMarkets = () => {
  return [
    {
      id: 1,
      title: "Will there be a US recession in 2025?",
      category: "Economics",
      odds: 34,
      change24h: -2.3,
      volume: 2400000,
      resolveDate: "2025-12-31",
      description: "Market resolves YES if NBER declares recession starting in 2025",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 36 + Math.sin(i/5) * 8 + Math.random() * 4
      }))
    },
    {
      id: 2,
      title: "Elon Musk to leave Trump administration in 2025?",
      category: "Politics",
      odds: 67,
      change24h: +5.2,
      volume: 1800000,
      resolveDate: "2025-12-31",
      description: "Market resolves YES if Musk officially leaves any government position",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 62 + Math.cos(i/4) * 10 + Math.random() * 3
      }))
    },
    {
      id: 3,
      title: "Fed to cut rates in June 2025?",
      category: "Economics",
      odds: 78,
      change24h: +1.1,
      volume: 3200000,
      resolveDate: "2025-06-18",
      description: "Market resolves YES if Fed cuts rates by any amount in June FOMC meeting",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 76 + Math.sin(i/3) * 6 + Math.random() * 4
      }))
    },
    {
      id: 4,
      title: "Bitcoin to reach $150k in 2025?",
      category: "Crypto/Regulation",
      odds: 23,
      change24h: -8.7,
      volume: 5600000,
      resolveDate: "2025-12-31",
      description: "Market resolves YES if BTC hits $150,000 at any point during 2025",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 31 - i * 0.3 + Math.random() * 5
      }))
    },
    {
      id: 5,
      title: "AI to pass medical licensing exam?",
      category: "Technology",
      odds: 89,
      change24h: +12.4,
      volume: 1200000,
      resolveDate: "2025-09-30",
      description: "Market resolves YES if AI system passes USMLE Step 1 with >95% score",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 77 + i * 0.4 + Math.random() * 3
      }))
    },
    {
      id: 6,
      title: "UEFA Champions League winner 2025?",
      category: "Sports",
      odds: 19,
      change24h: -1.5,
      volume: 4500000,
      resolveDate: "2025-05-31",
      description: "Market for Manchester City to win Champions League 2024-25",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 20.5 - Math.sin(i/5) * 3 + Math.random() * 2
      }))
    },
    {
      id: 7,
      title: "Netflix subscriber milestone?",
      category: "Culture",
      odds: 72,
      change24h: +2.8,
      volume: 1600000,
      resolveDate: "2025-12-31",
      description: "Market resolves YES if Netflix reaches 300M subscribers in 2025",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 69 + Math.sin(i/4) * 5 + Math.random() * 3
      }))
    },
    {
      id: 8,
      title: "Apple to acquire major AI company?",
      category: "Technology",
      odds: 56,
      change24h: +3.2,
      volume: 2100000,
      resolveDate: "2025-12-31",
      description: "Market resolves YES if Apple acquires AI company worth >$10B",
      history: Array.from({length: 30}, (_, i) => ({
        date: `Day ${i+1}`,
        odds: 53 + Math.cos(i/4) * 8 + Math.random() * 4
      }))
    }
  ];
};

// Mock news data
export const getMockNews = (category = 'all') => {
  const allNews = [
    {
      id: 1,
      headline: "Fed Chair Signals More Aggressive Rate Cuts",
      summary: "Jerome Powell hints at 50bp cut in upcoming meeting, citing economic concerns",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      severity: "high",
      affectedMarkets: [3],
      impact: "Bullish for rate cut markets, bearish for inflation markets",
      source: "Reuters",
      category: "Economics"
    },
    {
      id: 2,
      headline: "Bitcoin ETF Sees Record Inflows",
      summary: "$2.1B flows into Bitcoin ETFs in single day, institutional demand surging",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      severity: "medium",
      affectedMarkets: [4],
      impact: "Bullish for Bitcoin price targets and crypto adoption markets",
      source: "Bloomberg",
      category: "Crypto"
    }
    // Add more news items as needed
  ];

  return category === 'all' ? allNews : allNews.filter(news => news.category === category);
};

// Mock AI responses
export const generateMockAIResponse = async (query, context = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('bitcoin') || lowerQuery.includes('crypto')) {
    return "Based on current market data, Bitcoin-related markets are showing mixed signals. The Bitcoin to reach $150k market is currently at 23% odds. Key factors include regulatory developments and institutional adoption trends.";
  }
  
  if (lowerQuery.includes('portfolio')) {
    return "Your portfolio analysis shows strong diversification across categories. Consider rebalancing based on recent market movements and upcoming resolution dates.";
  }
  
  // Default response
  return "I can help analyze prediction markets, portfolio performance, and trading strategies. Ask me about specific markets or trading advice!";
};

// Mock breaking news
export const getMockBreakingNews = () => {
  const breakingItems = [
    {
      headline: "🚨 BREAKING: Fed Emergency Meeting Called",
      impact: "Major rate cut markets moving rapidly",
      timestamp: new Date()
    },
    {
      headline: "🚨 BREAKING: Bitcoin Hits New All-Time High",
      impact: "Crypto prediction markets surging",
      timestamp: new Date()
    }
  ];
  
  // Return random breaking news or null
  return Math.random() < 0.3 ? breakingItems[Math.floor(Math.random() * breakingItems.length)] : null;
};

// Mock WebSocket simulation
export const startMockWebSocket = () => {
  return {
    subscribe: (callback) => {
      const interval = setInterval(() => {
        // Simulate market updates
        callback({
          type: 'market_update',
          data: {
            marketId: Math.floor(Math.random() * 8) + 1,
            odds: Math.random() * 100,
            change: (Math.random() - 0.5) * 10
          }
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  };
};

// Mock market details
export const getMockMarketDetails = (marketId) => {
  const markets = getMockMarkets();
  return markets.find(m => m.id === marketId) || null;
};

// Mock leaderboard
export const getMockLeaderboard = () => {
  return [
    { id: 1, name: "CryptoOracle", avatar: "🔮", totalPnL: 15420.50, winRate: 78.2, trades: 89, rank: 1 },
    { id: 2, name: "PoliticalProphet", avatar: "🏛️", totalPnL: 12890.25, winRate: 72.5, trades: 156, rank: 2 },
    { id: 3, name: "MarketMaven", avatar: "📈", totalPnL: 11560.80, winRate: 69.8, trades: 203, rank: 3 }
  ];
};

// Export utility functions
export const subscribeToMockUpdates = (marketId, callback) => {
  const interval = setInterval(() => {
    callback({
      marketId,
      odds: Math.random() * 100,
      change24h: (Math.random() - 0.5) * 10,
      timestamp: new Date()
    });
  }, 5000);
  
  return () => clearInterval(interval);
};
