import { useNotion } from '../context/NotionContext.jsx'
import {
  MusicIcon,
  BookIcon,
  AnimeIcon,
  FilmIcon,
  HeadphoneIcon,
  CircleArrowIcon,
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
    music: { en: 'Soundtracks, post-rock, and ambient electronica.', cn: '用纯粹的原声带与后摇，构筑沉浸创作空间。' },
    novels: { en: 'Science fiction and contemporary literature.', cn: '硬科幻与文学巨著，通往浩瀚无限的世界。' },
    anime: { en: 'Dark fantasy, time-travel, and visual poetry.', cn: '热血奇幻与时间旅行，帧帧皆是叙事巅峰。' },
    movies: { en: 'Cinema that bends time and challenges perception.', cn: '改变时间感知与认知边界的神作银幕精选。' },
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
      {/* 顶部标题栏（Notion 官网大卡片特征） */}
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

        <CircleArrowIcon />
      </div>

      {/* 悬浮白底内嵌卡片（Notion 官网标志性 UI 预览卡片） */}
      <div className="notion-preview-surface">
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
      </div>
    </section>
  )
}
