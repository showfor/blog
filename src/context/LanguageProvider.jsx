import { createContext, useContext, useState, useEffect } from 'react'
import { devLog } from '../components/DevPanel.jsx'

// 语言上下文：提供 lang 状态、setLang（写入 localStorage）与取数函数 t。
// 默认语言为 'en'；t(obj) 取 obj[lang]，缺失时回退 obj.en。
const LanguageContext = createContext(null)
const STORAGE_KEY = 'lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'cn') return saved
    }
    return 'en'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'cn' ? 'zh-CN' : 'en'
  }, [lang])

  const setLang = (next) => {
    if (next === 'en' || next === 'cn') {
      setLangState(next)
      devLog('lang', `Language switched to ${next === 'en' ? 'English' : '中文'}`, next)
    }
  }

  const t = (obj) => {
    if (obj == null) return ''
    if (obj[lang] != null) return obj[lang]
    if (obj.en != null) return obj.en
    return ''
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 组件内取用语言上下文。
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
