import { createContext, useContext, useState, useEffect } from 'react'

const NotionContext = createContext(null)

const STORAGE_LANG = 'notion_lang'
const STORAGE_THEME = 'notion_theme'

export function NotionProvider({ children }) {
  // 语言状态：默认中文 'zh'，支持 'en'
  const [lang, setLangState] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = window.localStorage.getItem(STORAGE_LANG)
        if (saved === 'en' || saved === 'zh') return saved
      }
    } catch {
      // ignore
    }
    return 'zh'
  })

  // 主题状态：默认浅色 'light'，支持 'dark'
  const [theme, setThemeState] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = window.localStorage.getItem(STORAGE_THEME)
        if (saved === 'light' || saved === 'dark') return saved
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
      }
    } catch {
      // ignore
    }
    return 'light'
  })

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_LANG, lang)
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
      }
    } catch {
      // ignore
    }
  }, [lang])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_THEME, theme)
        document.documentElement.setAttribute('data-theme', theme)
      }
    } catch {
      // ignore
    }
  }, [theme])

  const toggleLang = () => {
    setLangState((prev) => (prev === 'zh' ? 'en' : 'zh'))
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const t = (obj) => {
    if (obj == null) return ''
    if (typeof obj === 'string') return obj
    if (lang === 'zh') return obj.cn || obj.zh || obj.en || ''
    return obj.en || obj.cn || obj.zh || ''
  }

  return (
    <NotionContext.Provider value={{ lang, theme, toggleLang, toggleTheme, t }}>
      {children}
    </NotionContext.Provider>
  )
}

export function useNotion() {
  const ctx = useContext(NotionContext)
  if (!ctx) throw new Error('useNotion must be used within NotionProvider')
  return ctx
}
