/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    // screens: {
    //   'tablet': '640px',
    //   // => @media (min-width: 640px) { ... }
    //
    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }
    //
    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },
    fontFamily: {
      roboto: ['Roboto'],
    },
    fontStyle: {
      'oblique': 'oblique',
    },
    fontSize: {
      '57': '57px',
      '45': '45px',
      '36': '36px',
      '32': '32px',
      '28': '28px',
      '24': '24px',
      '22': '22px',
      '16': '16px',
      '14': '14px',
      '12': '12px',
      '11': '11px',
    },
    lineHeight: {
      '64': '64px',
      '52': '52px',
      '44': '44px',
      '40': '40px',
      '36': '36px',
      '32': '32px',
      '28': '28px',
      '24': '24px',
      '20': '20px',
      '16': '16px',
    },
    letterSpacing: {
      'tight': '-0.25px',
      'normal': '0.25px',
      'wide': '0.15px',
      'wider': '0.5px',
      'widest': '0.4px',
      'extra-wide': '0.1px',
    },
    fontWeight: {
      'light': 300,
      'normal': 400,
      'medium': 500,
      'lightBold': 600,
      'bold': 700,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        error: "#FF3363",
        success: "#7ED127",
        alert: "#FDD904",
        info: "#4D8EE7",
        lightCyan: "#D1F7FF",
        blanchedAlmond: "#FFE3CE",
        magnolia: "#EFE5FF",
        confirmOne: "#67B01A",
        confirmTwo: "#C5FD8B",
        confirmThree: "#E1FFC1",
        denyOne: "#FF3363",
        denyTwo: "#FEE4E2",
        denyThree: "#FEF3F2",
        lightGreen:"#CDFFC5",

        primary: {
          50: '#FFFFFF',
          100: '#EBFFFF',
          200: '#BBFFFF',
          300: '#8EFFE3',
          400: '#73FFCD',
          500: '#66F3B9', // Base color
          600: '#60E4AB',
          700: '#5FD49D',
          800: '#53C28E',
          900: '#4BA26F',
        },
        secondary: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D', // Base color
          600: '#495057',
          700: '#343A40',
          800: '#212529',
          900: '#12161A',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}