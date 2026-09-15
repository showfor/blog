import { useState, useCallback } from 'react'
import { useNotion } from '../context/NotionContext.jsx'
import { macondoQuotes } from '../data/quotes.js'

export default function SolitudeQuote() {
  const { lang } = useNotion()
  const isZh = lang === 'zh'

  const [index, setIndex] = useState(() => Math.floor(Math.random() * macondoQuotes.length))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [copied, setCopied] = useState(false)

  const current = macondoQuotes[index] || macondoQuotes[0]

  const handleNextQuote = useCallback(() => {
    if (macondoQuotes.length <= 1) return
    setIsFading(true)
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
    <div className="notion-solitude-quote">
      <div className="notion-quote-mark" aria-hidden="true">“</div>

      {/* 顶部标签与操作工具栏 */}
      <div className="notion-quote-topbar">
        <div className="notion-quote-tags">
          <span className="notion-tag-char">{current.character}</span>
          <span className="notion-tag-chap">{current.chapter}</span>
        </div>

        <div className="notion-quote-btns">
          <button
            type="button"
            className="notion-quote-action-btn"
            onClick={handleNextQuote}
            title={isZh ? '换一句名言 (随机)' : 'Next quote (random)'}
          >
            <span className="btn-icon">🎲</span>
            <span>{isZh ? '换一句' : 'Shuffle'}</span>
          </button>

          <button
            type="button"
            className={`notion-quote-action-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title={copied ? (isZh ? '已复制到剪贴板' : 'Copied') : (isZh ? '复制名言' : 'Copy')}
          >
            <span className="btn-icon">{copied ? '✓' : '📋'}</span>
            <span>{copied ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制' : 'Copy')}</span>
          </button>
        </div>
      </div>

      {/* 主名言文本 */}
      <div className={`notion-quote-body ${isFading ? 'fading' : ''}`}>
        <p className="notion-quote-text">
          {isZh ? current.textZh : current.textEn}
        </p>
      </div>

      {/* 底部出处引用与考据折叠 */}
      <div className="notion-quote-footer">
        <button
          type="button"
          className="notion-quote-toggle"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <span className={`notion-quote-chevron ${isExpanded ? 'open' : ''}`}>▶</span>
          <span>
            {isExpanded
              ? (isZh ? '收起考据与西语原文' : 'Hide Context & Spanish')
              : (isZh ? '展开文学考据与西语原文' : 'View Context & Spanish')}
          </span>
        </button>

        <div className="notion-quote-cite">
          <span className="cite-line" />
          <span>
            {isZh
              ? `${current.character} · 《百年孤独》`
              : `${current.character}, One Hundred Years of Solitude`}
          </span>
        </div>
      </div>

      {/* 折叠展开的西语原文与原著情境考据 */}
      <div className={`notion-quote-expand ${isExpanded ? 'open' : ''}`}>
        <div className="notion-quote-expand-inner">
          <div className="notion-expand-row">
            <span className="notion-expand-badge">ESPAÑOL 原文</span>
            <p className="notion-expand-es">{current.textEs}</p>
          </div>
          <div className="notion-expand-row">
            <span className="notion-expand-badge">{isZh ? '原著情境考据' : 'Literary Context'}</span>
            <p className="notion-expand-note">{current.contextNote}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
