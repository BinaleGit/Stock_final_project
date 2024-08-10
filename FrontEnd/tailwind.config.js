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
        'dark-text': '#b5dcff', // Light blue for text, providing a soft contrast
        'primary': '#4494fc', // Bright sky blue for primary elements
        'secondary': '#8fbfff', // Bright sky blue for primary elements

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
