'use client'

import Image from 'next/image'
import { regions, waterQualityLevels } from '@/lib/mockData'
import { useState, useEffect, useRef } from 'react'

export default function Heatmap() {
  const [hoveredRegion, setHoveredRegion] = useState<typeof regions[0] | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  // Enhanced position coordinates for regions on the heatmap
  const regionPositions = {
    'Hanoi': { x: 480, y: 200, intensity: 0.8 },
    'Ho Chi Minh City': { x: 520, y: 620, intensity: 0.9 },
    'Da Nang': { x: 630, y: 380, intensity: 0.6 },
    'Hai Phong': { x: 510, y: 240, intensity: 0.7 },
    'Can Tho': { x: 450, y: 400, intensity: 0.5 },
    'Bien Hoa': { x: 570, y: 640, intensity: 0.8 },
    'Hue': { x: 645, y: 430, intensity: 0.4 },
    'Nha Trang': { x: 675, y: 510, intensity: 0.6 },
    'Vung Tau': { x: 630, y: 680, intensity: 0.7 },
    'Thai Nguyen': { x: 510, y: 160, intensity: 0.3 }
  }

  // Color scale for heatmap (similar to the examples)
  const getColorFromIntensity = (intensity: number) => {
    // Create a color scale from green (low) to red (high)
    if (intensity <= 0.2) return '#22c55e' // Green
    if (intensity <= 0.4) return '#84cc16' // Light green
    if (intensity <= 0.6) return '#eab308' // Yellow
    if (intensity <= 0.8) return '#f97316' // Orange
    return '#ef4444' // Red
  }

  // Draw heatmap gradient overlay
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Create gradient overlay
    const imageData = ctx.createImageData(canvas.width, canvas.height)
    const data = imageData.data

    // Grid size for heatmap effect
    const gridSize = 20
    const cols = Math.ceil(canvas.width / gridSize)
    const rows = Math.ceil(canvas.height / gridSize)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize
        const y = row * gridSize

        // Calculate intensity based on proximity to data points
        let maxIntensity = 0
        let closestColor = '#22c55e'

        Object.values(regionPositions).forEach(region => {
          const regionX = (region.x / 1200) * canvas.width
          const regionY = (region.y / 800) * canvas.height
          const distance = Math.sqrt((x - regionX) ** 2 + (y - regionY) ** 2)
          const influence = Math.max(0, 1 - distance / 150) // Influence radius
          const intensity = region.intensity * influence
          
          if (intensity > maxIntensity) {
            maxIntensity = intensity
            closestColor = getColorFromIntensity(region.intensity)
          }
        })

        // Convert hex color to RGB
        const hex = closestColor.slice(1)
        const r = parseInt(hex.slice(0, 2), 16)
        const g = parseInt(hex.slice(2, 4), 16)
        const b = parseInt(hex.slice(4, 6), 16)

        // Draw grid cell
        for (let dy = 0; dy < gridSize && y + dy < canvas.height; dy++) {
          for (let dx = 0; dx < gridSize && x + dx < canvas.width; dx++) {
            const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4
            data[pixelIndex] = r
            data[pixelIndex + 1] = g
            data[pixelIndex + 2] = b
            data[pixelIndex + 3] = Math.min(255, maxIntensity * 100) // Alpha based on intensity
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return (
    <div className="w-full fade-in-up">
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold gradient-text mb-2 floating-animation">🌡️ Bản Đồ Nhiệt Chất Lượng Nước</h2>
        <p className="text-white/80 text-lg">Heatmap phân tích thời gian thực với gradient thông minh</p>
        <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">10 Trạm Hoạt Động</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">Interpolation AI</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">Gradient Realtime</span>
          </div>
        </div>
      </div>

      {/* Enhanced Heatmap Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl glow-on-hover group border border-white/10"
      >
        {/* Base map */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-10"></div>
        <Image 
          src="/heatmap.svg" 
          alt="Vietnam Water Quality Heatmap"
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-30"
          priority
        />
        
        {/* Heatmap Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 mix-blend-multiply opacity-60"
          style={{ mixBlendMode: 'screen' }}
        />
        
        {/* Grid Overlay Effect */}
        <div className="absolute inset-0 z-25 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
        
        {/* Enhanced Interactive Region Hotspots */}
        <div className="absolute inset-0 z-30" onMouseMove={handleMouseMove}>
          {regions.map((region) => {
            const position = regionPositions[region.name as keyof typeof regionPositions]
            if (!position) return null
            
            const intensity = position.intensity
            const color = getColorFromIntensity(intensity)
            
            return (
              <div
                key={region.name}
                className="absolute w-8 h-8 -translate-x-4 -translate-y-4 cursor-pointer transition-all duration-300 hover:scale-150 group"
                style={{
                  left: `${(position.x / 1200) * 100}%`,
                  top: `${(position.y / 800) * 100}%`,
                }}
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* Main hotspot */}
                <div className={`w-full h-full rounded-full border-2 border-white/90 transition-all duration-300 hover:shadow-xl shadow-lg ${
                  hoveredRegion?.name === region.name ? 'scale-125 shadow-2xl ring-4 ring-white/50' : ''
                }`}
                style={{ backgroundColor: color }}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: color }}>
                  </div>
                </div>
                
                {/* Heat influence circle */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20 scale-300 animate-pulse"
                  style={{ 
                    backgroundColor: color,
                    transform: 'scale(3)',
                    filter: 'blur(10px)'
                  }}
                />
                
                {/* Region name label */}
                <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                  hoveredRegion?.name === region.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap backdrop-blur-sm border border-white/20">
                    <div className="font-semibold">{region.name}</div>
                    <div className="text-xs text-white/70">Intensity: {(intensity * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Professional Color Scale Bar */}
        <div className="absolute top-4 right-4 glass-card rounded-xl p-4 shadow-xl border border-white/20">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center">
            <span className="mr-2">🌡️</span>
            Thang Đo Nhiệt
          </h3>
          
          {/* Color gradient bar */}
          <div className="relative">
            <div 
              className="w-6 h-32 rounded-lg border border-white/30 shadow-inner"
              style={{
                background: `linear-gradient(to top, 
                  #22c55e 0%, 
                  #84cc16 25%, 
                  #eab308 50%, 
                  #f97316 75%, 
                  #ef4444 100%)`
              }}
            />
            
            {/* Scale labels */}
            <div className="absolute -right-8 top-0 text-xs text-white/90">100%</div>
            <div className="absolute -right-6 top-6 text-xs text-white/90">80%</div>
            <div className="absolute -right-6 top-12 text-xs text-white/90">60%</div>
            <div className="absolute -right-6 top-18 text-xs text-white/90">40%</div>
            <div className="absolute -right-6 top-24 text-xs text-white/90">20%</div>
            <div className="absolute -right-4 bottom-0 text-xs text-white/90">0%</div>
          </div>
          
          <div className="mt-3 text-xs text-white/70 text-center">
            Mức độ rủi ro
          </div>
        </div>

        {/* Enhanced Legend */}
        <div className="absolute bottom-4 right-4 glass-card rounded-xl p-4 shadow-xl border border-white/20">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center">
            <span className="mr-2">📊</span>
            Phân Loại Chất Lượng
          </h3>
          <div className="space-y-2">
            {Object.entries(waterQualityLevels).map(([level, config]) => (
              <div key={level} className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-sm border border-white/30 shadow-sm"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs text-white/90 font-medium">{config.label}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-2 border-t border-white/20">
            <div className="text-xs text-white/60 text-center">
              💡 Hover để xem chi tiết
            </div>
          </div>
        </div>
        
        {/* Instruction overlay */}
        {!hoveredRegion && (
          <div className="absolute inset-0 flex items-center justify-center z-25 pointer-events-none">
            <div className="text-white/90 text-center fade-in-up">
              <div className="text-sm bg-black/40 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">🌡️</span>
                  <span className="font-semibold">Heatmap Thông Minh</span>
                </div>
                <div className="text-xs text-white/70">
                  Hover qua các điểm để xem gradient phân tích
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Quality Statistics with Heatmap Style */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6">
        {Object.entries(waterQualityLevels).map(([level, config], index) => {
          const count = regions.filter(r => r.level === level).length;
          const percentage = (count / regions.length * 100).toFixed(1);
          return (
            <div 
              key={level} 
              className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 slide-in-right border border-white/10"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, ${config.color}10, ${config.color}05)`
              }}
            >
              <div 
                className="w-8 h-8 rounded-lg mx-auto mb-3 border border-white/20"
                style={{ backgroundColor: config.color }}
              />
              <div className="text-3xl font-bold gradient-text mb-1">{count}</div>
              <div className="text-sm font-medium text-white/90">{config.label}</div>
              <div className="text-xs text-white/60 mt-1">{percentage}% tổng</div>
              
              {/* Mini heatmap indicator */}
              <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: config.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Detailed Tooltip */}
      {hoveredRegion && (
        <div 
          className="fixed z-50 pointer-events-none transition-all duration-200 ease-out"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 180,
            transform: mousePosition.x > window.innerWidth - 300 ? 'translateX(-100%) translateX(-30px)' : 'none'
          }}
        >
          <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 p-6 min-w-[320px] fade-in-up">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-6 h-6 rounded-lg border-2 border-white shadow-lg"
                style={{ backgroundColor: waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.color }}
              ></div>
              <h3 className="font-bold text-gray-900 text-lg">{hoveredRegion.name}</h3>
              <div className="ml-auto">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                  🌡️ Heatmap
                </span>
              </div>
            </div>
            
            {/* Intensity visualization */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Mức độ nhiệt:</span>
                <span className="font-bold text-gray-900">
                  {(regionPositions[hoveredRegion.name as keyof typeof regionPositions]?.intensity * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${regionPositions[hoveredRegion.name as keyof typeof regionPositions]?.intensity * 100}%`,
                    backgroundColor: getColorFromIntensity(regionPositions[hoveredRegion.name as keyof typeof regionPositions]?.intensity || 0)
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 flex items-center">
                  <span className="mr-2">🏷️</span>
                  Phân loại:
                </span>
                <span className="font-semibold text-gray-900 px-2 py-1 rounded-lg text-xs" 
                      style={{ 
                        backgroundColor: `${waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.color}20`,
                        color: waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.color
                      }}>
                  {waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.label}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-xs text-gray-600">🔬 TDS</div>
                  <div className="font-mono font-bold text-blue-600 text-sm">
                    {hoveredRegion.tds}
                  </div>
                  <div className="text-xs text-gray-500">mg/L</div>
                </div>
                
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600">⚗️ pH</div>
                  <div className="font-mono font-bold text-green-600 text-sm">
                    {hoveredRegion.pH}
                  </div>
                  <div className="text-xs text-gray-500">level</div>
                </div>
                
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <div className="text-xs text-gray-600">💧 Đục</div>
                  <div className="font-mono font-bold text-purple-600 text-sm">
                    {hoveredRegion.turbidity}
                  </div>
                  <div className="text-xs text-gray-500">NTU</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center flex items-center justify-center">
                <span className="mr-1">📡</span>
                Realtime • {new Date().toLocaleTimeString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Analytics Panel with Heatmap Integration */}
      <div className="mt-8 glass-card p-6 fade-in-up border border-white/10">
        <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
          🔮 Heatmap Analytics Dashboard
          <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl">
            <div className="text-2xl font-bold text-blue-400 mb-2">98.7%</div>
            <div className="text-sm text-white/80">Độ Chính Xác Gradient</div>
            <div className="text-xs text-white/60">AI Interpolation</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl">
            <div className="text-2xl font-bold text-green-400 mb-2">20px</div>
            <div className="text-sm text-white/80">Grid Resolution</div>
            <div className="text-xs text-white/60">Optimal sampling</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl">
            <div className="text-2xl font-bold text-purple-400 mb-2">150px</div>
            <div className="text-sm text-white/80">Influence Radius</div>
            <div className="text-xs text-white/60">Heat propagation</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl">
            <div className="text-2xl font-bold text-orange-400 mb-2">5 màu</div>
            <div className="text-sm text-white/80">Color Scale Range</div>
            <div className="text-xs text-white/60">Green to Red</div>
          </div>
        </div>
      </div>
    </div>
  )
} 