# 🎯 Polymarket Intelligence Hub

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Mode](https://img.shields.io/badge/Mode-Mock%20%2B%20Real%20APIs-orange.svg)](#api-modes)

Professional-grade prediction market intelligence platform with advanced trading tools, AI-powered insights, and real-time market analysis.

## ✨ Features

### 🎯 Core Platform
- **Real-time Market Data** - Live odds updates every 5 seconds
- **Advanced Search & Filtering** - Filter by volume, odds, timeframe, categories
- **Interactive Charts** - Professional price history visualization
- **Responsive Design** - Bloomberg Terminal-style dark theme

### 💰 Paper Trading
- **Portfolio Simulation** - $10,000 starting balance
- **Real-time P&L Tracking** - Live profit/loss calculations
- **Position Management** - Open/close trades with one click
- **Trading History** - Complete transaction logs

### 🤖 AI Assistant
- **Contextual Analysis** - Smart market insights based on your queries
- **Portfolio Reviews** - AI-powered performance analysis
- **Strategy Guidance** - Trading recommendations and risk management
- **Market Explanations** - Complex market dynamics simplified

### 📰 News Integration
- **Breaking News Alerts** - Real-time market-moving notifications
- **Sentiment Analysis** - Bullish/bearish news classification
- **Market Correlation** - News linked to affected prediction markets
- **Professional Sources** - Reuters, Bloomberg, TechCrunch integration

### 🏗️ Market Maker
- **Custom Market Creation** - Design your own prediction markets
- **Professional Tools** - Resolution criteria, odds setting, timeframes
- **Full Integration** - Created markets work with all platform features
- **Market Guidelines** - Best practices and examples included

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/johnautomates117/polymarket-intelligence-hub.git
cd polymarket-intelligence-hub

# Install dependencies
npm install

# Start in mock mode (default)
npm run dev

# Or start with real APIs
npm run dev:real
```

## 🔧 API Modes

The platform supports two modes:

### 📊 Mock Mode (Default)
Perfect for development and testing:
```bash
npm run dev          # Start in mock mode
npm run build:mock   # Build mock version
```

**Features:**
- ✅ Simulated real-time data
- ✅ AI responses with pre-written contextual content
- ✅ Mock breaking news alerts
- ✅ Full trading simulation
- ✅ No API keys required

### 🌐 Real API Mode
For production with live data:
```bash
npm run dev:real           # Start with real APIs
npm run build:production   # Build production version
```

**Requires API Keys:**
- OpenAI API for AI Assistant
- News API for breaking news
- Polymarket API for market data

## ⚙️ Configuration

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Configure your mode:
```bash
# For mock mode (default)
REACT_APP_MODE=mock

# For real APIs
REACT_APP_MODE=real
REACT_APP_OPENAI_API_KEY=your_key_here
REACT_APP_NEWS_API_KEY=your_key_here
REACT_APP_POLYMARKET_API_KEY=your_key_here
```

### API Integration Points

The platform is designed for easy API integration:

```javascript
// src/services/apiService.js
const isMockMode = process.env.REACT_APP_MODE === 'mock';

// AI Assistant
const aiResponse = isMockMode 
  ? generateMockAIResponse(query)
  : await callOpenAIAPI(query);

// News Feed  
const news = isMockMode
  ? getMockNews()
  : await fetchRealNews();

// Market Data
const markets = isMockMode
  ? generateMockMarkets()
  : await fetchPolymarketData();
```

## 📁 Project Structure

```
polymarket-intelligence-hub/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Trading/
│   │   ├── AIAssistant/
│   │   ├── News/
│   │   └── MarketMaker/
│   ├── services/
│   │   ├── apiService.js      # Mock/Real API switching
│   │   ├── mockData.js        # Simulated data
│   │   └── realAPIs.js        # Production API calls
│   ├── utils/
│   │   ├── calculations.js    # P&L and trading math
│   │   └── constants.js       # App configuration
│   ├── hooks/
│   │   ├── useMarketData.js   # Market data management
│   │   └── usePaperTrading.js # Trading logic
│   ├── App.js                 # Main component
│   └── index.js               # Entry point
├── .env.example               # Environment template
├── package.json
└── README.md
```

## 🎨 Key Components

### Dashboard
- Market browsing and filtering
- Category-based navigation
- Real-time updates
- Watchlist management

### Paper Trading
- Portfolio simulation
- Real-time P&L tracking
- Professional trading interface
- Risk management tools

### AI Assistant
- Contextual market analysis
- Portfolio performance reviews
- Trading strategy recommendations
- Market explanation capabilities

### News Integration
- Breaking news alerts
- Market impact analysis
- Sentiment classification
- Professional news sources

### Market Maker
- Custom market creation
- Resolution criteria definition
- Odds setting and timeframes
- Full platform integration

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start in mock mode
npm run dev:real         # Start with real APIs
npm start               # Standard React start

# Building
npm run build:mock      # Build mock version
npm run build:production # Build with real APIs
npm run build           # Standard React build

# Testing
npm test                # Run tests
npm run test:coverage   # Run with coverage
```

### Adding New Features

1. **Mock Implementation First**: Create mock version in `src/services/mockData.js`
2. **Real API Integration**: Add real API calls in `src/services/realAPIs.js`
3. **API Service**: Update `src/services/apiService.js` to handle both modes
4. **Component Integration**: Use the unified API service in components

## 📊 Mock Data Features

The mock mode provides realistic simulation of:

- **Market Data**: 8 diverse prediction markets with realistic odds
- **Real-time Updates**: Simulated price movements every 5 seconds
- **News Alerts**: Contextual breaking news every 15 seconds
- **AI Responses**: Smart contextual analysis based on query patterns
- **Trading Simulation**: Full portfolio management with accurate P&L

## 🌐 Real API Integration

Ready for integration with:

- **Polymarket API**: Live prediction market data
- **OpenAI GPT-4**: Real AI assistant capabilities
- **News APIs**: Reuters, Bloomberg, NewsAPI integration
- **WebSocket Support**: Real-time data streaming
- **Rate Limiting**: Built-in API call management

## 🎯 Use Cases

### Development & Testing
- **Mock Mode**: Perfect for development, demos, and testing
- **No API Costs**: Test all features without spending on API calls
- **Reliable Data**: Consistent mock data for predictable testing

### Production Deployment
- **Real API Mode**: Switch to live data with environment variables
- **Scalable Architecture**: Ready for production traffic
- **Professional Features**: All functionality works with real data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Test in both mock and real modes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Polymarket** - Inspiration for prediction market design
- **Bloomberg Terminal** - UI/UX design inspiration
- **Recharts** - Beautiful React chart library
- **Lucide Icons** - Clean and modern iconography
- **Tailwind CSS** - Utility-first CSS framework

---

## 🎯 Demo

**Live Demo**: [https://polymarket-intelligence-hub.vercel.app](https://polymarket-intelligence-hub.vercel.app)

**Mock Mode Features**:
- ✅ Browse 8 realistic prediction markets
- ✅ Execute paper trades with $10,000 virtual balance
- ✅ Chat with AI assistant about markets and strategies
- ✅ Receive breaking news alerts
- ✅ Create custom prediction markets
- ✅ Use advanced filtering and analysis tools

**Production Ready**:
- 🔄 Easy API integration with environment variables
- 🔒 Secure API key management
- 📈 Professional-grade trading interface
- 🎨 Bloomberg Terminal-inspired design
- 📱 Fully responsive mobile support

---

Built with ❤️ for the prediction markets community
