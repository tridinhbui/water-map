import ChatbotMock from '../components/ChatbotMock'
import ForecastChart from '../components/ForecastChart'
import RegionTable from '../components/RegionTable'
import DeviceInput from '../components/DeviceInput'

export default function PremiumPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-3xl">⚡</span>
              <h1 className="text-4xl font-bold">Premium Dashboard</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Advanced water quality analytics, AI-powered forecasting, and real-time support 
              to help you make data-driven decisions about water safety.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-300">✓</span>
                <span>7-Day Forecasting</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">✓</span>
                <span>AI Chat Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">✓</span>
                <span>Device Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-300">✓</span>
                <span>Advanced Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Forecast Chart Section */}
          <section>
            <ForecastChart />
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Device Input */}
            <section>
              <DeviceInput />
            </section>

            {/* Premium Features Info */}
            <section className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Features</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">📈</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI-Powered Forecasting</h4>
                    <p className="text-sm text-gray-600">
                      Get 7-day water quality predictions using advanced machine learning algorithms
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">💬</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">24/7 Chat Support</h4>
                    <p className="text-sm text-gray-600">
                      Ask our AI assistant about water quality parameters and get instant answers
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">📱</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Device Integration</h4>
                    <p className="text-sm text-gray-600">
                      Connect your TDS meters and other devices for automatic data collection
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">🚨</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Smart Alerts</h4>
                    <p className="text-sm text-gray-600">
                      Receive notifications when water quality parameters exceed safe limits
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Your Premium Plan</div>
                  <div className="text-2xl font-bold text-gray-900">$29/month</div>
                  <div className="text-sm text-green-600 mt-1">✓ Active</div>
                </div>
              </div>
            </section>
          </div>

          {/* Regional Data Table */}
          <section>
            <RegionTable />
          </section>

          {/* Additional Premium Analytics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98.2%</div>
              <div className="text-sm text-gray-600 mb-1">Data Accuracy</div>
              <div className="text-xs text-gray-500">Based on validated sensors</div>
            </div>

            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">&lt; 1min</div>
              <div className="text-sm text-gray-600 mb-1">Update Frequency</div>
              <div className="text-xs text-gray-500">Real-time monitoring</div>
            </div>

            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 mb-1">Support</div>
              <div className="text-xs text-gray-500">AI-powered assistance</div>
            </div>
          </section>

          {/* Export and API Access */}
          <section className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export & API Access</h3>
            <p className="text-gray-600 mb-6">
              Premium users get access to data export functionality and our REST API for integration 
              with your existing systems.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="btn-secondary">
                📊 Export CSV
              </button>
              <button className="btn-secondary">
                📋 Export PDF Report
              </button>
              <button className="btn-secondary">
                🔌 API Documentation
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Chat Assistant */}
      <ChatbotMock />
    </div>
  )
} 