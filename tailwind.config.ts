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
      accent: '#4db8ff',
      'dark-900': '#0A0B0B',
      'dark-950': '#060606',
      'white-100': '#F9F9F9',
      'white-200': '#F5F5F5',
      'white-300': '#707d83',
    },
    // that is animation class
    animation: {
      fadeIn: 'var(--fadeIn)',
    },
  },
  plugins: [],
};
export default config;
