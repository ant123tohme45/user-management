// tailwind.config.js
module.exports = {
    darkMode: 'class',  // Use class-based dark mode
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}',  // Adjust this path if needed
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3251D0', // Custom primary color (example)
        },
      },
    },
    plugins: [],
  };
  