import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

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
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">💧</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">WaterSense</span>
                  </Link>
                </div>
                
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Heatmap
                  </Link>
                  <Link href="/premium" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Premium
                  </Link>
                </nav>

                <div className="flex items-center space-x-4">
                  <Link 
                    href="/premium" 
                    className="btn-primary text-sm"
                  >
                    Upgrade to Premium
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">💧</span>
                    </div>
                    <span className="text-xl font-bold">WaterSense</span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Advanced water quality monitoring platform providing real-time data and insights for better water management.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Platform</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><Link href="/" className="hover:text-white transition-colors">Heatmap</Link></li>
                    <li><Link href="/premium" className="hover:text-white transition-colors">Premium Features</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
                <p>&copy; 2024 WaterSense. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 