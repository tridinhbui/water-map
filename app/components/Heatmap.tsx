'use client'

import Image from 'next/image'
import { regions, waterQualityLevels } from '@/lib/mockData'
import { useState, useEffect, useRef } from 'react'

export default function Heatmap() {
  const [hoveredZone, setHoveredZone] = useState<{region: typeof regions[0], intensity: number, color: string} | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isCanvasReady, setIsCanvasReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x: e.clientX, y: e.clientY })
    
    // Detect which zone the mouse is over
    const canvas = canvasRef.current
    if (!canvas) return
    
    const normalizedX = (x / rect.width) * 1200
    const normalizedY = (y / rect.height) * 800
    
    // Find the closest region and calculate its properties
    let closestRegion = null
    let minDistance = Infinity
    let zoneIntensity = 0
    let zoneColor = '#22c55e'
    
    Object.entries(heatZones).forEach(([regionName, zone]) => {
      const region = regions.find(r => r.name === regionName)
      if (!region) return
      
      const distance = Math.sqrt(
        (normalizedX - zone.centerX) ** 2 + (normalizedY - zone.centerY) ** 2
      )
      
      if (distance < zone.radius && distance < minDistance) {
        minDistance = distance
        closestRegion = region
        zoneIntensity = zone.intensity
        zoneColor = getColorFromIntensity(zone.intensity)
      }
    })
    
    if (closestRegion) {
      setHoveredZone({
        region: closestRegion,
        intensity: zoneIntensity,
        color: zoneColor
      })
    } else {
      setHoveredZone(null)
    }
  }

  // Enhanced heat zones với colors nổi bật hơn
  const heatZones = {
    'Hanoi': { centerX: 480, centerY: 200, radius: 120, intensity: 0.9, spread: 1.0 },
    'Ho Chi Minh City': { centerX: 520, centerY: 620, radius: 150, intensity: 1.0, spread: 1.2 },
    'Da Nang': { centerX: 630, centerY: 380, radius: 100, intensity: 0.7, spread: 0.9 },
    'Hai Phong': { centerX: 510, centerY: 240, radius: 90, intensity: 0.8, spread: 0.8 },
    'Can Tho': { centerX: 450, centerY: 400, radius: 110, intensity: 0.6, spread: 1.0 },
    'Bien Hoa': { centerX: 570, centerY: 640, radius: 80, intensity: 0.9, spread: 0.7 },
    'Hue': { centerX: 645, centerY: 430, radius: 85, intensity: 0.5, spread: 0.8 },
    'Nha Trang': { centerX: 675, centerY: 510, radius: 95, intensity: 0.7, spread: 0.9 },
    'Vung Tau': { centerX: 630, centerY: 680, radius: 75, intensity: 0.8, spread: 0.7 },
    'Thai Nguyen': { centerX: 510, centerY: 160, radius: 80, intensity: 0.4, spread: 0.8 }
  }

  // Colors siêu nổi bật và dễ phân biệt
  const getColorFromIntensity = (intensity: number) => {
    if (intensity <= 0.2) return '#00ff00' // Bright Green
    if (intensity <= 0.4) return '#80ff00' // Lime Green  
    if (intensity <= 0.6) return '#ffff00' // Bright Yellow
    if (intensity <= 0.8) return '#ff8000' // Bright Orange
    return '#ff0000' // Bright Red
  }

  // Enhanced color interpolation
  const interpolateColor = (colors: string[], weights: number[]) => {
    let totalWeight = weights.reduce((sum, w) => sum + w, 0)
    if (totalWeight === 0) return { r: 0, g: 0, b: 0, a: 0 }

    let r = 0, g = 0, b = 0, a = 0

    colors.forEach((color, i) => {
      const weight = weights[i] / totalWeight
      const hex = color.slice(1)
      r += parseInt(hex.slice(0, 2), 16) * weight
      g += parseInt(hex.slice(2, 4), 16) * weight
      b += parseInt(hex.slice(4, 6), 16) * weight
      a += weight
    })

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      a: Math.min(1, a)
    }
  }

  // Enhanced falloff function
  const calculateInfluence = (distance: number, radius: number, spread: number) => {
    if (distance >= radius) return 0
    
    const normalizedDistance = distance / radius
    const falloff = Math.pow(Math.cos(normalizedDistance * Math.PI / 2), 1.5 / spread)
    
    return Math.max(0, falloff)
  }

  // Enhanced heatmap rendering với high contrast
  useEffect(() => {
    const renderHeatmap = () => {
      const canvas = canvasRef.current
      const overlayCanvas = overlayCanvasRef.current
      const container = containerRef.current
      if (!canvas || !overlayCanvas || !container) return

      const ctx = canvas.getContext('2d')
      const overlayCtx = overlayCanvas.getContext('2d')
      if (!ctx || !overlayCtx) return

      try {
        const rect = container.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        
        // Set canvas size
        canvas.width = width
        canvas.height = height
        overlayCanvas.width = width
        overlayCanvas.height = height
        
        // Set CSS size
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
        overlayCanvas.style.width = `${rect.width}px`
        overlayCanvas.style.height = `${rect.height}px`

        // Clear canvases
        ctx.clearRect(0, 0, width, height)
        overlayCtx.clearRect(0, 0, width, height)

        // Main heatmap rendering với enhanced visibility
        const imageData = ctx.createImageData(width, height)
        const data = imageData.data

        // Process each pixel với better algorithm
        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width; x += 1) {
            const normalizedX = (x / width) * 1200
            const normalizedY = (y / height) * 800
            
            const colors: string[] = []
            const weights: number[] = []
            let maxIntensity = 0

            // Calculate influence from all zones
            Object.values(heatZones).forEach(zone => {
              const distance = Math.sqrt(
                (normalizedX - zone.centerX) ** 2 + (normalizedY - zone.centerY) ** 2
              )
              
              const influence = calculateInfluence(distance, zone.radius, zone.spread)
              
              if (influence > 0.05) { // Higher threshold cho crisp edges
                const color = getColorFromIntensity(zone.intensity)
                const weight = influence * zone.intensity
                
                colors.push(color)
                weights.push(weight)
                maxIntensity = Math.max(maxIntensity, weight)
              }
            })

            // Blend colors với enhanced opacity
            const blendedColor = interpolateColor(colors, weights)
            const pixelIndex = (y * width + x) * 4
            
            if (blendedColor.a > 0 && maxIntensity > 0.1) {
              // High contrast opacity
              const opacity = Math.min(255, Math.pow(maxIntensity, 0.5) * 220)
              
              data[pixelIndex] = blendedColor.r
              data[pixelIndex + 1] = blendedColor.g
              data[pixelIndex + 2] = blendedColor.b
              data[pixelIndex + 3] = opacity
            }
          }
        }

        ctx.putImageData(imageData, 0, 0)
        setIsCanvasReady(true)

        // Enhanced overlay effects với visible borders
        overlayCtx.globalCompositeOperation = 'source-over'
        
        // Add crisp zone borders
        Object.values(heatZones).forEach(zone => {
          const centerX = (zone.centerX / 1200) * rect.width
          const centerY = (zone.centerY / 800) * rect.height
          const radius = (zone.radius / 1200) * rect.width
          
          // Outer border ring
          overlayCtx.strokeStyle = `${getColorFromIntensity(zone.intensity)}80`
          overlayCtx.lineWidth = 3
          overlayCtx.beginPath()
          overlayCtx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2)
          overlayCtx.stroke()
          
          // Inner glow
          const gradient = overlayCtx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius * 0.5
          )
          
          const color = getColorFromIntensity(zone.intensity)
          gradient.addColorStop(0, `${color}40`)
          gradient.addColorStop(1, `${color}00`)
          
          overlayCtx.fillStyle = gradient
          overlayCtx.beginPath()
          overlayCtx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2)
          overlayCtx.fill()
        })

      } catch (error) {
        console.error('Error rendering heatmap:', error)
        setIsCanvasReady(false)
      }
    }

    const timer = setTimeout(renderHeatmap, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full fade-in-up">
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold gradient-text mb-2 floating-animation">🌡️ Bản Đồ Nhiệt</h2>
        <p className="text-white/80 text-lg">Heatmap chất lượng nước các vùng</p>
        <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">5 Colors</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">10 Zones</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">Real-time</span>
          </div>
        </div>
      </div>

      {/* Heatmap Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl glow-on-hover group border-2 border-white/20 bg-slate-900"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredZone(null)}
      >
        {/* Base Vietnam Map */}
        <div className="absolute inset-0 z-10">
          <Image 
            src="/heatmap.svg" 
            alt="Vietnam Water Quality Heatmap"
            fill 
            className="object-contain transition-transform duration-700 group-hover:scale-105 opacity-90 brightness-125 contrast-150"
            priority
            onError={() => console.log('Image failed to load')}
          />
        </div>
        
        {/* Heat Zones Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 opacity-85"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Overlay Canvas */}
        <canvas
          ref={overlayCanvasRef}
          className="absolute inset-0 z-25 opacity-90"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Zone Labels */}
        <div className="absolute inset-0 z-35 pointer-events-none">
          {Object.entries(heatZones).map(([regionName, zone]) => {
            const region = regions.find(r => r.name === regionName)
            if (!region) return null
            
            return (
              <div
                key={regionName}
                className="absolute transition-all duration-300"
                style={{
                  left: `${(zone.centerX / 1200) * 100}%`,
                  top: `${(zone.centerY / 800) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`transition-all duration-300 ${
                  hoveredZone?.region.name === regionName ? 'opacity-100 scale-130' : 'opacity-90 hover:opacity-100'
                }`}>
                  <div 
                    className="text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm border-2 shadow-xl font-semibold"
                    style={{
                      backgroundColor: `${getColorFromIntensity(zone.intensity)}15`,
                      borderColor: getColorFromIntensity(zone.intensity),
                      boxShadow: `0 0 8px ${getColorFromIntensity(zone.intensity)}40`
                    }}
                  >
                    <div className="text-center text-sm font-bold">{regionName}</div>
                    <div className="text-xs text-center mt-1 opacity-80">
                      {(zone.intensity * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Compact Color Scale */}
        <div className="absolute top-4 right-4 rounded-lg p-3 shadow-xl border-2 border-white/30 z-40"
             style={{ background: 'rgba(0,0,0,0.8)' }}>
          <h3 className="text-xs font-bold text-white mb-2 flex items-center">
            <span className="mr-1">🌡️</span>
            Thang Màu
          </h3>
          
          <div className="relative">
            <div 
              className="w-6 h-32 rounded border-2 border-white shadow-lg"
              style={{
                background: `linear-gradient(to top, 
                  #00ff00 0%,
                  #80ff00 25%,
                  #ffff00 50%,
                  #ff8000 75%,
                  #ff0000 100%)`,
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
              }}
            />
            
            <div className="absolute -right-8 top-0 text-xs text-white">Cao</div>
            <div className="absolute -right-8 bottom-0 text-xs text-white">Thấp</div>
          </div>
          
          <div className="mt-2 text-xs text-white text-center">
            {isCanvasReady ? '✅' : '🔄'}
          </div>
        </div>

        {/* Compact Legend */}
        <div className="absolute bottom-4 right-4 rounded-lg p-3 shadow-xl border-2 border-white/30 z-40"
             style={{ background: 'rgba(0,0,0,0.8)' }}>
          <h3 className="text-xs font-bold text-white mb-2 flex items-center">
            <span className="mr-1">🗺️</span>
            Mức Độ
          </h3>
          <div className="space-y-2">
            {Object.entries(waterQualityLevels).map(([level, config]) => (
              <div key={level} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-3 rounded border border-white shadow-sm"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs text-white font-medium">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Loading */}
        {!isCanvasReady && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold">
              🔄 Đang tải...
            </div>
          </div>
        )}
        
        {/* Instruction */}
        {!hoveredZone && isCanvasReady && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <div className="text-white text-center fade-in-up">
              <div className="text-base bg-black/60 backdrop-blur-md rounded-xl px-6 py-4 border-2 border-white/40 shadow-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🌡️</span>
                  <span className="font-bold">Heatmap Chất Lượng Nước</span>
                </div>
                <div className="text-sm space-y-1">
                  <div>• Di chuyển chuột để xem chi tiết</div>
                  <div>• Màu đỏ = rủi ro cao</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compact Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(waterQualityLevels).map(([level, config], index) => {
          const count = regions.filter(r => r.level === level).length;
          const percentage = (count / regions.length * 100).toFixed(1);
          return (
            <div 
              key={level} 
              className="p-4 text-center hover:scale-105 transition-all duration-300 slide-in-right border-2 shadow-xl rounded-xl"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, ${config.color}25, ${config.color}10)`,
                borderColor: `${config.color}60`,
                boxShadow: `0 8px 30px ${config.color}25`
              }}
            >
              <div className="relative mb-3">
                <div 
                  className="w-10 h-6 rounded-lg mx-auto border-2 border-white"
                  style={{ 
                    background: `linear-gradient(45deg, ${config.color}, ${config.color}cc)`,
                    boxShadow: `0 0 10px ${config.color}50`
                  }}
                />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">{count}</div>
              <div className="text-sm font-semibold text-white mb-1">{config.label}</div>
              <div className="text-xs text-white/70 mb-2">{percentage}%</div>
              
              <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden border border-white/30">
                <div 
                  className="h-full rounded-full transition-all duration-1500 ease-out"
                  style={{ 
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${config.color}, ${config.color}dd)`,
                    boxShadow: `inset 0 1px 2px rgba(255,255,255,0.3), 0 0 8px ${config.color}50`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact Tooltip */}
      {hoveredZone && (
        <div 
          className="fixed z-50 pointer-events-none transition-all duration-200 ease-out"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 180,
            transform: mousePosition.x > window.innerWidth - 350 ? 'translateX(-100%) translateX(-30px)' : 'none'
          }}
        >
          <div className="rounded-2xl shadow-2xl border-3 border-white/50 p-5 min-w-[320px] fade-in-up"
               style={{ 
                 background: 'rgba(0,0,0,0.9)',
                 boxShadow: `0 15px 50px ${hoveredZone.color}30`
               }}>
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-8 h-5 rounded-lg border-2 border-white shadow-lg"
                style={{ 
                  background: `linear-gradient(45deg, ${hoveredZone.color}, ${hoveredZone.color}cc)`,
                  boxShadow: `0 0 15px ${hoveredZone.color}`
                }}
              />
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{hoveredZone.region.name}</h3>
                <div className="text-sm text-white/70">Cường độ: {(hoveredZone.intensity * 100).toFixed(1)}%</div>
              </div>
            </div>
            
            <div className="mb-4 h-3 bg-gray-700 rounded-full overflow-hidden border border-white/30">
              <div 
                className="h-full rounded-full transition-all duration-800 ease-out"
                style={{ 
                  width: `${hoveredZone.intensity * 100}%`,
                  background: `linear-gradient(90deg, ${hoveredZone.color}, ${hoveredZone.color}aa)`,
                  boxShadow: `0 0 10px ${hoveredZone.color}`
                }}
              />
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-white/30">
                <span className="text-white/80">Phân loại:</span>
                <span className="font-bold text-white px-3 py-1 rounded-lg text-sm border" 
                      style={{ 
                        backgroundColor: `${waterQualityLevels[hoveredZone.region.level as keyof typeof waterQualityLevels]?.color}30`,
                        borderColor: `${waterQualityLevels[hoveredZone.region.level as keyof typeof waterQualityLevels]?.color}`,
                        color: 'white'
                      }}>
                  {waterQualityLevels[hoveredZone.region.level as keyof typeof waterQualityLevels]?.label}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-blue-600/25 rounded-lg border border-blue-400/50">
                  <div className="text-xs text-white/80">TDS</div>
                  <div className="font-bold text-blue-300 text-lg mt-1">{hoveredZone.region.tds}</div>
                  <div className="text-xs text-white/60">mg/L</div>
                </div>
                
                <div className="text-center p-3 bg-green-600/25 rounded-lg border border-green-400/50">
                  <div className="text-xs text-white/80">pH</div>
                  <div className="font-bold text-green-300 text-lg mt-1">{hoveredZone.region.pH}</div>
                  <div className="text-xs text-white/60">level</div>
                </div>
                
                <div className="text-center p-3 bg-purple-600/25 rounded-lg border border-purple-400/50">
                  <div className="text-xs text-white/80">Đục</div>
                  <div className="font-bold text-purple-300 text-lg mt-1">{hoveredZone.region.turbidity}</div>
                  <div className="text-xs text-white/60">NTU</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/30">
              <div className="text-xs text-white/60 text-center">
                {new Date().toLocaleTimeString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Compact Analytics */}
      <div className="mt-6 p-6 fade-in-up border-2 border-white/20 shadow-xl rounded-2xl"
           style={{ background: 'rgba(0,0,0,0.7)' }}>
        <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
          📊 Thống Kê
          <span className="ml-3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl border border-blue-400/30">
            <div className="text-2xl font-bold text-blue-300 mb-2">10</div>
            <div className="text-sm text-white font-semibold">Vùng Nhiệt</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl border border-green-400/30">
            <div className="text-2xl font-bold text-green-300 mb-2">5</div>
            <div className="text-sm text-white font-semibold">Mức Màu</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl border border-purple-400/30">
            <div className="text-2xl font-bold text-purple-300 mb-2">{regions.length}</div>
            <div className="text-sm text-white font-semibold">Khu Vực</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl border border-orange-400/30">
            <div className="text-2xl font-bold text-orange-300 mb-2">✓</div>
            <div className="text-sm text-white font-semibold">Trạng Thái</div>
          </div>
        </div>
      </div>
    </div>
  )
}