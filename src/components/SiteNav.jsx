import { useEffect, useState } from 'react'
import { nav } from '../data/nav.js'
import AppIcon from './AppIcon.jsx'

// 顶部导航 SiteNav：Logo（琥珀川）+ 锚点 [经历][项目][优势][联系] + CTA 联系我。
// 滚动超过首屏后进入 floating 高亮态（is-floating）。
export default function SiteNav() {
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 锚点跳转：阻止默认跳变，使用 scrollIntoView 平滑滚动（配合 CSS scroll-margin-top 偏移）。
  const go = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`site-nav ${floating ? 'is-floating' : ''}`}>
      <div className="container site-nav-inner">
        <a className="site-nav-brand" href="#top" onClick={(e) => go(e, '#top')}>
          <span className="site-nav-mark">{nav.mark}</span>
          <span className="site-nav-brand-name">{nav.brand}</span>
        </a>

        <nav className="site-nav-links">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="site-nav-link"
              onClick={(e) => go(e, l.href)}
            >
              [{l.label}]
            </a>
          ))}
        </nav>

        <a className="btn btn-primary site-nav-cta" href={nav.cta.href}>
          <AppIcon name="mail" /> {nav.cta.label}
        </a>
      </div>
    </header>
  )
}
