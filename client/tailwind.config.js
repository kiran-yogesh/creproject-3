/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "fade-in-up": "fadeInUp 1s ease-out",
        "bounce-slow": "bounce 3s infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)"
          }
        }
      }
    }
  },
  plugins: []
};
