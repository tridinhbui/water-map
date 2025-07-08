'use client'

import { useState, useRef, useEffect } from 'react'
import { getMockAnswer, getAutoInsights, type ChatMessage } from '@/lib/mockData'

interface EnhancedChatbotProps {
  isFullscreen?: boolean
}

export default function EnhancedChatbot({ isFullscreen = false }: EnhancedChatbotProps) {
  const [isOpen, setIsOpen] = useState(isFullscreen)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      text: '🌊 Xin chào! Mình là AquaBot - trợ lý AI thông minh về chất lượng nước. Mình có thể giúp bạn:\n\n📊 Phân tích heatmap chi tiết\n🚨 Nhận diện vùng rủi ro\n💡 Đưa ra khuyến nghị cải thiện\n📈 Dự báo xu hướng chất lượng\n\nHãy thử hỏi "phân tích heatmap" hoặc trò chuyện tự nhiên nhé! 💧',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [autoAnalysisEnabled, setAutoAnalysisEnabled] = useState(true)
  const [notificationCount, setNotificationCount] = useState(3)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-generate insights every 30-60 seconds when chat is open and auto-analysis is enabled
  useEffect(() => {
    if (!isOpen || !autoAnalysisEnabled || isFullscreen) return;
    
    const interval = setInterval(() => {
      const autoInsights = getAutoInsights();
      if (autoInsights.length > 0) {
        setMessages(prev => [...prev, ...autoInsights]);
        setNotificationCount(prev => prev + 1);
      }
    }, 30000 + Math.random() * 30000); // 30-60 seconds
    
    return () => clearInterval(interval);
  }, [isOpen, autoAnalysisEnabled, isFullscreen])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay with micro-interaction
    setTimeout(() => {
      const botResponse: ChatMessage = {
        role: 'bot',
        text: getMockAnswer(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1200 + Math.random() * 800) // More realistic typing delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickAction = (action: string) => {
    if (isTyping) return;
    
    setInput(action)
    
    setTimeout(() => {
      const userMessage: ChatMessage = {
        role: 'user',
        text: action,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsTyping(true)

      setTimeout(() => {
        const botResponse: ChatMessage = {
          role: 'bot',
          text: getMockAnswer(action),
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 1000)
    }, 100)
  }

  const clearNotifications = () => {
    setNotificationCount(0)
  }

  // Fullscreen version for homepage
  if (isFullscreen) {
    return (
      <div className="w-full h-[700px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center floating-animation">
                <span className="text-3xl">💧</span>
              </div>
              <div>
                <h3 className="font-bold text-2xl flex items-center">
                  AquaBot - AI Water Assistant
                  {autoAnalysisEnabled && (
                    <span className="ml-3 w-4 h-4 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </h3>
                <p className="text-blue-100 text-lg">
                  🤖 Trợ lý AI thông minh - Phân tích thời gian thực 24/7
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">98.7%</div>
                <div className="text-sm text-blue-200">Độ chính xác</div>
              </div>
              <button
                onClick={() => setAutoAnalysisEnabled(!autoAnalysisEnabled)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium hover:scale-105 ${
                  autoAnalysisEnabled 
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {autoAnalysisEnabled ? '🔄 AUTO ON' : '⏸️ MANUAL'}
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area - Larger */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-gray-50/50 to-white/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end space-x-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.role === 'bot' && (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">💧</span>
                </div>
              )}
              
              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md transform hover:scale-[1.02]'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">{message.text}</p>
                </div>
                
                <div className={`flex items-center mt-2 space-x-2 px-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <p className="text-sm text-gray-500">
                    {message.timestamp.toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                  {message.role === 'user' && (
                    <span className="text-sm text-blue-500 animate-pulse">✓✓</span>
                  )}
                </div>
              </div>
              
              {message.role === 'user' && (
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">👤</span>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-end space-x-4 justify-start fade-in-up">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                <span className="text-xl">💧</span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md px-6 py-4 border border-gray-200 shadow-lg">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="p-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm rounded-b-2xl">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Hỏi AquaBot về chất lượng nước..."
              className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-500"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform active:scale-95"
            >
              <span className="text-2xl">🚀</span>
            </button>
          </div>
          
          {/* Enhanced Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleQuickAction('phân tích heatmap chi tiết')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-3 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 hover:scale-105 transform active:scale-95 font-medium"
            >
              📊 Phân Tích Chi Tiết
            </button>
            <button
              onClick={() => handleQuickAction('hiển thị vùng nguy hiểm và cảnh báo khẩn cấp')}
              className="bg-red-50 hover:bg-red-100 text-red-700 px-6 py-3 rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300 hover:scale-105 transform active:scale-95 font-medium"
            >
              🚨 Cảnh Báo Khẩn Cấp
            </button>
            <button
              onClick={() => handleQuickAction('đưa ra khuyến nghị cải thiện và hành động')}
              className="bg-green-50 hover:bg-green-100 text-green-700 px-6 py-3 rounded-xl transition-all duration-300 border border-green-200 hover:border-green-300 hover:scale-105 transform active:scale-95 font-medium"
            >
              💡 Khuyến Nghị Smart
            </button>
            <button
              onClick={() => handleQuickAction('dự báo xu hướng 7 ngày tới')}
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-6 py-3 rounded-xl transition-all duration-300 border border-purple-200 hover:border-purple-300 hover:scale-105 transform active:scale-95 font-medium"
            >
              🔮 Dự Báo Xu Hướng
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Floating version (improved)
  return (
    <>
      {/* Enhanced Floating Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) clearNotifications()
        }}
        className={`fixed bottom-6 right-6 w-20 h-20 rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center text-white text-xl transition-all duration-500 z-50 hover:scale-110 active:scale-95 group ${
          isOpen 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
        }`}
      >
        <div className="relative">
          {isOpen ? (
            <span className="text-3xl group-hover:rotate-180 transition-transform duration-500">✕</span>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-4xl animate-bounce group-hover:scale-125 transition-transform duration-300">💧</span>
              {/* Enhanced Notification Badge */}
              {notificationCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse border-3 border-white flex items-center justify-center text-xs font-bold">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </div>
              )}
            </div>
          )}
        </div>
      </button>

      {/* Enhanced Desktop Chat Window - Bigger Size */}
      {isOpen && (
        <div className="hidden sm:flex fixed bottom-28 right-6 w-[480px] h-[700px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 flex-col z-40 slide-in-right">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-5 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center floating-animation">
                  <span className="text-2xl">💧</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center">
                    AquaBot - AI Assistant
                    {autoAnalysisEnabled && (
                      <span className="ml-3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    )}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {autoAnalysisEnabled ? '🤖 Auto-analysis ON' : '💬 Manual mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAutoAnalysisEnabled(!autoAnalysisEnabled)}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 font-medium hover:scale-105 ${
                  autoAnalysisEnabled 
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {autoAnalysisEnabled ? '🔄 AUTO' : '⏸️ MANUAL'}
              </button>
            </div>
          </div>

          {/* Messages - Enhanced with better spacing */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {message.role === 'bot' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-md hover:scale-110 transition-transform duration-300">
                    <span className="text-lg">💧</span>
                  </div>
                )}
                
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md hover:scale-[1.02]'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  <div className={`flex items-center mt-2 space-x-1 px-1 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <p className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.role === 'user' && (
                      <span className="text-xs text-blue-500 animate-pulse">✓✓</span>
                    )}
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-md hover:scale-110 transition-transform duration-300">
                    <span className="text-lg">👤</span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-end space-x-3 justify-start fade-in-up">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-md">
                  <span className="text-lg">💧</span>
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm rounded-b-2xl">
            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hỏi về chất lượng nước..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-sm bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">🚀</span>
              </button>
            </div>
            
            {/* Enhanced Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('phân tích heatmap')}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 hover:scale-105 transform active:scale-95"
              >
                📊 Phân Tích
              </button>
              <button
                onClick={() => handleQuickAction('hiển thị vùng nguy hiểm')}
                className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300 hover:scale-105 transform active:scale-95"
              >
                🚨 Rủi Ro
              </button>
              <button
                onClick={() => handleQuickAction('đưa ra khuyến nghị')}
                className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-xl transition-all duration-300 border border-green-200 hover:border-green-300 hover:scale-105 transform active:scale-95"
              >
                💡 Khuyến Nghị
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Mobile Full Screen */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-white z-30 flex flex-col slide-in-right">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center floating-animation">
                <span className="text-2xl">💧</span>
              </div>
              <div>
                <h3 className="font-bold text-xl flex items-center">
                  AquaBot AI
                  {autoAnalysisEnabled && (
                    <span className="ml-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </h3>
                <p className="text-blue-100 text-sm">
                  {autoAnalysisEnabled ? '🤖 Auto-analysis' : '💬 Manual'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoAnalysisEnabled(!autoAnalysisEnabled)}
                className={`text-xs px-3 py-2 rounded-full transition-all duration-300 font-medium ${
                  autoAnalysisEnabled 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {autoAnalysisEnabled ? '🔄' : '⏸️'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Mobile Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {message.role === 'bot' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                    <span className="text-lg">💧</span>
                  </div>
                )}
                
                <div className="flex flex-col max-w-[85%]">
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                    }`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  <div className={`flex items-center mt-2 space-x-1 px-1 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <p className="text-sm text-gray-500">
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.role === 'user' && (
                      <span className="text-sm text-blue-500 animate-pulse">✓✓</span>
                    )}
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                    <span className="text-lg">👤</span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-end space-x-3 justify-start fade-in-up">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-lg">
                  <span className="text-lg">💧</span>
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-lg">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mobile Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hỏi AquaBot..."
                className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-base bg-gray-50 text-gray-800 placeholder-gray-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-4 rounded-2xl transition-all duration-300 shadow-lg active:scale-95"
              >
                <span className="text-xl">🚀</span>
              </button>
            </div>
            
            {/* Mobile Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('phân tích heatmap')}
                className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl transition-all duration-300 border border-blue-200 active:scale-95"
              >
                📊 Phân Tích
              </button>
              <button
                onClick={() => handleQuickAction('hiển thị vùng nguy hiểm')}
                className="text-sm bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-xl transition-all duration-300 border border-red-200 active:scale-95"
              >
                🚨 Rủi Ro
              </button>
              <button
                onClick={() => handleQuickAction('đưa ra khuyến nghị')}
                className="text-sm bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-xl transition-all duration-300 border border-green-200 active:scale-95"
              >
                💡 Khuyến Nghị
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 