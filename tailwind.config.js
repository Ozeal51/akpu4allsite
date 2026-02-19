/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12"
        },
        brown: {
          600: "#7c4a2f",
          700: "#5f3823",
          800: "#422718"
        },
        deepgreen: {
          600: "#065f46",
          700: "#064e3b",
          800: "#033326"
        },
        cream: {
          50: "#faf7f2",
          100: "#f5efe3"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
}
