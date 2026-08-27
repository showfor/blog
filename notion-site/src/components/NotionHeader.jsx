import { useNotion } from '../context/NotionContext.jsx'
import {
  HakuDragonLogo,
  GlobeIcon,
  SunIcon,
  MoonIcon,
} from './NotionIcons.jsx'

export default function NotionHeader() {
  const { lang, theme, toggleLang, toggleTheme } = useNotion()

  const isZh = lang === 'zh'

  return (
    <>
      {/* 顶部导航栏：白龙 3D Notion 专属徽标 + 精致 hakuriver 品牌字 */}
      <header className="notion-topbar">
        <div className="notion-brand">
          <HakuDragonLogo size={26} />
          <span className="notion-brand-name">hakuriver</span>
        </div>

        <div className="notion-top-actions">
          {/* 语言切换 */}
          <button
            type="button"
            className="notion-btn-pill"
            onClick={toggleLang}
            title={isZh ? 'Switch to English' : '切换到中文'}
          >
            <GlobeIcon size={13} />
            <span>{isZh ? 'EN' : '中文'}</span>
          </button>

          {/* 明暗模式切换 */}
          <button
            type="button"
            className="notion-btn-pill"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <MoonIcon size={13} /> : <SunIcon size={13} />}
            <span>{theme === 'light' ? (isZh ? '深色' : 'Dark') : (isZh ? '浅色' : 'Light')}</span>
          </button>
        </div>
      </header>

      {/* 英雄区：大标题 + 琥珀色气泡 + 《百年孤独》深邃段落 */}
      <div className="notion-hero-section">
        {/* 大标题与琥珀色高亮气泡 */}
        <h1 className="notion-hero-title">
          <span className="notion-title-text">hakuriver</span>
          <span className="notion-amber-badge">
            <span className="amber-dot" />
            <span>{isZh ? '赈早见琥珀主' : 'Kohaku'}</span>
          </span>
        </h1>

        {/* 《百年孤独》深邃段落引言卡片 */}
        <div className="notion-solitude-quote">
          <div className="notion-quote-mark">“</div>
          <p className="notion-quote-text">
            {isZh ? (
              <>
                每个人都是孤独地出生，在这世间恍惚几十年并不漫长的日子转眼就远去了，然后再孤独地死去。
                生命注定是个悲剧，因为我们从没有融入世界，世界永远是身外之物。如果有幸，能在茫茫人海寻得一个身体与灵魂都与自己万分契合的人，与之存在一种可以称之为爱情的联系，然后一起承受生命中不可逃离不可消除的深沉的宿命的孤独。可是这般的幸运艰深难得。有的已失去了爱的能力，有的爱得深沉却无处安放，有的死在这爱里……在所有的爱里，孤独有增无减。
                生命只是一场幻梦。
              </>
            ) : (
              <>
                Everyone is born alone, drifting through a few decades in this world that slip away in the blink of an eye, and then dies alone.
                Life is destined to be a tragedy, for we have never truly merged into the world; the world remains forever an external reality. If one is fortunate enough to find in the vast sea of humanity a soul and body in total resonance, bound by what may be called love, together they endure the inescapable, indelible solitude of fate. Yet such fortune is arduous and rare. Some lose the capacity to love, some love deeply with nowhere to place it, and some perish in that love... In all forms of love, solitude only multiplies.
                Life is merely an illusion.
              </>
            )}
          </p>
          <div className="notion-quote-cite">
            <span className="cite-line" />
            <span>{isZh ? '加西亚·马尔克斯《百年孤独》' : 'Gabriel García Márquez, One Hundred Years of Solitude'}</span>
          </div>
        </div>
      </div>
    </>
  )
}
