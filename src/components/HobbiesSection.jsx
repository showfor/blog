import { hobbies } from '../data/hobbies.js'
import { useLang } from '../context/LanguageProvider.jsx'
import GlowCard from './GlowCard.jsx'

// 爱好分类展示 —— 4 大板块（动漫 / 音乐 / 电影 / 小说）
// 复用 section-head / eyebrow / section-title 招牌标题样式
// 每个分类：标题光晕 → 简介 → GlowCard 列表

export default function HobbiesSection() {
  const { t } = useLang()

  return (
    <>
      {hobbies.map((h, idx) => (
        <section key={h.key} id={h.id} className="section hobby-section">
          <div className="container">
            {/* ── 招牌标题条（eyebrow + section-title + 绿光晕）── */}
            <div className="section-head">
              <span className="eyebrow">{t(h.eyebrow)}</span>
              <h2 className="section-title">{t(h.title)}</h2>
            </div>

            {/* ── 简介段落 ── */}
            <p className="hobby-intro">{t(h.intro)}</p>

            {/* ── 列表卡片 ── */}
            <div className="hobby-list">
              {h.items.map((item, i) => {
                // 音乐分类有 embed 字段时内嵌播放器
                if (h.key === 'music' && item.embed) {
                  return (
                    <div key={i} className="hobby-music-item">
                      <div className="hobby-music-info">
                        <span className="hobby-index">{String(i + 1).padStart(2, '0')}</span>
                        <div className="hobby-body">
                          <h3 className="hobby-title">{t(item)}</h3>
                          {item.note && <p className="hobby-note">{t(item.note)}</p>}
                        </div>
                      </div>
                      <iframe
                        className="hobby-music-player"
                        src={item.embed}
                        width="100%" height="66"
                        frameBorder="0"
                        title={t(item)}
                      />
                    </div>
                  )
                }
                return (
                  <GlowCard key={i} className="hobby-card" animated={idx === 0}>
                    <span className="hobby-index">{String(i + 1).padStart(2, '0')}</span>
                    <div className="hobby-body">
                      <h3 className="hobby-title">{t(item)}</h3>
                      {item.note && <p className="hobby-note">{t(item.note)}</p>}
                    </div>
                  </GlowCard>
                )
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
