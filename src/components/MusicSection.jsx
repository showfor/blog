import { musicCategories } from '../data/music.js'
import { asset } from '../utils.js'
import GlowCard from './GlowCard.jsx'

// 我爱的音乐：按分类组织，每首跳转网易云单曲页（精确链接）。
export default function MusicSection() {
  return (
    <section id="music" className="section">
      <div className="section-head">
        <span className="eyebrow">Music</span>
        <h2 className="section-title">我爱的音乐</h2>
        <p className="section-sub">按心情分类的循环歌单。</p>
      </div>

      {musicCategories.map((cat) => (
        <div key={cat.name} className="music-cat">
          <h3 className="music-cat-name">{cat.name}</h3>
          <div className="music-grid">
            {cat.songs.map((song, i) => (
              <GlowCard
                key={song.title}
                as="a"
                className="music-card"
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                delay={i * 0.05}
              >
                <div className="music-cover">
                  <img src={asset(song.cover)} alt={song.title} loading="lazy" />
                </div>
                <div className="music-info">
                  <p className="music-title">{song.title}</p>
                  <p className="music-artist">{song.artist}</p>
                  <p className="music-album">{song.album}</p>
                  <span className="ne-badge">网易云</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
