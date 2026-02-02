import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0f0f14',
          light: '#1a1a24',
          card: 'rgba(26, 26, 36, 0.6)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.15)',
        },
        primary: {
          DEFAULT: '#e879f9',
          dark: '#c026d3',
          light: '#f0abfc',
        },
        accent: {
          DEFAULT: '#f97316',
          light: '#fb923c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 30px rgba(232, 121, 249, 0.3)',
        'glow-strong': '0 0 50px rgba(232, 121, 249, 0.5)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.3)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
