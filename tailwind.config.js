/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#047857', // Deep Emerald
          focus: '#065f46',
          content: '#ffffff',
        },
        secondary: {
          DEFAULT: '#D4AF37', // Gold/Bronze
          focus: '#b5952f',
          content: '#ffffff',
        },
        accent: {
          DEFAULT: '#10B981', // Light Sage
          focus: '#059669',
          content: '#ffffff',
        },
        neutral: {
          DEFAULT: '#F3F4F6', // Warm Grey
          focus: '#E5E7EB',
          content: '#1f2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms')
  ],
  daisyui: {
    themes: [
      {
        emerald_islamic: {
          "primary": "#047857",
          "secondary": "#D4AF37",
          "accent": "#10B981",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      "light",
    ],
  },
}
