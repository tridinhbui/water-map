'use client'

import { useState, useEffect } from 'react'
import { addDeviceReading, deviceReadings } from '@/lib/mockData'

export default function DeviceInput() {
  const [tdsValue, setTdsValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessBadge, setShowSuccessBadge] = useState(false)
  const [readings, setReadings] = useState(deviceReadings)

  useEffect(() => {
    setReadings([...deviceReadings])
  }, [])

  const showSuccessMessage = () => {
    setShowSuccessBadge(true)
    setTimeout(() => setShowSuccessBadge(false), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const tds = parseFloat(tdsValue)
    if (isNaN(tds) || tds < 0 || tds > 1000) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      addDeviceReading(tds)
      setReadings([...deviceReadings])
      console.log('TDS Reading saved:', { tds, timestamp: new Date() })
      setTdsValue('')
      setIsLoading(false)
      showSuccessMessage()
    }, 800)
  }

  const getQualityLevel = (tds: number) => {
    if (tds < 100) return { level: 'Tuyệt vời', color: 'bg-green-500', emoji: '🟢' }
    if (tds < 150) return { level: 'Tốt', color: 'bg-blue-500', emoji: '🔵' }
    if (tds < 200) return { level: 'Trung bình', color: 'bg-yellow-500', emoji: '🟡' }
    if (tds < 250) return { level: 'Kém', color: 'bg-orange-500', emoji: '🟠' }
    return { level: 'Nguy hiểm', color: 'bg-red-500', emoji: '🔴' }
  }

  const getInputValidation = () => {
    const tds = parseFloat(tdsValue)
    if (!tdsValue) return { valid: null, message: '' }
    if (isNaN(tds) || tds < 0 || tds > 1000) {
      return { valid: false, message: 'Vui lòng nhập giá trị từ 0-1000 mg/L' }
    }
    return { valid: true, message: getQualityLevel(tds).level }
  }

  const validation = getInputValidation()

  return (
    <div className="glass-card p-6">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold gradient-text mb-2 flex items-center justify-center">
          📱 Nhập Dữ Liệu Từ Thiết Bị
          <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </h3>
        <p className="text-white/80 text-sm">
          Nhập kết quả đo TDS từ thiết bị của bạn để theo dõi chất lượng nước
        </p>
      </div>

      {/* Centered Input Form */}
      <div className="max-w-md mx-auto mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <label htmlFor="tds" className="block text-lg font-semibold text-white/90 mb-4">
              💧 Nhập chỉ số TDS bạn đo được
            </label>
            <div className="relative">
              <input
                type="number"
                id="tds"
                value={tdsValue}
                onChange={(e) => setTdsValue(e.target.value)}
                placeholder="Ví dụ: 150"
                min="0"
                max="1000"
                step="0.1"
                className={`w-full p-4 text-center text-lg font-bold bg-white/10 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-white/50 ${
                  validation.valid === false ? 'border-red-400' : validation.valid === true ? 'border-green-400' : 'border-white/30'
                }`}
                disabled={isLoading}
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 font-medium">
                mg/L
              </div>
            </div>
            
            {/* Validation Message */}
            {validation.message && (
              <div className={`mt-2 text-sm font-medium ${
                validation.valid === false ? 'text-red-400' : 'text-green-400'
              }`}>
                {validation.valid === false ? '⚠️' : '✅'} {validation.message}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || !tdsValue || validation.valid === false}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl min-w-[200px] flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang lưu...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>💾</span>
                  <span>Lưu Dữ Liệu</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Badge with Fade Effect */}
      {showSuccessBadge && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm animate-pulse">
            <div className="flex items-center space-x-3 text-lg font-bold">
              <span className="text-2xl">✅</span>
              <span>Đã lưu thành công!</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Readings */}
      {readings.length > 0 && (
        <div>
          <h4 className="text-lg font-bold gradient-text mb-4 text-center">📊 Kết Quả Đo Gần Đây</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {readings.slice().reverse().slice(0, 6).map((reading, index) => {
              const quality = getQualityLevel(reading.tds)
              return (
                <div
                  key={reading.id}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{quality.emoji}</span>
                      <span className="text-lg font-bold text-white">{reading.tds}</span>
                      <span className="text-sm text-white/60">mg/L</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${quality.color} shadow-sm`}>
                      {quality.level}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 text-center mt-2">
                    📅 {reading.timestamp.toLocaleDateString('vi-VN')}
                    <br />
                    🕐 {reading.timestamp.toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          
          {readings.length > 6 && (
            <div className="text-center mt-4">
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                Xem tất cả {readings.length} kết quả →
              </button>
            </div>
          )}
        </div>
      )}

      {readings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <h4 className="text-lg font-semibold text-white/90 mb-2">Chưa có dữ liệu</h4>
          <p className="text-white/70 text-sm">
            Nhập kết quả đo TDS đầu tiên của bạn ở trên để bắt đầu theo dõi chất lượng nước.
          </p>
        </div>
      )}

      {/* TDS Guide */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <h5 className="text-sm font-bold text-blue-200 mb-2 flex items-center">
          <span className="mr-2">💡</span>
          Hướng dẫn đọc chỉ số TDS
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span>🟢</span>
            <span className="text-white/80">&lt;100 mg/L: Tuyệt vời</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🔵</span>
            <span className="text-white/80">100-150 mg/L: Tốt</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🟡</span>
            <span className="text-white/80">150-200 mg/L: Trung bình</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🟠</span>
            <span className="text-white/80">200-250 mg/L: Kém</span>
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <span>🔴</span>
          <span className="text-white/80 text-xs">&gt;250 mg/L: Nguy hiểm - nên lọc trước khi sử dụng</span>
        </div>
      </div>
    </div>
  )
} 