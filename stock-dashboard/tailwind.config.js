module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1e293b', // Deep blue-gray for a calm dark mode background
        'dark-card': '#334155', // Slightly lighter blue-gray for card backgrounds
        'dark-text': '#dbeafe', // Light blue for text, providing a soft contrast
        'primary': '#0ea5e9', // Bright sky blue for primary elements
        'secondary': '#f97316', // Vibrant orange for secondary elements
        'triandary': '#22d3ee', // Cyan for tertiary accents
        'highlight': '#64748b', // Cool muted blue for highlights
        'muted': '#94a3b8', // Soft blue-gray for less emphasized elements
        'light-bg': '#f8fafc', // Softest light blue for light mode background
        'light-card': '#ffffff', // Pure white for light mode cards
        'light-text': '#1e293b', // Dark blue-gray matching the dark background, for text in light mode
        'info': '#a855f7', // Soft purple for informational elements
        'warning': '#facc15', // Bright yellow for warnings
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
