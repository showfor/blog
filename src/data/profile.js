// 站主身份 / Hero / About / Contact（逐字照搬 aystba 站点实抓 JS，站主名统一改为 Amber River），全部 {en, cn} 双字段。
export const profile = {
  identity: {
    name: { en: 'Amber River', cn: '琥珀川' },
    role: { en: 'Designer & Creator', cn: '设计师与创作者' },
    location: { en: 'Based in Hefei, China.', cn: '位于中国合肥。' },
  },
  hero: {
    greeting: { en: 'I am Amber River', cn: '我是琥珀川！' },
    name: { en: 'Amber River', cn: '琥珀川' },
    tags: [
      { en: 'Developer', cn: '开发者' },
      { en: 'Designer', cn: '设计师' },
      { en: 'Creator', cn: '创作者' },
    ],
    claim: { en: 'Creative Developer & Designer', cn: '创意开发者与设计师' },
    bio: {
      en: 'A developer passionate about creating practical and beautiful digital products.',
      cn: '专注于构建实用且美观的数字产品。',
    },
    primaryCta: { en: 'Send Message', cn: '发送消息', href: 'mailto:hello@amberriver.dev' },
    secondaryCta: { en: 'Selected Projects', cn: '精选作品', href: '#projects' },
    scrollHint: { en: 'Scroll to About', cn: '滚动查看关于', href: '#about' },
  },
  about: {
    headline: {
      en: 'Creative Developer & Designer. Building practical and beautiful digital products.',
      cn: '创意开发者与设计师。构建实用且美观的数字产品。',
    },
    paragraphs: [
      { en: 'A developer passionate about creating practical and beautiful digital products.', cn: '专注于构建实用且美观的数字产品。' },
      { en: 'Started the journey as an independent developer, self-taught React, Vue, Python and Rust to build the first project from scratch', cn: '从零起步做独立开发者，自学 React、Vue、Python、Rust 等技术栈，边学边做第一个项目。' },
      { en: 'Continuously developing AI tools and independent products', cn: '一边持续开发独立产品，开发AI工具和安全加密系统。' },
      { en: 'Continuously participating in various tech competitions and maker contests, winning multiple awards', cn: '连续参加各类技术赛事和创客比赛并多次获奖' },
      { en: 'Combining technology with creativity to build impactful digital solutions', cn: '将技术与创意结合，构建有影响力的数字解决方案。' },
    ],
    identities: [
      { en: 'Full-stack Developer', cn: '全栈开发者' },
      { en: 'Creative Designer', cn: '创意设计师' },
      { en: 'Independent Developer', cn: '独立开发者' },
    ],
    resume: [
      {
        period: { en: '2020 — Present', cn: '2020 — 至今' },
        role: { en: 'Co-founder', cn: '联合创始人' },
        org: { en: 'UPCHIS Studio', cn: 'UPCHIS 数字创意工作室' },
        detail: {
          en: 'Founded the studio to push creative experiments and build dark/mysterious art style websites',
          cn: '创立 UPCHIS 数字创意工作室。现在一边做工作室的暗黑实验风格项目',
        },
      },
      {
        period: { en: '2020 — Present', cn: '2020 — 至今' },
        role: { en: 'Independent Developer', cn: '独立开发者' },
        org: { en: 'Self-taught Developer', cn: '自学者' },
        detail: {
          en: 'Started coding as an independent developer in 2020; self-taught React, Vue, Python, Rust while building the first project',
          cn: '2020 年起步做独立开发者，自学 React、Vue、Python、Rust 等技术栈，边学边做第一个项目。',
        },
      },
    ],
  },
  contact: {
    email: 'hello@amberriver.dev',
    phone: '',
    welcome: {
      en: 'Welcome to collaborate on creative projects and interesting conversations.',
      cn: '欢迎合作、创意项目和有趣的交流。',
    },
  },
}
