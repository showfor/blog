import { profile } from '../data/profile.js'
import { useLang } from '../context/LanguageProvider.jsx'
import BackgroundFX from './BackgroundFX.jsx'
import AppIcon from './AppIcon.jsx'

// 首屏 HeroSection（#top）：纯 CSS 渐变/粒子背景 + 双语 Hero + 职业标签（站主名 Amber River）。
export default function HeroSection() {
  const { t } = useLang()
  const { hero } = profile

  const go = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="top" className="hero">
      <div className="hero-bg">
        <BackgroundFX />
        <div className="hero-scrim" aria-hidden="true" />
      </div>

      <div className="container hero-inner">
        <p className="hero-greeting">{t(hero.greeting)}</p>
        <h1 className="hero-title">{t(hero.name)}</h1>

        <div className="hero-tags">
          {hero.tags.map((tag) => (
            <span key={tag.en} className="tag">{t(tag)}</span>
          ))}
        </div>

        <p className="hero-claim">{t(hero.claim)}</p>
        <p className="hero-bio">{t(hero.bio)}</p>

        <div className="hero-cta">
          <a className="btn btn-primary" href={hero.primaryCta.href}>
            <AppIcon name="mail" /> {t(hero.primaryCta)}
          </a>
          <a className="btn btn-ghost" href={hero.secondaryCta.href} onClick={(e) => go(e, hero.secondaryCta.href)}>
            <AppIcon name="grid" /> {t(hero.secondaryCta)}
          </a>
        </div>

        <a className="hero-scroll" href={hero.scrollHint.href} onClick={(e) => go(e, hero.scrollHint.href)}>
          {t(hero.scrollHint)}
        </a>
      </div>
    </section>
  )
}
