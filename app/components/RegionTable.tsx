'use client'

import { useState } from 'react'
import { regions, waterQualityLevels, type Region } from '@/lib/mockData'

type SortField = 'name' | 'tds' | 'pH' | 'turbidity'
type SortDirection = 'asc' | 'desc'

export default function RegionTable() {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedRegions = [...regions].sort((a, b) => {
    let aValue: string | number = a[sortField]
    let bValue: string | number = b[sortField]

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  const getQualityBadge = (level: Region['level']) => {
    const config = waterQualityLevels[level]
    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm"
        style={{ backgroundColor: config.color }}
      >
        {config.label}
      </span>
    )
  }

  const getTDSStatus = (tds: number) => {
    if (tds < 150) return { label: 'Tốt', color: 'text-green-600' }
    if (tds < 200) return { label: 'Trung bình', color: 'text-yellow-600' }
    return { label: 'Cao', color: 'text-red-600' }
  }

  const getPHStatus = (pH: number) => {
    if (pH >= 6.5 && pH <= 8.5) return { label: 'Bình thường', color: 'text-green-600' }
    return { label: 'Ngoài chuẩn', color: 'text-red-600' }
  }

  const getTurbidityStatus = (turbidity: number) => {
    if (turbidity < 2) return { label: 'Trong', color: 'text-green-600' }
    if (turbidity < 5) return { label: 'Hơi đục', color: 'text-yellow-600' }
    return { label: 'Đục', color: 'text-red-600' }
  }

  // Simulate empty state for demonstration
  const hasData = regions.length > 0

  if (!hasData) {
    return (
      <div className="glass-card p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold gradient-text mb-2 flex items-center">
            📊 Dữ Liệu Chất Lượng Nước Theo Vùng
          </h3>
          <p className="text-white/80 text-sm">
            Dữ liệu toàn diện về chất lượng nước tại các thành phố lớn của Việt Nam
          </p>
        </div>
        
        {/* Beautiful No Data State */}
        <div className="text-center py-16">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">📋</span>
            </div>
          </div>
          <h4 className="text-xl font-semibold text-white/90 mb-2">Không có dữ liệu</h4>
          <p className="text-white/70 mb-6 max-w-sm mx-auto">
            Hiện tại chưa có dữ liệu chất lượng nước cho các vùng. Vui lòng thử lại sau.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
            🔄 Làm mới dữ liệu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold gradient-text mb-2 flex items-center">
          📊 Dữ Liệu Chất Lượng Nước Theo Vùng
          <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </h3>
        <p className="text-white/80 text-sm">
          Dữ liệu toàn diện về chất lượng nước tại {regions.length} thành phố lớn của Việt Nam
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-white/20">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm">
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors duration-200"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center justify-between">
                    <span>🏙️ Vùng</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-center text-xs font-bold text-white/90 uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors duration-200"
                  onClick={() => handleSort('tds')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>🔬 TDS</span>
                    {getSortIcon('tds')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-center text-xs font-bold text-white/90 uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors duration-200"
                  onClick={() => handleSort('pH')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>⚗️ pH</span>
                    {getSortIcon('pH')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-center text-xs font-bold text-white/90 uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors duration-200"
                  onClick={() => handleSort('turbidity')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>💧 Độ Đục</span>
                    {getSortIcon('turbidity')}
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-white/90 uppercase tracking-wider">
                  🏷️ Mức Chất Lượng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sortedRegions.map((region, index) => (
                <tr 
                  key={region.id} 
                  className="hover:bg-white/5 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white/30 shadow-sm pulse-glow"
                        style={{ backgroundColor: waterQualityLevels[region.level].color }}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
                          {region.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-mono font-bold text-white">
                      {region.tds} <span className="text-xs font-normal text-white/60">mg/L</span>
                    </div>
                    <div className={`text-xs font-medium ${getTDSStatus(region.tds).color}`}>
                      {getTDSStatus(region.tds).label}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-mono font-bold text-white">
                      {region.pH}
                    </div>
                    <div className={`text-xs font-medium ${getPHStatus(region.pH).color}`}>
                      {getPHStatus(region.pH).label}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-mono font-bold text-white">
                      {region.turbidity} <span className="text-xs font-normal text-white/60">NTU</span>
                    </div>
                    <div className={`text-xs font-medium ${getTurbidityStatus(region.turbidity).color}`}>
                      {getTurbidityStatus(region.turbidity).label}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getQualityBadge(region.level)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {sortedRegions.map((region, index) => (
          <div 
            key={region.id}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/30 shadow-sm"
                  style={{ backgroundColor: waterQualityLevels[region.level].color }}
                />
                <h4 className="font-semibold text-white">{region.name}</h4>
              </div>
              {getQualityBadge(region.level)}
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-white/60 mb-1">🔬 TDS</div>
                <div className="font-mono font-bold text-white text-sm">{region.tds}</div>
                <div className={`text-xs ${getTDSStatus(region.tds).color}`}>
                  {getTDSStatus(region.tds).label}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-white/60 mb-1">⚗️ pH</div>
                <div className="font-mono font-bold text-white text-sm">{region.pH}</div>
                <div className={`text-xs ${getPHStatus(region.pH).color}`}>
                  {getPHStatus(region.pH).label}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-white/60 mb-1">💧 Độ Đục</div>
                <div className="font-mono font-bold text-white text-sm">{region.turbidity}</div>
                <div className={`text-xs ${getTurbidityStatus(region.turbidity).color}`}>
                  {getTurbidityStatus(region.turbidity).label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-bold gradient-text mb-1">
            {regions.length}
          </div>
          <div className="text-sm text-white/70">Tổng số vùng</div>
          <div className="text-xs text-white/50 mt-1">📍 Monitoring stations</div>
        </div>
        
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-bold gradient-text mb-1">
            {Math.round(regions.reduce((sum, r) => sum + r.tds, 0) / regions.length)}
          </div>
          <div className="text-sm text-white/70">TDS Trung bình</div>
          <div className="text-xs text-white/50 mt-1">🔬 mg/L</div>
        </div>
        
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-bold gradient-text mb-1">
            {(regions.reduce((sum, r) => sum + r.pH, 0) / regions.length).toFixed(1)}
          </div>
          <div className="text-sm text-white/70">pH Trung bình</div>
          <div className="text-xs text-white/50 mt-1">⚗️ Acid/Base level</div>
        </div>
        
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-bold gradient-text mb-1">
            {(regions.reduce((sum, r) => sum + r.turbidity, 0) / regions.length).toFixed(1)}
          </div>
          <div className="text-sm text-white/70">Độ đục TB</div>
          <div className="text-xs text-white/50 mt-1">💧 NTU</div>
        </div>
      </div>
    </div>
  )
} 