// 站主身份 + 个人经历 + 指标 + Hero 文案（逐字照搬 PRD §6）
export const profile = {
  name: '琥珀川',
  role: 'Visual Designer',
  // 个人经历（About 左卡 H2）
  headline: '视觉设计师，擅长把需求整理成清晰、可执行的视觉结果。',
  // 个人经历（About 左卡段落，逐字）
  intro:
    '拥有 3 年专业视觉设计经验，覆盖品牌 VI、平面宣传、电商视觉、新媒体视觉与包装设计。' +
    '擅长将品牌调性、用户审美与市场需求转译为稳定、高质感、可执行的视觉方案。',
  phone: '138XXXX6789',
  email: 'zixuan_design@163.com',
  // 页脚 location（逐字）
  location: 'Visual Communication / Brand / Campaign',
  // 4 项指标（逐字）
  metrics: [
    { value: '3+', label: '年全职经验' },
    { value: '500+', label: '年均落地作品' },
    { value: '95%+', label: '客户满意度' },
    { value: '20%+', label: '活动点击提升' },
  ],
  // 首屏 Hero 文案（逐字）
  hero: {
    tags: ['Portfolio', 'Visual Designer', '2026'],
    headline: '琥珀川',
    statValue: '500+',
    statLabel: 'Visual systems & commercial assets delivered yearly',
    claim: '以品牌秩序与商业审美，构建可落地的视觉系统。',
    slogan: ['DESIGN', ' IS NOT', 'DECORATION'],
    primaryCta: { label: '开始查看', href: '#projects' },
    secondaryCta: { label: 'zixuan_design@163.com', href: 'mailto:zixuan_design@163.com' },
    scrollHint: { label: '滚动到个人经历', href: '#about' },
  },
}
