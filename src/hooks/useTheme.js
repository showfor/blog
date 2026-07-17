import { useEffect, useState } from 'react'

// 明暗主题：读取本地偏好，默认跟随系统；切换时写入 localStorage 与 <html data-theme>。
export function useTheme() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const initial = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(initial)
    document.documentElement.dataset.theme = initial ? 'dark' : 'light'
  }, [])
  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
  }
  return [isDark, toggleTheme]
}
