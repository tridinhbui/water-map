/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'water-excellent': '#10b981', // green-500
        'water-good': '#22d3ee',      // cyan-400
        'water-moderate': '#fbbf24',  // amber-400
        'water-poor': '#f97316',      // orange-500
        'water-dangerous': '#ef4444', // red-500
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 