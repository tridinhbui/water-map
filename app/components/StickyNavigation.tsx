'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeProvider'
import { NotificationCenter } from './NotificationCenter'

export default function StickyNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/premium', label: 'Premium' },
  ]

  return (
    <>
      {/* Desktop Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-gray-200/30 dark:border-gray-700/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className={`w-12 h-12 transition-all duration-300 group-hover:scale-110 ${
                isScrolled ? 'shadow-lg' : 'shadow-md'
              }`}>
                <img 
                  src="/safedrop-logo.png" 
                  alt="SafeDrop Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                SafeDrop
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                    pathname === item.href
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="notification-center">
                <NotificationCenter />
              </div>
              
              <div className="theme-toggle">
                <ThemeToggle />
              </div>
              
              <Link 
                href="/premium" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="hidden sm:inline">Upgrade to </span>Premium
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 slide-in-right">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Giao diện</span>
                  <ThemeToggle />
                </div>
                
                <Link 
                  href="/premium"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center block"
                >
                  ⚡ Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 min-w-[80px] ${
                pathname === item.href
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              {pathname === item.href && (
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 animate-pulse" />
              )}
            </Link>
          ))}
          
          {/* Settings/Theme in bottom bar */}
          <button className="flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 min-w-[80px]">
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Spacer for sticky header */}
      <div className="h-16" />
      
      {/* Spacer for mobile bottom bar */}
      <div className="md:hidden h-20" />
    </>
  )
} 