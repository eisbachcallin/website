import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        default: 'var(--color-bg-default)',
        invert: 'var(--color-bg-invert)',
        accent: 'var(--color-bg-accent)',
      },
      borderColor: {
        default: 'var(--color-border-default)',
        invert: 'var(--color-border-invert)',
        accent: 'var(--color-border-accent)',
      },
      textColor: {
        default: 'var(--color-text-default)',
        invert: 'var(--color-text-invert)',
        accent: 'var(--color-text-accent)',
        onaccent: 'var(--color-text-onaccent)',
      },
      stroke: {
        default: 'var(--color-stroke-default)',
        invert: 'var(--color-stroke-invert)',
        accent: 'var(--color-stroke-accent)',
      },
      fill: {
        default: 'var(--color-fill-default)',
        invert: 'var(--color-fill-invert)',
        accent: 'var(--color-fill-accent)',
      },
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
            '--tw-prose-body': theme('textColor.default'),
            '--tw-prose-headings': theme('textColor.default'),
            '--tw-prose-lead': theme('textColor.default'),
            '--tw-prose-links': theme('textColor.accent'),
            '--tw-prose-bold': theme('textColor.default'),
            '--tw-prose-counters': theme('textColor.default'),
            '--tw-prose-bullets': theme('textColor.default'),
            '--tw-prose-hr': theme('textColor.default'),
            '--tw-prose-quotes': theme('textColor.default'),
            '--tw-prose-quote-borders': theme('borderColor.default'),
            '--tw-prose-captions': theme('textColor.default'),
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
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
