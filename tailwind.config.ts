import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1c1917',
        ember: '#f59e0b',
        smoke: '#292524'
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.76, 0, 0.24, 1)'
      },
      boxShadow: {
        ember: '0 0 40px rgba(245, 158, 11, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
