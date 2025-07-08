'use client'

import { useState, useRef, useEffect } from 'react'
import { getMockAnswer, getAutoInsights, type ChatMessage } from '@/lib/mockData'

export default function ChatbotMock() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      text: '🌊 Xin chào! Mình là AquaBot - trợ lý thông minh về chất lượng nước. Mình có thể giúp bạn phân tích heatmap, nhận diện rủi ro và đưa ra khuyến nghị. Hãy thử hỏi "phân tích heatmap" hoặc trò chuyện bình thường nhé! 💧',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [autoAnalysisEnabled, setAutoAnalysisEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-generate insights every 30-60 seconds when chat is open and auto-analysis is enabled
  useEffect(() => {
    if (!isOpen || !autoAnalysisEnabled) return;
    
    const interval = setInterval(() => {
      const autoInsights = getAutoInsights();
      if (autoInsights.length > 0) {
        setMessages(prev => [...prev, ...autoInsights]);
      }
    }, 30000 + Math.random() * 30000); // 30-60 seconds
    
    return () => clearInterval(interval);
  }, [isOpen, autoAnalysisEnabled])

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

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        role: 'bot',
        text: getMockAnswer(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
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
    
    // Auto-send the quick action
    setTimeout(() => {
      const userMessage: ChatMessage = {
        role: 'user',
        text: action,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsTyping(true)

      // Simulate typing delay
      setTimeout(() => {
        const botResponse: ChatMessage = {
          role: 'bot',
          text: getMockAnswer(action),
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 800)
    }, 100)
  }

  return (
    <>
      {/* Cute Water Drop Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-white text-xl transition-all duration-300 z-50 hover:scale-110 group ${
          isOpen 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
        }`}
      >
        <div className="relative">
          {isOpen ? (
            <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">✕</span>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-3xl animate-bounce group-hover:scale-110 transition-transform duration-300">💧</span>
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
            </div>
          )}
        </div>
      </button>

      {/* Desktop Chat Window */}
      {isOpen && (
        <div className="hidden sm:flex fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 flex-col z-40">
          {/* Friendly Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-xl animate-bounce">💧</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center">
                    AquaBot - Trợ Lý Thông Minh
                    {autoAnalysisEnabled && (
                      <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    )}
                  </h3>
                  <p className="text-blue-100 text-xs">
                    {autoAnalysisEnabled ? '🤖 Đang phân tích tự động...' : '💬 Sẵn sàng trò chuyện'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAutoAnalysisEnabled(!autoAnalysisEnabled)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 font-medium ${
                  autoAnalysisEnabled 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                title={autoAnalysisEnabled ? 'Tắt phân tích tự động' : 'Bật phân tích tự động'}
              >
                {autoAnalysisEnabled ? '🔄 TỰ ĐỘNG' : '⏸️ THỦ CÔNG'}
              </button>
            </div>
          </div>

          {/* Messenger-style Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                    <span className="text-sm">💧</span>
                  </div>
                )}
                
                <div className="flex flex-col max-w-[75%]">
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  <div className={`flex items-center mt-1 space-x-1 px-1 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <p className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.role === 'user' && (
                      <span className="text-xs text-blue-500">✓</span>
                    )}
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                    <span className="text-sm">👤</span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-end space-x-2 justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                  <span className="text-sm">💧</span>
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-sm">
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

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors duration-200"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <span className="text-lg">🚀</span>
              </button>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => handleQuickAction('phân tích heatmap')}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full transition-colors duration-200 border border-blue-200 hover:border-blue-300"
              >
                📊 Phân Tích
              </button>
              <button
                onClick={() => handleQuickAction('hiển thị vùng nguy hiểm')}
                className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-full transition-colors duration-200 border border-red-200 hover:border-red-300"
              >
                🚨 Rủi Ro
              </button>
              <button
                onClick={() => handleQuickAction('đưa ra khuyến nghị')}
                className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-full transition-colors duration-200 border border-green-200 hover:border-green-300"
              >
                💡 Khuyến Nghị
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Full Screen Overlay */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-white z-30 flex flex-col">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-xl animate-bounce">💧</span>
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center">
                  AquaBot
                  {autoAnalysisEnabled && (
                    <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </h3>
                <p className="text-blue-100 text-sm">
                  {autoAnalysisEnabled ? '🤖 Phân tích tự động' : '💬 Trò chuyện'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoAnalysisEnabled(!autoAnalysisEnabled)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 font-medium ${
                  autoAnalysisEnabled 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {autoAnalysisEnabled ? '🔄' : '⏸️'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-xl hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Mobile Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                    <span className="text-sm">💧</span>
                  </div>
                )}
                
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  <div className={`flex items-center mt-1 space-x-1 px-1 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <p className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.role === 'user' && (
                      <span className="text-xs text-blue-500">✓</span>
                    )}
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                    <span className="text-sm">👤</span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-end space-x-2 justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                  <span className="text-sm">💧</span>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-sm">
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

          {/* Mobile Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-4 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-gray-50"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-4 rounded-full transition-all duration-200 shadow-lg"
              >
                <span className="text-lg">🚀</span>
              </button>
            </div>
            
            {/* Mobile Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickAction('phân tích heatmap')}
                className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-full transition-colors duration-200 border border-blue-200"
              >
                📊 Phân Tích
              </button>
              <button
                onClick={() => handleQuickAction('hiển thị vùng nguy hiểm')}
                className="text-sm bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-full transition-colors duration-200 border border-red-200"
              >
                🚨 Rủi Ro
              </button>
              <button
                onClick={() => handleQuickAction('đưa ra khuyến nghị')}
                className="text-sm bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-full transition-colors duration-200 border border-green-200"
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