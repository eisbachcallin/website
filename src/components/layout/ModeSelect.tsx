'use client'

import { useEffect, useState } from 'react'

const THEME_LIGHT = 'theme-light'
const THEME_DARK = 'theme-dark'

export function ModeSelect() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    const currentMode = theme
      ? theme === THEME_DARK
      : document.documentElement.classList.contains(THEME_DARK)
    setIsDarkMode(currentMode)
    if (currentMode) {
      document.documentElement.classList.add(THEME_DARK)
    } else {
      document.documentElement.classList.add(THEME_LIGHT)
    }
  }, [])

  function toggleMode() {
    const nextTheme = isDarkMode ? THEME_LIGHT : THEME_DARK
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.remove(
      isDarkMode ? THEME_DARK : THEME_LIGHT
    )
    document.documentElement.classList.add(nextTheme)
    window.localStorage.setItem('theme', nextTheme)
  }

  return (
    <button
      type='button'
      className='inline-flex items-center justify-center bg-accent uppercase text-onaccent'
      aria-label='Toggle color mode'
      onClick={toggleMode}
    >
      {isDarkMode ? 'Light' : 'Dark'}
    </button>
  )
}
