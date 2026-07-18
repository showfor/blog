// 技能分类 + 技术栈 + 个人优势（合并原 Strengths），全部 {en, cn} 逐字。
export const skills = {
  categories: [
    {
      title: { en: 'Frontend Development', cn: '前端开发' },
      items: [
        { en: 'React', cn: 'React' },
        { en: 'Vue', cn: 'Vue' },
        { en: 'Interface Design', cn: '界面设计' },
        { en: 'Creative Design', cn: '创意设计' },
      ],
    },
    {
      title: { en: 'Backend Development', cn: '后端开发' },
      items: [
        { en: 'Python', cn: 'Python' },
        { en: 'Rust', cn: 'Rust' },
        { en: 'AI', cn: 'AI' },
      ],
    },
    {
      title: { en: 'Desktop & Cross-platform', cn: '桌面端与跨平台' },
      items: [
        { en: 'Tauri', cn: 'Tauri' },
        { en: 'Desktop App', cn: '桌面应用' },
        { en: 'Full-stack', cn: '全栈开发' },
      ],
    },
  ],
  techStack: [
    { name: 'React', type: 'Frontend' },
    { name: 'Vue', type: 'Frontend' },
    { name: 'Python', type: 'Backend' },
    { name: 'Rust', type: 'Systems' },
    { name: 'Tauri', type: 'Desktop' },
  ],
  strengths: [
    {
      title: { en: 'Multiple award winner', cn: '多次获奖' },
      desc: {
        en: 'Continuously participating in various tech competitions and maker contests',
        cn: '连续参加各类技术赛事和创客比赛',
      },
    },
    {
      title: { en: 'Combine technology with creativity', cn: '将技术与创意结合' },
      desc: {
        en: 'Building practical and beautiful digital products',
        cn: '构建实用且美观的数字产品',
      },
    },
    {
      title: { en: 'Open source contributor', cn: '开源贡献' },
      desc: {
        en: 'Sharing projects on GitHub and contributing to the community.',
        cn: '在GitHub上分享项目，参与开源社区。',
      },
    },
    {
      title: { en: 'From concept to deployment', cn: '从概念到部署' },
      desc: {
        en: 'Honing full-stack development and creative abilities in practice',
        cn: '在实践中打磨全栈开发与创意能力。',
      },
    },
  ],
}
