import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import PaperTrading from './components/Trading/PaperTrading';
import AIAssistant from './components/AIAssistant/AIAssistant';
import NewsFeed from './components/News/NewsFeed';
import MarketMaker from './components/MarketMaker/MarketMaker';
import { BarChart2, BrainCircuit, Newspaper, TrendingUp, Plus } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [portfolio, setPortfolio] = useState({
    balance: 10000,
    positions: [],
    history: []
  });

  const tabs = [
    { id: 'dashboard', label: 'Markets', icon: BarChart2 },
    { id: 'trading', label: 'Paper Trading', icon: TrendingUp },
    { id: 'ai', label: 'AI Assistant', icon: BrainCircuit },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'maker', label: 'Market Maker', icon: Plus }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-green-400">
              Polymarket Intelligence Hub
            </h1>
            <div className="text-sm text-gray-400">
              Mode: {process.env.REACT_APP_MODE === 'real' ? 'Live APIs' : 'Mock Data'}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 font-medium transition-colors
                    ${activeTab === tab.id
                      ? 'text-green-400 border-b-2 border-green-400 bg-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'trading' && (
          <PaperTrading portfolio={portfolio} setPortfolio={setPortfolio} />
        )}
        {activeTab === 'ai' && <AIAssistant portfolio={portfolio} />}
        {activeTab === 'news' && <NewsFeed />}
        {activeTab === 'maker' && <MarketMaker />}
      </main>
    </div>
  );
}

export default App;