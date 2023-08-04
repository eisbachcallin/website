import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      aspectRatio: {
        din: '1 / 1.41',
      },
      maxWidth: {
        max: '180rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '.hashtag': {
              opacity: '0',
              position: 'absolute',
              marginLeft: '1ch',
              marginTop: '0',
              width: 'auto',
              height: 'auto',
              cursor: 'pointer',
            },
            'h1:hover .hashtag': {
              opacity: '100%',
            },
            'h2:hover .hashtag': {
              opacity: '100%',
            },
            'h3:hover .hashtag': {
              opacity: '100%',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
