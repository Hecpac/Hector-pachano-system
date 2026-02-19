'use client'

import { useEffect, useState } from 'react'

type ThemeMode = 'contrast' | 'minimal'

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('contrast')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="theme-toggle" role="group" aria-label="Modo visual">
      <button
        type="button"
        className={`theme-toggle__btn ${theme === 'contrast' ? 'is-active' : ''}`}
        aria-pressed={theme === 'contrast'}
        onClick={() => setTheme('contrast')}
      >
        Contraste
      </button>
      <button
        type="button"
        className={`theme-toggle__btn ${theme === 'minimal' ? 'is-active' : ''}`}
        aria-pressed={theme === 'minimal'}
        onClick={() => setTheme('minimal')}
      >
        Minimal
      </button>
    </div>
  )
}
