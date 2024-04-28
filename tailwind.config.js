/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {

      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      'mobile': '280px'
    },
    extend: {
      colors: {
        loginBg: "#F8FAFC",
        main_color: "#4D44B5",
        orange: "#FB7D5B",
        jaune:"#FCC43E",
        bgPopup: 'rgba(0, 0, 0, 0.7)'
      },
    },
  },
  plugins: [],
};
