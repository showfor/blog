import { capabilities } from '../data/capabilities.js'
import GlowCard from './GlowCard.jsx'
import AppIcon from './AppIcon.jsx'

// 个人优势 StrengthsSection（#strengths）：4 张优势卡（图标 + 标题 + 描述）。
export default function StrengthsSection() {
  return (
    <section id="strengths" className="section strengths">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Capabilities</span>
          <h2 className="section-title">个人优势</h2>
        </div>

        <div className="strength-grid">
          {capabilities.map((c, i) => (
            <GlowCard key={c.id} className="strength-card" delay={i * 0.06}>
              <div className="strength-icon">
                <AppIcon name={c.icon} />
              </div>
              <h3 className="strength-title">{c.title}</h3>
              <p className="strength-desc">{c.desc}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
