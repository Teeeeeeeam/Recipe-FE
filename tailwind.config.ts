import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#D4D4D4',
        },
        green: {
          50: '#214D3333',
          100: '#214D33',
          150: '#3E794E',
        },
        red: {
          50: '#FF3F3F',
        },
        navy: {
          50: '#232E50',
          100: '#444F69',
          150: '#EDF2F7',
          200: '#EDF1F5',
        },
        blue: {
          50: '#246BEB',
          100: '#3B8AC4',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
