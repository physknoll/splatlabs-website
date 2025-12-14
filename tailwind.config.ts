import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent - keep the orange for CTAs and highlights
        rock: {
          orange: '#FF5F1F',
          'orange-light': '#FF7A45',
          'orange-dark': '#E54A0F',
        },
        // Light theme colors
        light: {
          bg: '#FFFFFF',
          'bg-alt': '#FAFAFA',
          'bg-subtle': '#F5F5F5',
          surface: '#FFFFFF',
          'surface-raised': '#FFFFFF',
          border: '#E5E7EB',
          'border-strong': '#D1D5DB',
        },
        // Text colors for light backgrounds
        content: {
          primary: '#1a1a1a',
          secondary: '#4B5563',
          muted: '#6B7280',
          dim: '#9CA3AF',
        },
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        body: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'soft-md': '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 20px 25px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'glow-sm': '0 0 20px rgba(255, 95, 31, 0.15)',
        'glow-md': '0 0 40px rgba(255, 95, 31, 0.2)',
        'product': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #FFF7ED 100%)',
        'section-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
