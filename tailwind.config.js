module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: { colors: {
        primary: '#3251D0',
    },},
    },
    plugins: [  require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),],
  };
  

