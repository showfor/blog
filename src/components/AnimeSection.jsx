import { animeList } from '../data/anime.js'
import { asset } from '../utils.js'
import GlowCard from './GlowCard.jsx'

// 我爱看的动漫：竖图卡片，点击跳转豆瓣。
export default function AnimeSection() {
  return (
    <section id="anime" className="section">
      <div className="section-head">
        <span className="eyebrow">Anime</span>
        <h2 className="section-title">我爱看的动漫</h2>
        <p className="section-sub">二度元里，藏着我的热血与温柔。</p>
      </div>
      <div className="anime-grid">
        {animeList.map((a, i) => (
          <GlowCard
            key={a.title}
            as="a"
            className="anime-card"
            href={a.douban}
            target="_blank"
            rel="noopener noreferrer"
            delay={i * 0.06}
          >
            <div className="anime-cover">
              <img src={asset(a.cover)} alt={a.title} loading="lazy" />
              <span className="douban-badge cover-badge">豆瓣</span>
            </div>
            <div className="anime-info">
              <h3 className="anime-title">{a.title}</h3>
              <p className="anime-meta">{a.meta}</p>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  )
}
