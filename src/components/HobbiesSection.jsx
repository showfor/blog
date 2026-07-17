import { hobbies } from '../data/hobbies.js'
import GlowCard from './GlowCard.jsx'

// 我的爱好：卡片网格，点击跳转豆瓣（精确/搜索链接由数据决定）。
export default function HobbiesSection() {
  return (
    <section id="hobbies" className="section">
      <div className="section-head">
        <span className="eyebrow">Hobbies</span>
        <h2 className="section-title">我的爱好</h2>
        <p className="section-sub">让生活慢下来、亮起来的那些小事。</p>
      </div>
      <div className="hobby-grid">
        {hobbies.map((h, i) => (
          <GlowCard
            key={h.title}
            as="a"
            className="hobby-card"
            href={h.douban}
            target="_blank"
            rel="noopener noreferrer"
            delay={i * 0.06}
          >
            <div className="hobby-emoji">{h.emoji}</div>
            <h3 className="hobby-title">{h.title}</h3>
            <p className="hobby-desc">{h.desc}</p>
            <span className="douban-badge">豆瓣</span>
          </GlowCard>
        ))}
      </div>
    </section>
  )
}
