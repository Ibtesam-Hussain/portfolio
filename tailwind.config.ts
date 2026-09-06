import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-dim': 'var(--paper-dim)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        line: 'var(--line)',
        signal: 'var(--signal)',
      },
      fontFamily: {
        sans: ['-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['SFMono-Regular', 'SF Mono', 'Cascadia Code', 'Consolas', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};

export default config;