// 纯 CSS 背景：径向渐变 + grain 纹理 + 浮动粒子，替代旧 hero 视频，无任何外部素材。
export default function BackgroundFX() {
  const particles = Array.from({ length: 18 }, (_, i) => {
    const top = (i * 53) % 100
    const left = (i * 37) % 100
    const delay = (i * 0.7) % 6
    const duration = 6 + (i % 5)
    return (
      <span
        key={i}
        className="particle"
        style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      />
    )
  })

  return (
    <div className="grain-bg-wrapper" aria-hidden="true">
      <div className="bg-gradient" />
      <div className="bg-grain" />
      <div className="bg-particles">{particles}</div>
    </div>
  )
}
