import { movieList } from '../data/movies.js'
import { asset } from '../utils.js'
import GlowCard from './GlowCard.jsx'

// 评分人数格式化：>=1万 显示「X.X万人评价」，否则「N人评价」。
function formatVotes(n) {
  if (!n) return ''
  if (n >= 10000) return (n / 10000).toFixed(1) + '万人评价'
  return n + '人评价'
}

// 我爱看的电影：竖图卡片，封面角标显示评分，信息区列出评分与人数，点击跳转豆瓣条目页。
export default function MoviesSection() {
  return (
    <section id="movies" className="section">
      <div className="section-head">
        <span className="eyebrow">Films</span>
        <h2 className="section-title">我爱看的电影</h2>
        <p className="section-sub">在别人的故事里，照见自己的生活。</p>
      </div>
      <div className="movie-grid">
        {movieList.map((m, i) => (
          <GlowCard
            key={m.title}
            as="a"
            className="movie-card"
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            delay={i * 0.06}
          >
            <div className="movie-cover">
              <img src={asset(m.cover)} alt={m.title} loading="lazy" />
              {m.rating !== undefined && m.rating !== null && (
                <span className="movie-rating">★ {m.rating}</span>
              )}
              <span className="movie-year">{m.year}</span>
              <span className="douban-badge cover-badge">豆瓣</span>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{m.title}</h3>
              {m.rating !== undefined && m.rating !== null && (
                <p className="movie-rating-line">
                  <span className="movie-rating-num">豆瓣 {m.rating}</span>
                  {formatVotes(m.votes) && (
                    <span className="movie-votes">{formatVotes(m.votes)}</span>
                  )}
                </p>
              )}
              <p className="movie-note">{m.note}</p>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  )
}
