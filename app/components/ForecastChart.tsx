'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { forecast } from '@/lib/mockData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function ForecastChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: '🌊 Dự Báo Chất Lượng Nước 7 Ngày Tới',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        color: 'rgba(255, 255, 255, 0.95)',
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgba(255, 255, 255, 0.95)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
          weight: 'normal' as const,
        },
        callbacks: {
          title: function(context: any) {
            return `📅 ${context[0].label}`;
          },
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 1) {
              // pH data (divided by 10)
              label += (context.parsed.y / 10).toFixed(1);
            } else if (context.datasetIndex === 2) {
              // Turbidity data (divided by 10)
              label += (context.parsed.y / 10).toFixed(1) + ' NTU';
            } else {
              // TDS data
              label += context.parsed.y + ' mg/L';
            }
            return label;
          }
        },
        // Position tooltip to avoid blocking axes
        position: 'nearest' as const,
        yAlign: 'top' as const,
        caretPadding: 10,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Giá Trị Đo',
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            weight: 'bold' as const,
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11
          },
          padding: 10,
        },
        border: {
          display: false
        }
      },
      x: {
        title: {
          display: true,
          text: 'Thời Gian',
                  color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 12,
          weight: 'bold' as const,
        }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11
          },
          padding: 10,
        },
        border: {
          display: false
        }
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        borderWidth: 2,
      }
    },
  }

  const data = {
    labels: forecast.map(day => day.day),
    datasets: [
      {
        label: '🔬 TDS (mg/L)',
        data: forecast.map(day => day.tds),
        borderColor: 'rgba(99, 179, 237, 0.9)',
        backgroundColor: 'rgba(99, 179, 237, 0.15)',
        pointBackgroundColor: 'rgba(99, 179, 237, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        fill: true,
      },
      {
        label: '⚗️ pH (×10)',
        data: forecast.map(day => day.pH * 10),
        borderColor: 'rgba(147, 112, 219, 0.9)',
        backgroundColor: 'rgba(147, 112, 219, 0.15)',
        pointBackgroundColor: 'rgba(147, 112, 219, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        fill: false,
      },
      {
        label: '💧 Độ Đục (×10)',
        data: forecast.map(day => day.turbidity * 10),
        borderColor: 'rgba(255, 182, 115, 0.9)',
        backgroundColor: 'rgba(255, 182, 115, 0.15)',
        pointBackgroundColor: 'rgba(255, 182, 115, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        fill: false,
      },
    ],
  }

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold gradient-text mb-2 flex items-center">
          📈 Biểu Đồ Dự Báo Chất Lượng Nước
          <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </h3>
        <p className="text-white/80 text-sm">
          Dự đoán các thông số chất lượng nước trong 7 ngày tới dựa trên AI và dữ liệu lịch sử
        </p>
      </div>
      
      <div className="h-80 mb-6">
        <Line options={options} data={data} />
      </div>
      
      {/* Enhanced Legend Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-4 h-4 bg-blue-400 rounded-full shadow-sm"></div>
            <h4 className="text-sm font-bold text-white/90">🔬 TDS</h4>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Tổng chất rắn hòa tan<br/>
            <span className="text-white/50">Đơn vị: mg/L</span>
          </p>
          <div className="mt-2 text-xs">
            <span className="text-green-400">• &lt;150: Tốt</span><br/>
            <span className="text-yellow-400">• 150-200: TB</span><br/>
            <span className="text-red-400">• &gt;200: Cao</span>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-4 h-4 bg-purple-400 rounded-full shadow-sm"></div>
            <h4 className="text-sm font-bold text-white/90">⚗️ pH</h4>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Độ chua kiềm của nước<br/>
            <span className="text-white/50">Thang đo: 0-14</span>
          </p>
          <div className="mt-2 text-xs">
            <span className="text-red-400">• &lt;6.5: Chua</span><br/>
            <span className="text-green-400">• 6.5-8.5: Chuẩn</span><br/>
            <span className="text-red-400">• &gt;8.5: Kiềm</span>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-4 h-4 bg-orange-400 rounded-full shadow-sm"></div>
            <h4 className="text-sm font-bold text-white/90">💧 Độ Đục</h4>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Độ trong suốt của nước<br/>
            <span className="text-white/50">Đơn vị: NTU</span>
          </p>
          <div className="mt-2 text-xs">
            <span className="text-green-400">• &lt;2: Trong</span><br/>
            <span className="text-yellow-400">• 2-5: Hơi đục</span><br/>
            <span className="text-red-400">• &gt;5: Đục</span>
          </div>
        </div>
      </div>
      
      {/* Chart Note */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-200 flex items-center">
          <span className="mr-2">ℹ️</span>
          <span>Lưu ý: Giá trị pH và Độ đục được nhân 10 để hiển thị tốt hơn trên biểu đồ. Di chuột qua các điểm để xem giá trị thực.</span>
        </p>
      </div>
    </div>
  )
} 