import { useRef, useState, useEffect } from 'react'
import { hobbies } from '../data/hobbies.js'
import { useLang } from '../context/LanguageProvider.jsx'
import GlowCard from './GlowCard.jsx'

// 延迟懒加载音乐播放器：仅当滚动到视口附近（300px）时才加载 iframe，
// 彻底解决首屏 6 个网易云外链 iframe 抢占主线程、阻塞初始渲染和首屏滑动的性能瓶颈。
function MusicPlayerEmbed({ embed, title, url }) {
  const [inView, setInView] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { rootMargin: '300px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="hobby-music-player-wrap">
      {inView ? (
        <iframe
          className="hobby-music-player"
          src={embed}
          width="100%"
          height="152"
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          referrerPolicy="no-referrer"
          title={title}
        />
      ) : (
        <div className="hobby-music-player-placeholder">
          <span className="hobby-music-loading-dot" />
          <span>音频就绪中...</span>
        </div>
      )}
      {url && (
        <a
          className="hobby-music-open"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          在网易云打开 →
        </a>
      )}
    </div>
  )
}

// 爱好分类展示 —— 4 大板块（动漫 / 音乐 / 电影 / 小说）
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
                // 音乐分类有 embed 字段时内嵌播放器（视口懒加载）
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
                      <MusicPlayerEmbed embed={item.embed} title={t(item)} url={item.url} />
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
