import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import StickyNavigation from './components/StickyNavigation'
import { OnboardingTutorial } from './components/NotificationCenter'

export const metadata: Metadata = {
  title: 'WaterSense - Water Quality Monitoring',
  description: 'Real-time water quality monitoring and analysis platform',
  keywords: 'water quality, monitoring, TDS, pH, turbidity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {/* Enhanced Sticky Navigation */}
            <StickyNavigation />

            {/* Main content */}
            <main className="flex-1 pt-4">
              {children}
            </main>

            {/* Enhanced Footer */}
            <footer className="bg-gray-900/80 dark:bg-black/50 text-white backdrop-blur-sm border-t border-gray-700/50 dark:border-gray-600/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">💧</span>
                      </div>
                      <span className="text-2xl font-bold text-white">WaterSense</span>
                    </div>
                    <p className="text-gray-300 dark:text-gray-400 mb-4 leading-relaxed">
                      Nền tảng giám sát chất lượng nước tiên tiến với AI, cung cấp dữ liệu thời gian thực và phân tích thông minh cho quản lý nước tốt hơn.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>10 Trạm hoạt động</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        <span>AI 24/7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Nền tảng</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li>
                        <Link href="/" className="flex items-center space-x-2 hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>🗺️</span>
                          <span>Heatmap</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/premium" className="flex items-center space-x-2 hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>⚡</span>
                          <span>Premium Features</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Hỗ trợ</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li>
                        <a href="#" className="flex items-center space-x-2 hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>📚</span>
                          <span>Tài liệu</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center space-x-2 hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>💬</span>
                          <span>Liên hệ</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center space-x-2 hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>🤖</span>
                          <span>AI Support</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-700/50 dark:border-gray-600/30 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-gray-400">
                  <p>&copy; 2024 WaterSense. All rights reserved. Made with 💧 in Vietnam.</p>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <span className="text-sm">Powered by AI</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </footer>

            {/* Onboarding Tutorial */}
            <OnboardingTutorial />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 