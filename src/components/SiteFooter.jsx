import { useState, useEffect } from 'react'
import { i18n } from '../data/i18n.js'
import { profile } from '../data/profile.js'
import { useLang } from '../context/LanguageProvider.jsx'

// 计算站点运行时间
function calcUptime(launched) {
  const start = new Date(launched).getTime()
  const now = Date.now()
  const diff = now - start
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

// 页脚 SiteFooter：站主名/角色/定位 + 技术栈 pill + 站点运行时间。
export default function SiteFooter() {
  const { lang, t } = useLang()
  const [uptime, setUptime] = useState(() => calcUptime(profile.siteLaunched))

  useEffect(() => {
    const id = setInterval(() => {
      setUptime(calcUptime(profile.siteLaunched))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const isEn = lang === 'en'
  const uptimeText = isEn
    ? `${uptime.days}d ${String(uptime.hours).padStart(2, '0')}h ${String(uptime.minutes).padStart(2, '0')}m ${String(uptime.seconds).padStart(2, '0')}s`
    : `${uptime.days}天 ${String(uptime.hours).padStart(2, '0')}时 ${String(uptime.minutes).padStart(2, '0')}分 ${String(uptime.seconds).padStart(2, '0')}秒`

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-brand">
          <span className="site-footer-name">{t(i18n.nav.brand)}</span>
          <span className="site-footer-role"> / {t(profile.identity.role)}</span>
        </div>
        <div className="site-footer-meta">
          <span className="site-footer-location">{t(profile.identity.location)}</span>
          <div className="site-footer-stack">
            <span className="site-footer-stack-label">{t(i18n.footer.stack.label)}</span>
            {i18n.footer.stack.items.map((s, i) => (
              <span key={i} className="site-footer-stack-pill">{t(s)}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="container site-footer-uptime">
        <span className="site-footer-uptime-label">{isEn ? 'Site running for' : '本站已运行'}</span>
        <span className="site-footer-uptime-value">{uptimeText}</span>
      </div>
    </footer>
  )
}
