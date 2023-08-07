'use client'

import { useTheme } from 'next-themes'

export function ModeSelect() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type='button'
      className='inline-flex items-center justify-center bg-accent text-sm uppercase text-onaccent'
      aria-label='Toggle color mode'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Light/Dark
    </button>
  )
}
