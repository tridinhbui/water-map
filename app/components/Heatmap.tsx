'use client'

import Image from 'next/image'
import { regions, waterQualityLevels } from '@/lib/mockData'
import { useState } from 'react'

export default function Heatmap() {
  const [hoveredRegion, setHoveredRegion] = useState<typeof regions[0] | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  // Position coordinates for regions on the heatmap
  const regionPositions = {
    'Hanoi': { x: 480, y: 200 },
    'Ho Chi Minh City': { x: 520, y: 620 },
    'Da Nang': { x: 630, y: 380 },
    'Hai Phong': { x: 510, y: 240 },
    'Can Tho': { x: 450, y: 400 },
    'Bien Hoa': { x: 570, y: 640 },
    'Hue': { x: 645, y: 430 },
    'Nha Trang': { x: 675, y: 510 },
    'Vung Tau': { x: 630, y: 680 },
    'Thai Nguyen': { x: 510, y: 160 }
  }

  return (
    <div className="w-full fade-in-up">
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold gradient-text mb-2 floating-animation">💧 Bản Đồ Chất Lượng Nước 3D</h2>
        <p className="text-white/80 text-lg">Giám sát môi trường thời gian thực với phân tích thông minh</p>
        <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">10 Trạm Hoạt Động</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">Cập Nhật Liên Tục</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200">AI Phân Tích</span>
          </div>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl glow-on-hover group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 z-10"></div>
        <Image 
          src="/heatmap.svg" 
          alt="Vietnam Water Quality Heatmap"
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        
        {/* Animated overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 z-20 animate-pulse" />
        
        {/* Interactive Region Hotspots */}
        <div className="absolute inset-0 z-30" onMouseMove={handleMouseMove}>
          {regions.map((region) => {
            const position = regionPositions[region.name as keyof typeof regionPositions]
            if (!position) return null
            
            return (
              <div
                key={region.name}
                className="absolute w-6 h-6 -translate-x-3 -translate-y-3 cursor-pointer transition-all duration-300 hover:scale-150 group"
                style={{
                  left: `${(position.x / 1200) * 100}%`,
                  top: `${(position.y / 800) * 100}%`,
                }}
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <div className={`w-full h-full rounded-full border-2 border-white/70 transition-all duration-300 hover:shadow-xl shadow-lg ${
                  hoveredRegion?.name === region.name ? 'scale-125 shadow-2xl ring-4 ring-white/30' : ''
                }`}
                style={{ backgroundColor: waterQualityLevels[region.level as keyof typeof waterQualityLevels]?.color }}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ backgroundColor: waterQualityLevels[region.level as keyof typeof waterQualityLevels]?.color }}>
                  </div>
                </div>
                
                {/* Region name label */}
                <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                  hoveredRegion?.name === region.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap backdrop-blur-sm">
                    {region.name}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Instruction overlay */}
        {!hoveredRegion && (
          <div className="absolute inset-0 flex items-center justify-center z-25 pointer-events-none">
            <div className="text-white/90 text-center fade-in-up">
              <div className="text-sm bg-black/30 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">👆</span>
                  <span>Di chuột qua các vùng để xem chi tiết</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Modern Legend */}
        <div className="absolute bottom-4 right-4 glass-card rounded-xl p-4 shadow-xl border border-white/20">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center">
            <span className="mr-2">🌊</span>
            Mức Chất Lượng Nước
          </h3>
          <div className="space-y-2">
            {Object.entries(waterQualityLevels).map(([level, config]) => (
              <div key={level} className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full border border-white/30 shadow-sm pulse-glow"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs text-white/90 font-medium">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Statistics */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6">
        {Object.entries(waterQualityLevels).map(([level, config], index) => {
          const count = regions.filter(r => r.level === level).length;
          return (
            <div 
              key={level} 
              className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="w-6 h-6 rounded-full mx-auto mb-3 pulse-glow"
                style={{ backgroundColor: config.color }}
              />
              <div className="text-3xl font-bold gradient-text mb-1">{count}</div>
              <div className="text-sm font-medium text-white/90">{config.label}</div>
              <div className="text-xs text-white/60 mt-1">vùng</div>
            </div>
          );
        })}
      </div>

      {/* Detailed Tooltip */}
      {hoveredRegion && (
        <div 
          className="fixed z-50 pointer-events-none transition-all duration-200 ease-out"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 140,
            transform: mousePosition.x > window.innerWidth - 300 ? 'translateX(-100%) translateX(-30px)' : 'none'
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 p-5 min-w-[280px] fade-in-up">
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-5 h-5 rounded-full border-2 border-white shadow-lg pulse-glow"
                style={{ backgroundColor: waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.color }}
              ></div>
              <h3 className="font-bold text-gray-900 text-lg">{hoveredRegion.name}</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 flex items-center">
                  <span className="mr-2">🏷️</span>
                  Chất lượng:
                </span>
                <span className="font-semibold text-gray-900 px-2 py-1 rounded-lg text-xs" 
                      style={{ 
                        backgroundColor: `${waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.color}20`,
                        color: waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.color
                      }}>
                  {waterQualityLevels[hoveredRegion.level as keyof typeof waterQualityLevels]?.label}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 flex items-center">
                  <span className="mr-2">🔬</span>
                  TDS:
                </span>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                  {hoveredRegion.tds} mg/L
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 flex items-center">
                  <span className="mr-2">⚗️</span>
                  pH:
                </span>
                <span className="font-mono font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  {hoveredRegion.pH}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 flex items-center">
                  <span className="mr-2">💧</span>
                  Độ đục:
                </span>
                <span className="font-mono font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                  {hoveredRegion.turbidity} NTU
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center flex items-center justify-center">
                <span className="mr-1">📊</span>
                Cập nhật lúc {new Date().toLocaleTimeString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Advanced Analytics Panel */}
      <div className="mt-8 glass-card p-6 fade-in-up">
        <h3 className="text-xl font-bold gradient-text mb-4 flex items-center">
          🔮 Bảng Điều Khiển AI
          <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">98.7%</div>
            <div className="text-sm text-white/80">Độ Chính Xác Dữ Liệu</div>
            <div className="text-xs text-white/60">Cảm biến thời gian thực</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">165 mg/L</div>
            <div className="text-sm text-white/80">TDS Trung Bình Quốc Gia</div>
            <div className="text-xs text-white/60">Mức độ vừa phải</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">2 phút</div>
            <div className="text-sm text-white/80">Cập Nhật Cuối</div>
            <div className="text-xs text-white/60">Tự động làm mới</div>
          </div>
        </div>
      </div>
    </div>
  )
} 