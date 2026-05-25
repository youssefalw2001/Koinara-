import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#020617',
        cyberGold: '#FACC15',
        alertRed: '#EF4444',
        deepBlue: '#08111F',
      },
      boxShadow: {
        radar: '0 0 70px rgba(250, 204, 21, 0.16)',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.96)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        decrypt: {
          '0%': { opacity: '0.35', filter: 'blur(2px)' },
          '50%': { opacity: '1', filter: 'blur(0)' },
          '100%': { opacity: '0.7', filter: 'blur(1px)' },
        },
      },
      animation: {
        radarSweep: 'radarSweep 3.5s linear infinite',
        scanPulse: 'scanPulse 2.2s ease-in-out infinite',
        decrypt: 'decrypt 0.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
