import Link from 'next/link'

export default function UpgradeBanner() {
  return (
    <div className="w-full fade-in-up">
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl overflow-hidden glow-on-hover group">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center floating-animation group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">⚡</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 gradient-text-white">Unlock Premium Features</h3>
              <p className="text-blue-100 text-lg">
                Get AI-powered analytics, forecasting, and real-time chat support
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-200">New AI Features Available!</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="text-center sm:text-right glass-card p-4 rounded-xl">
              <div className="text-sm text-blue-200 mb-1">Starting at</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">$29</div>
              <div className="text-sm text-blue-200">/month</div>
            </div>
            <Link 
              href="/premium"
              className="bg-white text-blue-600 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110 glow-on-hover"
            >
              🚀 Xem Bản Premium →
            </Link>
          </div>
        </div>
        
        {/* Features preview with modern styling */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 glass-card p-3 rounded-lg slide-in-right" style={{ animationDelay: '0.2s' }}>
              <span className="text-xl">🤖</span>
              <span className="text-blue-100 font-medium">AI-powered predictions</span>
            </div>
            <div className="flex items-center space-x-3 glass-card p-3 rounded-lg slide-in-right" style={{ animationDelay: '0.4s' }}>
              <span className="text-xl">💬</span>
              <span className="text-blue-100 font-medium">24/7 chat support</span>
            </div>
            <div className="flex items-center space-x-3 glass-card p-3 rounded-lg slide-in-right" style={{ animationDelay: '0.6s' }}>
              <span className="text-xl">📱</span>
              <span className="text-blue-100 font-medium">Device integration</span>
            </div>
          </div>
          
          {/* Additional premium features */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="text-center">
              <div className="text-green-300 text-lg mb-1">📊</div>
              <div className="text-blue-200">Advanced Analytics</div>
            </div>
            <div className="text-center">
              <div className="text-green-300 text-lg mb-1">🔮</div>
              <div className="text-blue-200">7-Day Forecasting</div>
            </div>
            <div className="text-center">
              <div className="text-green-300 text-lg mb-1">⚡</div>
              <div className="text-blue-200">Real-time Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-green-300 text-lg mb-1">🎯</div>
              <div className="text-blue-200">Custom Reports</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 