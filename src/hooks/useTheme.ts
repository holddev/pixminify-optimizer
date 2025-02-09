import { useEffect, useState } from "react"

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
  const userPrefetchTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  return userPrefetchTheme
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme())

  const ToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return { theme, ToggleTheme }
}