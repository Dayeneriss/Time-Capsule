/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF3366',
        secondary: '#FFD700',
        accent: '#FF8C00',
        background: '#130B21',
        card: '#281744',
        text: {
          light: '#FFFFFF',
          muted: '#FFA6C9',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'cosmic': 'linear-gradient(to right, #130B21, #281744, #FF3366 5%, #130B21)',
        'cosmic-dark': 'linear-gradient(to bottom, #130B21, #281744 30%, #130B21)',
        'magic': 'linear-gradient(45deg, #FF3366, #FFD700, #FF8C00)',
        'magic-shine': 'linear-gradient(60deg, #FF3366 -20%, #FFD700 50%, #FF8C00 80%)',
        'ethereal': 'radial-gradient(circle at center, #FF3366 0%, #281744 40%, #130B21 100%)',
        'stardust': 'linear-gradient(180deg, transparent, #FF336610 15%, #FFD70010 50%, transparent)',
        'aurora': 'linear-gradient(60deg, #FF336630 -30%, #FFD70020 30%, #FF8C0030 60%, transparent)',
        'nebula': 'radial-gradient(ellipse at top, #FF336615 0%, #28174430 50%, transparent 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'shimmer': 'shimmer 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 51, 102, 0.5)',
        'gold': '0 0 20px rgba(255, 215, 0, 0.5)',
        'cosmic': '0 0 30px rgba(255, 51, 102, 0.3), 0 0 60px rgba(255, 215, 0, 0.2)',
      }
    },
  },
  plugins: [],
}