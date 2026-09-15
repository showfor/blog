import { useState, useCallback } from 'react'
import { macondoQuotes } from '../data/quotes.js'
import AppIcon from './AppIcon.jsx'

export default function MacondoQuote() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * macondoQuotes.length))
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [copied, setCopied] = useState(false)

  const current = macondoQuotes[index] || macondoQuotes[0]

  // 随机抽取下一句（保证不与当前句重复）
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
    }, 180)
  }, [])

  // 一键复制名言文本与出处
  const handleCopy = useCallback(async () => {
    const textToCopy = `“${current.textZh}” —— ${current.character}《百年孤独》${current.chapter}`
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = textToCopy
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.warn('复制失败:', e)
    }
  }, [current])

  return (
    <div className="notion-quote-card" role="region" aria-label="百年孤独名言精选">
      {/* 顶部指示条与操作区域 */}
      <div className="notion-quote-header">
        <div className="notion-quote-meta-left">
          <span className="notion-quote-icon" title="百年孤独语录">
            <AppIcon name="quote" />
          </span>
          <span className="notion-quote-label">《百年孤独》典藏回响</span>
          <span className="notion-quote-tag notion-quote-tag-char">{current.character}</span>
          <span className="notion-quote-tag notion-quote-tag-chapter">{current.chapter}</span>
        </div>

        <div className="notion-quote-actions">
          <button
            type="button"
            className="notion-action-btn"
            onClick={handleNextQuote}
            title="换一句名言 (随机)"
            aria-label="换一句名言"
          >
            <AppIcon name="dice" />
            <span className="notion-action-btn-text">换一句</span>
          </button>

          <button
            type="button"
            className={`notion-action-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title={copied ? '已复制到剪贴板' : '复制名言'}
            aria-label="复制名言"
          >
            <AppIcon name={copied ? 'check' : 'copy'} />
            <span className="notion-action-btn-text">{copied ? '已复制' : '复制'}</span>
          </button>
        </div>
      </div>

      {/* 中文名言主句（带平滑淡入动效） */}
      <div className={`notion-quote-body ${isFading ? 'fading' : ''}`}>
        <p className="notion-quote-text">
          <span className="notion-quote-mark">“</span>
          {current.textZh}
          <span className="notion-quote-mark">”</span>
        </p>
      </div>

      {/* Notion 风格 Toggle List 折叠抽屉：西语原文 + 深度考据小注 */}
      <div className="notion-toggle-block">
        <button
          type="button"
          className="notion-toggle-trigger"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <span className={`notion-toggle-chevron ${isExpanded ? 'open' : ''}`}>
            <AppIcon name="chevron" />
          </span>
          <span className="notion-toggle-title">
            {isExpanded ? '收起文学考据与西语原文' : '展开文学考据与西语原文'}
          </span>
        </button>

        <div className={`notion-toggle-content ${isExpanded ? 'expanded' : ''}`}>
          <div className="notion-quote-drawer">
            {/* 西语原版名句 */}
            <div className="notion-drawer-row">
              <div className="notion-drawer-badge">ESPAÑOL 原文</div>
              <p className="notion-drawer-es">{current.textEs}</p>
            </div>

            {/* 深度原著情境考据 */}
            <div className="notion-drawer-row">
              <div className="notion-drawer-badge">原著情境考据</div>
              <p className="notion-drawer-note">{current.contextNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
