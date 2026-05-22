/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Cenote (turquesa maya) — acción, links, CTA principal ──
        "cenote": {
          50:  "#edfcfd",
          100: "#d0f6f8",
          200: "#a6ecf2",
          300: "#6adde7",
          400: "#28c6d6",
          500: "#0faabb",
          600: "#0e8a9e",
          700: "#126f7f",
          800: "#175a68",
          900: "#184b58",
          950: "#0a2f38",
        },
        // ── Tierra Maya (ocre) — tours privados, premium ──
        "tierra": {
          50:  "#fdf8ed",
          100: "#faefd0",
          200: "#f4db9d",
          300: "#edc063",
          400: "#e8a63b",
          500: "#e28a20",
          600: "#cb6917",
          700: "#a94d16",
          800: "#8a3d17",
          900: "#723317",
          950: "#401808",
        },
        // ── Caliza (arena cálida) — fondos, superficies ──
        "caliza": {
          50:  "#fdfcf9",
          100: "#f9f6ef",
          200: "#f0eadc",
          300: "#e4d8c4",
          400: "#d2bfa1",
          500: "#bca07d",
          600: "#a3815e",
          700: "#896848",
          800: "#70543c",
          900: "#5c4532",
          950: "#312318",
        },
        // ── Selva — acento secundario, badges natureza ──
        "selva": {
          50:  "#f0faf4",
          100: "#d9f3e4",
          200: "#b5e8cd",
          300: "#82d5ac",
          400: "#4cba84",
          500: "#29a06b",
          600: "#1a8257",
          700: "#166847",
          800: "#15533a",
          900: "#134531",
          950: "#07271c",
        },
        // ── Noche Maya — fondos oscuros, sección privados ──
        "noche": {
          50:  "#f4f6f9",
          100: "#e5eaf0",
          200: "#c8d3e3",
          300: "#9db1cb",
          400: "#6d8aae",
          500: "#4d6d94",
          600: "#3c577b",
          700: "#324764",
          800: "#2c3d54",
          900: "#1e2a3a",
          950: "#111827",
        },
        // ── Mantenemos primary/secondary para compatibilidad ──
        "primary": "#0e8a9e",
        "primary-dark": "#e28a20",
        "secondary": "#184b58",
        "background-light": "#fdfcf9",
        "background-dark": "#111827",
        "surface-light": "#ffffff",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "body": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        "brand": "0.18em",
      },
      boxShadow: {
        "card": "0 2px 20px 0 rgba(14, 75, 88, 0.07), 0 1px 4px 0 rgba(14, 75, 88, 0.04)",
        "card-hover": "0 12px 40px 0 rgba(14, 75, 88, 0.14), 0 4px 12px 0 rgba(14, 75, 88, 0.08)",
        "cta": "0 8px 30px 0 rgba(14, 138, 158, 0.35)",
        "whatsapp": "0 8px 32px 0 rgba(37, 211, 102, 0.40)",
      },
      backgroundImage: {
        'grain': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'slide-up': 'slide-up 0.8s ease-out',
        'slide-down': 'slide-down 0.8s ease-out',
        'slide-left': 'slide-left 0.8s ease-out',
        'slide-right': 'slide-right 0.8s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'wave': 'wave 2.5s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'swing': 'swing 3s ease-in-out infinite',
        'blur-in': 'blur-in 1s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'swing': {
          '0%, 100%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-3deg)' },
        },
        'blur-in': {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 5px rgba(7, 228, 244, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(7, 228, 244, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}