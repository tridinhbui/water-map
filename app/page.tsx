import Heatmap from './components/Heatmap'
import UpgradeBanner from './components/UpgradeBanner'
import EnhancedChatbot from './components/EnhancedChatbot'
import { NotificationCenter } from './components/NotificationCenter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400/50 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-400/60 rounded-full animate-bounce" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <div className="mb-6">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-sm font-medium px-4 py-2 rounded-full border border-white/20 slide-in-right">
                🌊 Next-Gen Water Quality Monitoring
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text-white floating-animation">
              Water Quality Monitoring 3D
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto">
              🤖 AI-powered real-time water quality tracking across Vietnam. Monitor TDS levels, 
              pH, and turbidity with our advanced 3D heatmap visualization and intelligent analytics.
            </p>
            
            {/* Live Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card p-6 rounded-xl text-center slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold gradient-text-white mb-2">10</div>
                <div className="text-blue-200">Active Monitoring Stations</div>
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center slide-in-right" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold gradient-text-white mb-2">24/7</div>
                <div className="text-blue-200">Real-time AI Analysis</div>
                <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center slide-in-right" style={{ animationDelay: '0.6s' }}>
                <div className="text-3xl font-bold gradient-text-white mb-2">98.7%</div>
                <div className="text-blue-200">Data Accuracy Rate</div>
                <div className="w-2 h-2 bg-purple-400 rounded-full mx-auto mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-16">
          {/* Heatmap Section */}
          <section id="heatmap" className="scroll-mt-20">
            <Heatmap />
          </section>

          {/* Enhanced AI Chatbot Section - Fullscreen */}
          <section className="fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text mb-4 floating-animation">
                🤖 Trò Chuyện Với AquaBot AI
              </h2>
              <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
                Hỏi AI bất cứ điều gì về chất lượng nước. AquaBot có thể phân tích heatmap, 
                dự báo xu hướng và đưa ra khuyến nghị thông minh cho bạn.
              </p>
            </div>
            <div className="enhanced-chatbot">
              <EnhancedChatbot isFullscreen={true} />
            </div>
          </section>

          {/* Upgrade Banner Section */}
          <section className="fade-in-up">
            <UpgradeBanner />
          </section>

          {/* Features Overview */}
          <section className="py-16 fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-6 floating-animation">
                🚀 Why Choose WaterSense AI?
              </h2>
              <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
                Our next-generation water quality monitoring platform provides AI-powered insights 
                and real-time analytics to help you make informed decisions about water safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card text-center p-8 hover:scale-105 transition-all duration-300 slide-in-right glow-on-hover" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 floating-animation">
                  <span className="text-3xl">🗺️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  3D Heatmap Visualization
                </h3>
                <p className="text-blue-100">
                  Experience immersive 3D water quality visualization across Vietnam with real-time data updates and interactive analytics
                </p>
              </div>

              <div className="glass-card text-center p-8 hover:scale-105 transition-all duration-300 slide-in-right glow-on-hover" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6 floating-animation" style={{ animationDelay: '1s' }}>
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  AI-Powered Analytics
                </h3>
                <p className="text-blue-100">
                  Advanced machine learning algorithms analyze TDS, pH, and turbidity patterns to predict water quality trends
                </p>
              </div>

              <div className="glass-card text-center p-8 hover:scale-105 transition-all duration-300 slide-in-right glow-on-hover" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 floating-animation" style={{ animationDelay: '2s' }}>
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Intelligent Alerts
                </h3>
                <p className="text-blue-100">
                  Receive proactive notifications with AI recommendations when water quality parameters exceed safe limits
                </p>
              </div>
            </div>
          </section>

          {/* Water Quality Information */}
          <section className="glass-card p-8 rounded-2xl fade-in-up">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center floating-animation">
              💧 Understanding Water Quality Parameters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl text-white">🔬</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">TDS (Total Dissolved Solids)</h3>
                </div>
                <p className="text-blue-100 mb-4 leading-relaxed">
                  Measures dissolved minerals and salts in water. Critical for taste and health safety assessment.
                </p>
                <div className="space-y-2 text-sm text-blue-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    <span>Excellent: 0-100 mg/L</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                    <span>Good: 100-150 mg/L</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <span>Moderate: 150-200 mg/L</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span>Poor: 200+ mg/L</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 slide-in-right" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl text-white">⚗️</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">pH Level</h3>
                </div>
                <p className="text-blue-100 mb-4 leading-relaxed">
                  Measures water acidity or alkalinity. Essential for corrosion control and taste optimization.
                </p>
                <div className="space-y-2 text-sm text-blue-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span>Acidic: Below 6.5</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    <span>Neutral: 6.5-7.5</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                    <span>Alkaline: 7.5-8.5</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                    <span>Too alkaline: Above 8.5</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 slide-in-right" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl text-white">💧</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Turbidity</h3>
                </div>
                <p className="text-blue-100 mb-4 leading-relaxed">
                  Measures water clarity and cloudiness. Indicates particle contamination and filtration effectiveness.
                </p>
                <div className="space-y-2 text-sm text-blue-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    <span>Clear: 0-2 NTU</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <span>Slightly cloudy: 2-5 NTU</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                    <span>Cloudy: 5-10 NTU</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span>Very cloudy: 10+ NTU</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 