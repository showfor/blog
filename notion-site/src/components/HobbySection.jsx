import { useNotion } from '../context/NotionContext.jsx'
import {
  PageDocIcon,
  MusicIcon,
  BookIcon,
  AnimeIcon,
  FilmIcon,
  HeadphoneIcon,
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

  const categorySubheadMap = {
    music: {
      en: 'Melody is the emotional undercurrent, resonating through quietude.',
      cn: '旋律是情绪的暗流，在寂静中激荡出无尽的声浪。',
    },
    novels: {
      en: 'Within the boundless cosmos of words, wandering with solitary souls.',
      cn: '在文字构筑的浩瀚宇宙里，与千百种深邃的灵魂相逢。',
    },
    anime: {
      en: 'Timeless light and indelible bonds, frozen beyond reality.',
      cn: '那些超越现实的光影与羁绊，定格了永不褪色的感动。',
    },
    movies: {
      en: 'Borrowing two hours of light and shadow to live another life.',
      cn: '借两小时的光影幻梦，在平行时空里体验另一种人生。',
    },
  }

  const renderCategoryIcon = (key) => {
    switch (key) {
      case 'music': return <MusicIcon size={18} />
      case 'novels': return <BookIcon size={18} />
      case 'anime': return <AnimeIcon size={18} />
      case 'movies': return <FilmIcon size={18} />
      default: return null
    }
  }

  return (
    <section id={category.id} className="notion-feature-card">
      {/* 顶部标题区（优雅质感文学排版） */}
      <div className="notion-feature-header">
        <div className="notion-feature-info">
          <div className="notion-feature-eyebrow">
            <span className="notion-feature-badge">
              {renderCategoryIcon(category.key)}
              <span>{t(category.title)}</span>
            </span>
            <span className="notion-feature-eyebrow-text">{t(category.eyebrow)}</span>
          </div>

          <h2 className="notion-feature-title">
            {t(categorySubheadMap[category.key])}
          </h2>
        </div>
      </div>

      {/* 悬浮白底 Notion 预览视窗 */}
      <div className="notion-preview-surface">
        {/* 视窗条目列表 */}
        <div className="notion-list">
          {category.items.map((item, idx) => (
            <div key={idx} className="notion-item">
              <span className="notion-item-icon">
                <PageDocIcon size={14} />
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

                {/* 针对特定条目的音频链接 */}
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
      </div>
    </section>
  )
}
