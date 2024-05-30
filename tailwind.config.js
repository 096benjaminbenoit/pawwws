/** @type {import('tailwindcss').Config} */
export default {
  content: ['./inertia/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Jost', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        primary: '#6366F1',
        dark: '#1C2536',
        error: '#f82041',
        success: '#60cb6a',
        lightbase: '#F6F8FB',
      },
    },
  },
  plugins: [],
}
