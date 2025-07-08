'use client'

import { useState, useEffect } from 'react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Cảnh báo chất lượng nước',
      message: 'Thái Nguyên: TDS vượt mức an toàn (300+ mg/L)',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2', 
      type: 'success',
      title: 'Cập nhật thành công',
      message: 'Dữ liệu từ 3 trạm giám sát đã được cập nhật',
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Báo cáo AI',
      message: 'Phân tích xu hướng 7 ngày vừa hoàn thành',
      timestamp: new Date(Date.now() - 600000),
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '🚨'
      case 'info': return 'ℹ️'
      default: return '📢'
    }
  }

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
      case 'warning': return 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
      case 'error': return 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
      case 'info': return 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
      default: return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-xl bg-white/10 dark:bg-gray-800/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/20 dark:border-gray-600/50 hover:scale-105 active:scale-95 backdrop-blur-sm"
        title={`${unreadCount} thông báo chưa đọc`}
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 z-50 fade-in-up max-h-[500px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                🔔 Thông Báo
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Đánh dấu đã đọc
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <EmptyNotifications />
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center flex-shrink-0 ${getNotificationStyle(notification.type)}`}>
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {notification.timestamp.toLocaleTimeString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                              title="Đánh dấu đã đọc"
                            >
                              <span className="text-xs">👁️</span>
                            </button>
                          )}
                          <button
                            onClick={() => clearNotification(notification.id)}
                            className="p-1 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            title="Xóa thông báo"
                          >
                            <span className="text-xs">🗑️</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Xem tất cả thông báo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Empty State Component
export function EmptyNotifications() {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🔕</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Không có thông báo
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Bạn đã xem hết tất cả thông báo. Chúng tôi sẽ thông báo khi có cập nhật mới.
      </p>
      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-xl transition-colors">
        Làm mới
      </button>
    </div>
  )
}

// Error State Component  
export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">❌</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Có lỗi xảy ra
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại.
      </p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-xl transition-colors"
      >
        Thử lại
      </button>
    </div>
  )
}

// Onboarding Tutorial Component
export function OnboardingTutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check localStorage only on client side
    const completed = localStorage.getItem('watersense-onboarding-completed')
    setIsVisible(!completed)
  }, [])

  const steps = [
    {
      title: '🌊 Chào mừng đến với WaterSense!',
      description: 'Nền tảng giám sát chất lượng nước thông minh với AI',
      target: null,
      position: 'center'
    },
    {
      title: '🗺️ Khám phá Heatmap',
      description: 'Xem trực quan chất lượng nước theo thời gian thực trên toàn quốc',
      target: '#heatmap',
      position: 'bottom'
    },
    {
      title: '💧 Trò chuyện với AquaBot',
      description: 'Hỏi AI về phân tích, dự báo và khuyến nghị cải thiện chất lượng nước',
      target: '.enhanced-chatbot',
      position: 'left'
    },
    {
      title: '🔔 Theo dõi thông báo',
      description: 'Nhận cảnh báo khi chất lượng nước vượt ngưỡng an toàn',
      target: '.notification-center',
      position: 'bottom'
    },
    {
      title: '🎨 Tùy chỉnh giao diện',
      description: 'Thay đổi chế độ sáng/tối và màu sắc theo sở thích',
      target: '.theme-toggle',
      position: 'bottom'
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTutorial = () => {
    completeOnboarding()
  }

  const completeOnboarding = () => {
    localStorage.setItem('watersense-onboarding-completed', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  const currentStepData = steps[currentStep]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 fade-in-up">
        {/* Tutorial Modal */}
        <div className="fixed inset-4 flex items-center justify-center z-50">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 max-w-md w-full p-6 slide-in-right">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-blue-500 scale-110' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={skipTutorial}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Bỏ qua
              </button>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Quay lại
              </button>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentStep + 1} / {steps.length}
              </span>

              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium"
              >
                {currentStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 