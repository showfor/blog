import { useNotion } from '../context/NotionContext.jsx'
import {
  MusicIcon,
  BookIcon,
  AnimeIcon,
  FilmIcon,
  HeadphoneIcon,
  QuoteIcon,
  ArrowUpRightIcon,
} from './NotionIcons.jsx'

export default function HobbySection({ category }) {
  const { t, lang } = useNotion()

  const isZh = lang === 'zh'
  const tagClassMap = {
    music: 'tag-music',
    novels: 'tag-novels',
    anime: 'tag-anime',
    movies: 'tag-movies',
  }

  const renderCategoryIcon = (key) => {
    switch (key) {
      case 'music': return <MusicIcon size={20} />
      case 'novels': return <BookIcon size={20} />
      case 'anime': return <AnimeIcon size={20} />
      case 'movies': return <FilmIcon size={20} />
      default: return null
    }
  }

  return (
    <section id={category.id} className="notion-section">
      {/* 章节标题区 */}
      <div className="notion-section-head">
        <h2 className="notion-section-title">
          <span className="notion-section-icon-badge">
            {renderCategoryIcon(category.key)}
          </span>
          <span>{t(category.title)}</span>
        </h2>
        <span className="notion-section-eyebrow">{t(category.eyebrow)}</span>
      </div>

      {/* 章节简介 Callout */}
      <div className="notion-callout notion-callout-subtle">
        <span className="notion-callout-icon">
          <QuoteIcon size={16} />
        </span>
        <div className="notion-callout-text">
          {t(category.intro)}
        </div>
      </div>

      <hr className="notion-divider" />

      {/* 详细条目列表（Notion 极简纯净 Inline List） */}
      <div className="notion-list">
        {category.items.map((item, idx) => (
          <div key={idx} className="notion-item">
            <span className="notion-item-num">
              {String(idx + 1).padStart(2, '0')}.
            </span>
            <div className="notion-item-content">
              <div className="notion-item-header">
                <h3 className="notion-item-title">{t(item)}</h3>
                {item.tag && (
                  <span className={`notion-tag ${tagClassMap[category.key] || ''}`}>
                    {item.tag}
                  </span>
                )}
              </div>

              {/* 补充作者/简介/短评信息 */}
              {item.note && (
                <p className="notion-item-note">{t(item.note)}</p>
              )}

              {/* 针对千与千寻的网易云内嵌播放器 */}
              {item.embed && (
                <div className="notion-embed-block">
                  <iframe
                    className="notion-iframe"
                    src={item.embed}
                    title={t(item)}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {item.url && (
                    <a
                      className="notion-embed-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <HeadphoneIcon size={14} />
                      <span>{isZh ? '在网易云音乐中收听完整版' : 'Listen on NetEase Music'}</span>
                      <ArrowUpRightIcon size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
