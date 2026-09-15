import { useState, useCallback } from 'react'
import { useNotion } from '../context/NotionContext.jsx'
import { macondoQuotes } from '../data/quotes.js'

// 极简纤细线框矢量图标（无任何 emoji 骰子，纯粹 Notion 质感）
function RefreshIcon({ className = '' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21.5 2v6h-6" />
      <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  )
}

function CopyIcon({ className = '' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon({ className = '' }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ChevronIcon({ open = false }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function QuillIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  )
}

export default function SolitudeQuote() {
  const { lang } = useNotion()
  const isZh = lang === 'zh'

  const [index, setIndex] = useState(() => Math.floor(Math.random() * macondoQuotes.length))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [copied, setCopied] = useState(false)

  const current = macondoQuotes[index] || macondoQuotes[0]

  const handleNextQuote = useCallback(() => {
    if (macondoQuotes.length <= 1) return
    setIsFading(true)
    setIsSpinning(true)
    setTimeout(() => {
      setIndex((prev) => {
        let next
        do {
          next = Math.floor(Math.random() * macondoQuotes.length)
        } while (next === prev)
        return next
      })
      setIsFading(false)
    }, 160)
    setTimeout(() => {
      setIsSpinning(false)
    }, 450)
  }, [])

  const handleCopy = useCallback(async () => {
    const quoteText = isZh ? current.textZh : current.textEn
    const citeText = isZh
      ? `${current.character} · 《百年孤独》${current.chapter}`
      : `${current.character}, One Hundred Years of Solitude (${current.chapter})`
    const textToCopy = `“${quoteText}” —— ${citeText}`
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy)
      } else {
        const ta = document.createElement('textarea')
        ta.value = textToCopy
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.warn('Copy failed:', err)
    }
  }, [current, isZh])

  return (
    <div className="notion-solitude-quote" role="region" aria-label={isZh ? '百年孤独经典箴言' : 'Quotes from One Hundred Years of Solitude'}>
      {/* 极淡优雅的水印双引号 */}
      <div className="notion-quote-watermark" aria-hidden="true">“</div>

      {/* 顶部标签与质感操作栏 */}
      <div className="notion-quote-topbar">
        <div className="notion-quote-meta-badges">
          <span className="notion-badge-kicker">
            <QuillIcon />
            <span>{isZh ? '百年孤独' : 'Cien Años'}</span>
          </span>
          <span className="notion-badge-character">{current.character}</span>
          <span className="notion-badge-chapter">{current.chapter}</span>
        </div>

        <div className="notion-quote-toolbar">
          <button
            type="button"
            className="notion-quote-btn"
            onClick={handleNextQuote}
            title={isZh ? '随机换一句' : 'Shuffle quote'}
            aria-label={isZh ? '随机换一句' : 'Shuffle quote'}
          >
            <RefreshIcon className={isSpinning ? 'icon-spin' : ''} />
            <span>{isZh ? '换一句' : 'Shuffle'}</span>
          </button>

          <button
            type="button"
            className={`notion-quote-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title={copied ? (isZh ? '已复制名言' : 'Copied') : (isZh ? '复制名言' : 'Copy')}
            aria-label={copied ? (isZh ? '已复制名言' : 'Copied') : (isZh ? '复制名言' : 'Copy')}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span>{copied ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制' : 'Copy')}</span>
          </button>
        </div>
      </div>

      {/* 核心引言排版（沉浸式长篇衬线文学排版） */}
      <div className={`notion-quote-content ${isFading ? 'fading' : ''}`}>
        <p className="notion-quote-text">
          {isZh ? current.textZh : current.textEn}
        </p>
      </div>

      {/* 底部功能栏：考据折叠触发器 + 署名细线 */}
      <div className="notion-quote-bottom-bar">
        <button
          type="button"
          className="notion-context-toggle-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <span className="toggle-label">
            {isExpanded
              ? (isZh ? '收起文学考据与西语原文' : 'Hide Context & Spanish')
              : (isZh ? '查看原著考据与西语原文' : 'View Context & Spanish')}
          </span>
          <ChevronIcon open={isExpanded} />
        </button>

        <div className="notion-quote-attribution">
          <span className="attr-dash" />
          <span className="attr-author">
            {isZh
              ? `${current.character} · 《百年孤独》`
              : `${current.character}, One Hundred Years of Solitude`}
          </span>
        </div>
      </div>

      {/* 文学手稿式考据抽屉 */}
      <div className={`notion-context-drawer ${isExpanded ? 'open' : ''}`}>
        <div className="notion-context-drawer-body">
          {/* 西语原文手稿 */}
          <div className="notion-context-item">
            <div className="context-item-header">
              <span className="context-item-pill">ESPAÑOL 原文</span>
            </div>
            <p className="notion-context-es">
              “{current.textEs}”
            </p>
          </div>

          {/* 原著深度情境解构 */}
          <div className="notion-context-item">
            <div className="context-item-header">
              <span className="context-item-pill">{isZh ? '原著情境考据' : 'LITERARY CONTEXT'}</span>
            </div>
            <p className="notion-context-note">
              {current.contextNote}
            </p>
          </div>

          {/* 直达马孔多原著资料库与意象辞书 */}
          <div className="notion-context-footer">
            <a
              href="https://macondo-guide.pages.dev/lexicon"
              target="_blank"
              rel="noopener noreferrer"
              className="notion-lexicon-link"
              title="进入《百年孤独》马孔多原著全景百科与意象辞书"
            >
              <QuillIcon />
              <span>{isZh ? '探索《百年孤独》全景资料库与魔幻意象辞书 →' : 'Explore Macondo Lexicon & Motifs →'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
