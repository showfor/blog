import { profile } from '../data/profile.js'
import { asset } from '../utils.js'

// 首屏 HeroSection（#top）：视频背景 + 标签 + H1 琥珀川 + 主张 + 大标语 + 双按钮 + 滚动提示。
// 文案全部来自 profile.hero，组件不内联。
export default function HeroSection() {
  const { hero } = profile
  return (
    <section id="top" className="hero">
      <div className="hero-bg">
        {/* 降级层：视频未加载时显示 CSS 径向渐变 + grain，不报错 */}
        <div className="hero-fallback" aria-hidden="true" />
        <video
          className="hero-video"
          src={asset('assets/hero-background.mp4')}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
      </div>

      <div className="container hero-inner">
        <div className="hero-tags">
          {hero.tags.map((t) => (
            <span key={t} className="tag">[{t}]</span>
          ))}
        </div>

        <h1 className="hero-title">{hero.headline}</h1>

        <div className="hero-stat">
          <span className="hero-stat-value">{hero.statValue}</span>
          <span className="hero-stat-label">{hero.statLabel}</span>
        </div>

        <p className="hero-claim">{hero.claim}</p>

        <h2 className="hero-slogan">
          {hero.slogan.map((s, i) => (
            <span key={i} className={i === 1 ? 'hero-slogan-em' : undefined}>
              {i === 2 ? <br /> : null}
              {s}
            </span>
          ))}
        </h2>

        <div className="hero-cta">
          <a className="btn btn-primary" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn-ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>

        <a className="hero-scroll" href={hero.scrollHint.href}>
          {hero.scrollHint.label}
        </a>
      </div>
    </section>
  )
}
