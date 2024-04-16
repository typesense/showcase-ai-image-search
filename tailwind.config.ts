import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      sans: 'var(--font-inter)',
      serif: ['ui-serif', 'Georgia'],
      mono: 'var(--font-roboto-mono)',
    },
    colors: {
      current: 'currentColor',
      accent: '#d90368',
      'dark-500': '#232526',
      'dark-900': '#0f0c0d',
      'dark-950': '#060606',
      'white-100': '#F9F9F9',
      'white-200': '#F5F5F5',
      'white-300': '#8d7883',
      'white-400': '#A1A1A1',
    },
    fontSize: {
      xs: ['var(--step--2)', '1rem'],
      sm: ['var(--step--1)', '1.25rem'],
      base: 'var(--step-0)',
      xl: 'var(--step-1)',
      '2xl': 'var(--step-2)',
      '3xl': 'var(--step-3)',
      '4xl': 'var(--step-4)',
      '5xl': 'var(--step-5)',
    },
    keyframes: {
      fadeIn: {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
    },
  },
  plugins: [],
};
export default config;
