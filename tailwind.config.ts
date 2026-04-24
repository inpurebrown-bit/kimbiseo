import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // data-theme 속성으로 제어
  theme: {
    extend: {
      colors: {
        // 라이트 모드 기본 색상
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        danger: '#f5576c',
      },
      backgroundImage: {
        // 그라디언트 배경
        'light-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 75%, #f5576c 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0f0f23 0%, #1a1040 25%, #0d1b3e 75%, #160d2e 100%)',
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(102, 126, 234, 0.18)',
        'glass-dark': '0 8px 32px rgba(10, 10, 30, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
