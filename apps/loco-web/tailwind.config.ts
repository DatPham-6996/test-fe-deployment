import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

// Do not change the variable in extend. Those are set by shadcn and referenced in global.css
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'dark-gradient-to-b': 'linear-gradient(to bottom, #454728, #0f1112 200px)',
        'light-gradient-to-b': 'linear-gradient(to bottom, #cce3f1, #e7e9ef 200px)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      strokeWidth: {
        '0.75': '0.75px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        // sans: ['var(--font-sans)', ...fontFamily.sans],
        // poppins: ['Poppins', 'sans-serif'],
        sans: ['FZ Poppins', 'sans-serif'],
        poppins: ['FZ Poppins', 'sans-serif'],
      },
      fontSize: {
        tiny: '0.6rem', // You can adjust this value as needed
      },
    },
  },
  keyframes: {
    'collapsible-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-collapsible-content-height)' },
    },
    'collapsible-up': {
      from: { height: 'var(--radix-collapsible-content-height)' },
      to: { height: '0' },
    },
  },
  animation: {
    'collapsible-down': 'collapsible-down 0.2s ease-out',
    'collapsible-up': 'collapsible-up 0.2s ease-out',
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} satisfies Config;

export default config;
