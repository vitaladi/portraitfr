module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      safelist: [
        {
          pattern: /(top|left)-\[.+\]/,
        },
      ],    
      colors: {
        orange: {
          500: '#F77F00',
          300: '#FCBF49',
          700: '#D36A00',
        },
        blue: {
          900: '#003049',
        },
        cream: '#EAE2B7',
      },
        fond: '#0a0a0a', // Assurez-vous que cette couleur est bien définie

      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        smooth: '0 0 20px rgba(0, 0, 0, 0.3)',
      },
      
    },
  },
  plugins: [],
}