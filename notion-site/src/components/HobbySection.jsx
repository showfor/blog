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
    music: { en: 'Immerse every creative session in soundtracks and post-rock.', cn: '用纯粹的原声带与后摇，沉浸每一次专注与创作。' },
    novels: { en: 'Navigate through boundless time and thought via literature.', cn: '用文字的罗盘，在浩瀚时空里漫游探索。' },
    anime: { en: 'Revisit emotional peaks through unforgettable storytelling.', cn: '用跌宕的故事，重温触动灵魂的每一次感动。' },
    movies: { en: 'Experience another life in a parallel dimension through cinema.', cn: '用两小时的银幕，体验平行时空的另一种人生。' },
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
      {/* 顶部标题区（Notion.com 官网大卡片风格） */}
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

      {/* 悬浮白底 Notion 数据库预览视窗（Notion.com 标志性 Surface） */}
      <div className="notion-preview-surface">
        {/* 视窗顶部数据库视图 Tab 条 */}
        <div className="notion-surface-header">
          <div className="notion-surface-title">
            <span className="notion-surface-icon">{renderCategoryIcon(category.key)}</span>
            <span>{t(category.title)}</span>
          </div>
          <div className="notion-surface-tabs">
            <span className="notion-tab-active">★ {isZh ? '精选' : 'Featured'}</span>
            <span className="notion-tab-idle">💡 {isZh ? '收藏' : 'Collection'}</span>
            <span className="notion-tab-add">+</span>
          </div>
        </div>

        {/* 视窗表格表头 */}
        <div className="notion-table-header">
          <span className="col-title">{isZh ? '名称' : 'Title'}</span>
          <span className="col-tag">{isZh ? '属性 / 标签' : 'Properties'}</span>
        </div>

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
