export interface Region {
  id: number;
  name: string;
  tds: number; // Total Dissolved Solids (mg/L)
  pH: number;
  turbidity: number; // NTU
  level: 'excellent' | 'good' | 'moderate' | 'poor' | 'dangerous';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ForecastData {
  day: string;
  tds: number;
  pH: number;
  turbidity: number;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

// Mock regions data for Vietnam provinces/cities
export const regions: Region[] = [
  {
    id: 1,
    name: 'Hanoi',
    tds: 120,
    pH: 7.2,
    turbidity: 2.3,
    level: 'good',
    coordinates: { lat: 21.0285, lng: 105.8542 }
  },
  {
    id: 2,
    name: 'Ho Chi Minh City',
    tds: 180,
    pH: 6.8,
    turbidity: 4.1,
    level: 'moderate',
    coordinates: { lat: 10.8231, lng: 106.6297 }
  },
  {
    id: 3,
    name: 'Da Nang',
    tds: 95,
    pH: 7.5,
    turbidity: 1.8,
    level: 'excellent',
    coordinates: { lat: 16.0544, lng: 108.2022 }
  },
  {
    id: 4,
    name: 'Hai Phong',
    tds: 220,
    pH: 6.5,
    turbidity: 6.2,
    level: 'poor',
    coordinates: { lat: 20.8449, lng: 106.6881 }
  },
  {
    id: 5,
    name: 'Can Tho',
    tds: 160,
    pH: 7.0,
    turbidity: 3.5,
    level: 'moderate',
    coordinates: { lat: 10.0452, lng: 105.7469 }
  },
  {
    id: 6,
    name: 'Bien Hoa',
    tds: 145,
    pH: 7.1,
    turbidity: 2.9,
    level: 'good',
    coordinates: { lat: 10.9460, lng: 106.8234 }
  },
  {
    id: 7,
    name: 'Hue',
    tds: 110,
    pH: 7.3,
    turbidity: 2.1,
    level: 'good',
    coordinates: { lat: 16.4637, lng: 107.5909 }
  },
  {
    id: 8,
    name: 'Nha Trang',
    tds: 85,
    pH: 7.6,
    turbidity: 1.5,
    level: 'excellent',
    coordinates: { lat: 12.2388, lng: 109.1967 }
  },
  {
    id: 9,
    name: 'Vung Tau',
    tds: 190,
    pH: 6.7,
    turbidity: 4.8,
    level: 'moderate',
    coordinates: { lat: 10.4124, lng: 107.1365 }
  },
  {
    id: 10,
    name: 'Thai Nguyen',
    tds: 300,
    pH: 6.2,
    turbidity: 8.5,
    level: 'dangerous',
    coordinates: { lat: 21.5944, lng: 105.8480 }
  }
];

// 7-day forecast data
export const forecast: ForecastData[] = [
  { day: 'Mon', tds: 120, pH: 7.2, turbidity: 2.3 },
  { day: 'Tue', tds: 125, pH: 7.1, turbidity: 2.5 },
  { day: 'Wed', tds: 118, pH: 7.3, turbidity: 2.1 },
  { day: 'Thu', tds: 130, pH: 7.0, turbidity: 2.8 },
  { day: 'Fri', tds: 115, pH: 7.4, turbidity: 2.0 },
  { day: 'Sat', tds: 122, pH: 7.2, turbidity: 2.4 },
  { day: 'Sun', tds: 128, pH: 7.1, turbidity: 2.6 }
];

// Water quality levels configuration
export const waterQualityLevels = {
  excellent: {
    color: '#10b981',
    label: 'Excellent',
    tdsRange: [0, 100],
    pHRange: [7.0, 8.5],
    turbidityRange: [0, 2.0]
  },
  good: {
    color: '#22d3ee',
    label: 'Good',
    tdsRange: [100, 150],
    pHRange: [6.5, 7.0],
    turbidityRange: [2.0, 3.0]
  },
  moderate: {
    color: '#fbbf24',
    label: 'Moderate',
    tdsRange: [150, 200],
    pHRange: [6.0, 6.5],
    turbidityRange: [3.0, 5.0]
  },
  poor: {
    color: '#f97316',
    label: 'Poor',
    tdsRange: [200, 250],
    pHRange: [5.5, 6.0],
    turbidityRange: [5.0, 8.0]
  },
  dangerous: {
    color: '#ef4444',
    label: 'Dangerous',
    tdsRange: [250, Infinity],
    pHRange: [0, 5.5],
    turbidityRange: [8.0, Infinity]
  }
};

// Auto-analysis insights
export const getHeatmapAnalysis = (): string[] => {
  const analysis = [
    '🚨 ALERT: Thai Nguyen shows dangerous TDS levels (300+ mg/L). Immediate action required.',
    '📈 TREND: Water quality in central regions (Da Nang, Hue) showing consistent improvement over last 7 days.',
    '⚠️ WARNING: Hai Phong pollution levels increasing. Recommend enhanced monitoring.',
    '✅ POSITIVE: Nha Trang maintains excellent water quality standards.',
    '📊 ANALYSIS: 40% of monitored regions exceed WHO recommended TDS limits.',
    '🔍 INSIGHT: Southern region (HCM, Can Tho) requires infrastructure upgrades.',
    '💡 RECOMMENDATION: Deploy additional sensors in high-risk areas.',
    '🌊 QUALITY INDEX: Current national average TDS: 165 mg/L (Moderate)',
  ];
  
  return analysis;
};

// Enhanced chatbot responses with smart analysis
export const getMockAnswer = (question: string): string => {
  const q = question.toLowerCase();
  
  // Auto heatmap analysis questions
  if (q.includes('analyze') || q.includes('analysis') || q.includes('heatmap') || q.includes('overview')) {
    const insights = getHeatmapAnalysis();
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    return `🤖 HEATMAP ANALYSIS: ${randomInsight}\n\nBased on current data, I detect several areas requiring attention. Would you like detailed analysis of a specific region?`;
  }
  
  if (q.includes('dangerous') || q.includes('alert') || q.includes('risk')) {
    return '🚨 CRITICAL ZONES DETECTED:\n• Thai Nguyen: 300+ mg/L TDS (DANGEROUS)\n• Hai Phong: 220 mg/L TDS (POOR)\n\nImmediate recommendations:\n1. Stop water consumption in critical zones\n2. Deploy emergency filtration\n3. Investigate pollution sources\n4. Implement 24/7 monitoring';
  }
  
  if (q.includes('best') || q.includes('excellent') || q.includes('good')) {
    return '✅ TOP PERFORMING REGIONS:\n• Nha Trang: 85 mg/L TDS (EXCELLENT)\n• Da Nang: 95 mg/L TDS (EXCELLENT)\n• Hue: 110 mg/L TDS (GOOD)\n\nThese areas demonstrate excellent water management practices and can serve as models for other regions.';
  }
  
  if (q.includes('trend') || q.includes('prediction') || q.includes('forecast')) {
    return '📈 TREND ANALYSIS (7-day):\n• Northern regions: Declining quality (-15%)\n• Central regions: Stable to improving (+5%)\n• Southern regions: Mixed signals\n\nPREDICTION: Without intervention, 3 additional regions may enter "Poor" category within 30 days.';
  }
  
  if (q.includes('recommendation') || q.includes('solution') || q.includes('fix')) {
    return '💡 AI RECOMMENDATIONS:\n1. Priority filtration in Thai Nguyen & Hai Phong\n2. Increase monitoring frequency in HCM area\n3. Infrastructure upgrade needed in Can Tho\n4. Success model replication from Nha Trang\n5. Emergency response team deployment\n\nEstimated impact: 60% quality improvement in 90 days.';
  }
  
  // Original responses enhanced
  if (q.includes('tds') || q.includes('total dissolved solids')) {
    return '🔬 TDS DEEP ANALYSIS:\nTotal Dissolved Solids measure dissolved minerals. Current national average: 165 mg/L (Moderate)\n\n📊 BREAKDOWN:\n• Excellent (0-100): 2 regions\n• Good (100-150): 3 regions\n• Moderate (150-200): 3 regions\n• Poor (200-250): 1 region\n• Dangerous (250+): 1 region\n\nHigher levels indicate contamination or excessive mineralization.';
  }
  
  if (q.includes('ph') || q.includes('acid')) {
    return '⚗️ pH MONITORING REPORT:\npH measures acidity/alkalinity (0-14 scale). Drinking water: 6.5-8.5 optimal.\n\n📈 CURRENT STATUS:\n• Average pH: 7.1 (Good)\n• Range: 6.2 - 7.6\n• Outliers: Thai Nguyen (6.2 - Acidic)\n\nValues outside range may cause pipe corrosion or health issues.';
  }
  
  if (q.includes('turbidity') || q.includes('cloudy') || q.includes('clear')) {
    return '💧 TURBIDITY ASSESSMENT:\nMeasures water clarity. Standard: <2 NTU for drinking water.\n\n🔍 ANALYSIS:\n• Average: 3.2 NTU (Above standard)\n• Clearest: Nha Trang (1.5 NTU)\n• Cloudiest: Thai Nguyen (8.5 NTU)\n\nHigh turbidity indicates suspended particles that can harbor harmful microorganisms.';
  }
  
  return '🤖 AI WATER ASSISTANT: I can analyze heatmap data, identify risks, provide recommendations, and explain water quality parameters. Try asking:\n• "Analyze the heatmap"\n• "Show me dangerous areas"\n• "What are the trends?"\n• "Give me recommendations"';
};

// Auto-generated insights for proactive chatbot
export const getAutoInsights = (): ChatMessage[] => {
  const now = new Date();
  const insights: ChatMessage[] = [];
  
  // Random auto-analysis messages
  const autoMessages = [
    '🤖 Auto-Analysis Complete: Detected quality deterioration in Northern region. Deploying additional monitoring sensors.',
    '📊 Real-time Update: Water quality index improved by 12% in Central Vietnam over the past 24 hours.',
    '⚠️ Predictive Alert: Hai Phong trending toward "Dangerous" category. Recommend immediate intervention.',
    '✅ System Health: All 10 monitoring stations online. Data accuracy: 98.7%.',
    '🔄 Quality Refresh: Updated TDS readings from 3 stations. Thai Nguyen requires urgent attention.',
    '💡 AI Insight: Seasonal rainfall patterns suggest quality improvement expected in Southern regions.',
    '🌊 Trend Analysis: Nha Trang maintains excellence - water treatment model recommended for replication.',
  ];
  
  // Add random auto-insight every few minutes (simulation)
  if (Math.random() > 0.7) {
    const randomMessage = autoMessages[Math.floor(Math.random() * autoMessages.length)];
    insights.push({
      role: 'bot',
      text: randomMessage,
      timestamp: new Date(now.getTime() - Math.random() * 300000) // Random time in last 5 minutes
    });
  }
  
  return insights;
};

// Device data storage (in-memory for demo)
export let deviceReadings: Array<{
  id: string;
  tds: number;
  timestamp: Date;
}> = [];

export const addDeviceReading = (tds: number): void => {
  deviceReadings.push({
    id: Date.now().toString(),
    tds,
    timestamp: new Date()
  });
  
  // Keep only last 10 readings
  if (deviceReadings.length > 10) {
    deviceReadings = deviceReadings.slice(-10);
  }
}; 