import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import GlowCard from './GlowCard.jsx'

// 关于我：bio 段落 + 四宫格数据指标 + 大字主张。
export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="section-head">
        <span className="eyebrow">About</span>
        <span className="section-index">01</span>
        <h2 className="section-title">关于我</h2>
      </div>

      <div className="about-grid">
        <Reveal className="about-bio">
          <p>{profile.bio}</p>
        </Reveal>
        <div className="about-stats">
          {profile.stats.map((s, i) => (
            <GlowCard key={s.label} className="stat-card" delay={i * 0.07}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </GlowCard>
          ))}
        </div>
      </div>

      <Reveal className="about-statement" delay={0.1}>
        {profile.slogan}
      </Reveal>
    </section>
  )
}
