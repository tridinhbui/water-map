import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import StickyNavigation from './components/StickyNavigation'
import { OnboardingTutorial } from './components/NotificationCenter'

export const metadata: Metadata = {
  title: 'SafeDrop - Water Quality Monitoring',
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
                      <div className="w-12 h-12">
                        <img 
                          src="/safedrop-logo.png" 
                          alt="SafeDrop Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-2xl font-bold text-white">SafeDrop</span>
                    </div>
                    <p className="text-gray-300 dark:text-gray-400 mb-4 leading-relaxed">
                      Advanced AI-powered water quality monitoring platform providing real-time data and intelligent analytics for better water management.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>10 Active Stations</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        <span>AI 24/7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li>
                        <Link href="/" className="hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>Heatmap</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/premium" className="hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>Premium Features</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>Documentation</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1">
                          <span>Contact</span>
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
                  <p>&copy; 2024 SafeDrop. All rights reserved. Made in Vietnam.</p>
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