'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  primaryColor: string
  setPrimaryColor: (color: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const colors = {
  blue: { 
    name: 'Xanh Biển', 
    primary: 'from-blue-500 to-cyan-500',
    css: '--primary-50: 239 246 255; --primary-100: 219 234 254; --primary-500: 59 130 246; --primary-600: 37 99 235; --primary-700: 29 78 216;' 
  },
  green: { 
    name: 'Xanh Lá', 
    primary: 'from-green-500 to-emerald-500',
    css: '--primary-50: 240 253 244; --primary-100: 220 252 231; --primary-500: 34 197 94; --primary-600: 22 163 74; --primary-700: 21 128 61;' 
  },
  purple: { 
    name: 'Tím', 
    primary: 'from-purple-500 to-indigo-500',
    css: '--primary-50: 250 245 255; --primary-100: 243 232 255; --primary-500: 147 51 234; --primary-600: 124 58 237; --primary-700: 109 40 217;' 
  },
  orange: { 
    name: 'Cam', 
    primary: 'from-orange-500 to-red-500',
    css: '--primary-50: 255 247 237; --primary-100: 255 237 213; --primary-500: 249 115 22; --primary-600: 234 88 12; --primary-700: 194 65 12;' 
  },
  pink: { 
    name: 'Hồng', 
    primary: 'from-pink-500 to-rose-500',
    css: '--primary-50: 253 242 248; --primary-100: 252 231 243; --primary-500: 236 72 153; --primary-600: 219 39 119; --primary-700: 190 24 93;' 
  },
  cyan: { 
    name: 'Xanh Ngọc', 
    primary: 'from-cyan-500 to-teal-500',
    css: '--primary-50: 236 254 255; --primary-100: 207 250 254; --primary-500: 6 182 212; --primary-600: 8 145 178; --primary-700: 14 116 144;' 
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark')
  const [primaryColor, setPrimaryColor] = useState('blue')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load saved theme and color
    const savedTheme = localStorage.getItem('watersense-theme') as Theme || 'system'
    const savedColor = localStorage.getItem('watersense-color') || 'blue'
    
    setTheme(savedTheme)
    setPrimaryColor(savedColor)
    
    // Apply color CSS variables
    const colorConfig = colors[savedColor as keyof typeof colors]
    if (colorConfig) {
      const style = document.createElement('style')
      style.textContent = `:root { ${colorConfig.css} }`
      document.head.appendChild(style)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    
    const updateTheme = () => {
      let newResolvedTheme: ResolvedTheme
      
      if (theme === 'system') {
        newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } else {
        newResolvedTheme = theme as ResolvedTheme
      }
      
      setResolvedTheme(newResolvedTheme)
      
      if (newResolvedTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      localStorage.setItem('watersense-theme', theme)
    }

    updateTheme()

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', updateTheme)
      return () => mediaQuery.removeEventListener('change', updateTheme)
    }
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return
    
    // Update CSS variables when color changes
    const colorConfig = colors[primaryColor as keyof typeof colors]
    if (colorConfig) {
      const existingStyles = document.querySelectorAll('style[data-theme-colors]')
      existingStyles.forEach(style => style.remove())
      
      const style = document.createElement('style')
      style.setAttribute('data-theme-colors', 'true')
      style.textContent = `:root { ${colorConfig.css} }`
      document.head.appendChild(style)
    }
    
    localStorage.setItem('watersense-color', primaryColor)
  }, [primaryColor, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    // Return default values during SSR
    return {
      theme: 'system' as Theme,
      resolvedTheme: 'dark' as ResolvedTheme,
      setTheme: () => {},
      primaryColor: 'blue',
      setPrimaryColor: () => {}
    }
  }
  return context
}

// Theme Toggle Component
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, primaryColor, setPrimaryColor } = useTheme()
  const [showColorPicker, setShowColorPicker] = useState(false)

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const getThemeIcon = () => {
    if (theme === 'light') return '☀️'
    if (theme === 'dark') return '🌙'
    return '🔄'
  }

  const getThemeLabel = () => {
    if (theme === 'light') return 'Sáng'
    if (theme === 'dark') return 'Tối'
    return 'Tự động'
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 dark:bg-gray-800/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/20 dark:border-gray-600/50 hover:scale-105 active:scale-95 backdrop-blur-sm"
          title={`Chế độ: ${getThemeLabel()}`}
        >
          <span className="text-lg">{getThemeIcon()}</span>
          <span className="text-sm font-medium text-white dark:text-gray-200 hidden sm:block">
            {getThemeLabel()}
          </span>
        </button>

        {/* Color Picker Toggle */}
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 rounded-xl bg-white/10 dark:bg-gray-800/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/20 dark:border-gray-600/50 hover:scale-105 active:scale-95 backdrop-blur-sm"
          title="Chọn màu chủ đạo"
        >
          <span className="text-lg">🎨</span>
        </button>
      </div>

      {/* Color Picker Dropdown */}
      {showColorPicker && (
        <div className="absolute top-full right-0 mt-2 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 z-50 min-w-[280px] fade-in-up">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
            🎨 Chọn Màu Chủ Đạo
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(colors).map(([key, color]) => (
              <button
                key={key}
                onClick={() => {
                  setPrimaryColor(key)
                  setShowColorPicker(false)
                }}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  primaryColor === key 
                    ? 'bg-gray-100 dark:bg-gray-700 border-2 border-blue-500 dark:border-blue-400' 
                    : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color.primary} shadow-md`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {color.name}
                </span>
                {primaryColor === key && (
                  <span className="text-blue-500 dark:text-blue-400 ml-auto">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center">
              💡 <span className="ml-1">Màu sắc sẽ áp dụng cho toàn bộ giao diện</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Loading Skeleton Component
export function LoadingSkeleton({ className = "", lines = 3 }: { className?: string, lines?: number }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={`bg-gray-200 dark:bg-gray-700 rounded-lg h-4 mb-3 ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`} 
        />
      ))}
    </div>
  )
}

// Enhanced Card with skeleton loading
export function SkeletonCard({ isLoading, children, className = "" }: { 
  isLoading: boolean, 
  children: ReactNode, 
  className?: string 
}) {
  if (isLoading) {
    return (
      <div className={`bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 dark:border-gray-700/50 p-6 ${className}`}>
        <LoadingSkeleton lines={4} />
      </div>
    )
  }

  return (
    <div className={`bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 dark:border-gray-700/50 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
} 