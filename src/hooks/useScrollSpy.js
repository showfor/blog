import { useEffect, useState } from 'react'

// 当前板块高亮（scrollspy）：监听各 section 进入视口中部，返回 activeId。
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0])
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids.join(',')])
  return activeId
}
