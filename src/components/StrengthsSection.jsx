import { profile } from '../data/profile.js'
import GlowCard from './GlowCard.jsx'

// 个人优势：四张能力卡（仿 gerenzhan 的 Capabilities）。
export default function StrengthsSection() {
  return (
    <section id="strengths" className="section">
      <div className="section-head">
        <span className="eyebrow">Capabilities</span>
        <span className="section-index">02</span>
        <h2 className="section-title">个人优势</h2>
        <p className="section-sub">不是简历式的罗列，而是我对待生活与创作的方式。</p>
      </div>

      <div className="strength-grid">
        {profile.strengths.map((s, i) => (
          <GlowCard
            key={s.title}
            className="strength-card"
            delay={i * 0.07}
          >
            <span className="strength-no">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="strength-title">{s.title}</h3>
            <p className="strength-desc">{s.desc}</p>
          </GlowCard>
        ))}
      </div>
    </section>
  )
}
