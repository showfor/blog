import { useState, useEffect } from 'react'
import { useNotion } from '../context/NotionContext.jsx'
import {
  GlobeIcon,
  SunIcon,
  MoonIcon,
} from './NotionIcons.jsx'
import SolitudeQuote from './SolitudeQuote.jsx'

export default function NotionHeader() {
  const { lang, theme, toggleLang, toggleTheme } = useNotion()
  const [now, setNow] = useState(() => new Date())

  const isZh = lang === 'zh'

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

  return (
    <>
      {/* 顶部导航栏：白龙头像 + 实时精确时间跳动 */}
      <header className="notion-topbar">
        <div className="notion-brand">
          <div className="notion-avatar-wrapper">
            <img
              src="/haku-avatar.jpg"
              alt="赈早见琥珀主"
              className="notion-haku-avatar"
            />
          </div>
          <div className="notion-live-clock" title="当前实时时间">
            <span className="notion-clock-date">{dateStr}</span>
            <span className="notion-clock-time">{timeStr}</span>
          </div>
        </div>

        <div className="notion-top-actions">
          {/* 语言切换 */}
          <button
            type="button"
            className="notion-btn-pill"
            onClick={toggleLang}
            title={isZh ? 'Switch to English' : '切换到中文'}
          >
            <GlobeIcon size={13} />
            <span>{isZh ? 'EN' : '中文'}</span>
          </button>

          {/* 明暗模式切换 */}
          <button
            type="button"
            className="notion-btn-pill"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <MoonIcon size={13} /> : <SunIcon size={13} />}
            <span>{theme === 'light' ? (isZh ? '深色' : 'Dark') : (isZh ? '浅色' : 'Light')}</span>
          </button>
        </div>
      </header>

      {/* 英雄区：大标题 + 琥珀色气泡 + 《百年孤独》深邃段落 */}
      <div className="notion-hero-section">
        {/* 大标题与琥珀色高亮气泡 */}
        <h1 className="notion-hero-title">
          <span className="notion-title-text">hakuriver</span>
          <span className="notion-amber-badge">
            <span className="amber-dot" />
            <span>{isZh ? '赈早见琥珀主' : 'Kohaku'}</span>
          </span>
        </h1>

        {/* 《百年孤独》精选名言随机展示与深度考据组件 */}
        <SolitudeQuote />
      </div>
    </>
  )
}
