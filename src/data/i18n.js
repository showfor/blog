// 站点级 UI 文案：语言切换 + 导航锚点 + 板块标题 + 开源 + 页脚，全部 {en, cn} 双字段。
export const i18n = {
  ui: {
    // 文案显示「要切换到的语言」：当前 en 显示「切换到中文」，当前 cn 显示 "Switch to English"。
    // 保留给页脚 ghost 语言按钮。
    switchLabel: { en: '切换到中文', cn: 'Switch to English' },
    // 顶栏语言条两段式按钮：左=当前语言，右=可切换的目标语言。
    // langCurrent/langTarget 的 {en,cn} 互为镜像：en 态显示「EN ⇄ 中」，cn 态显示「中 ⇄ EN」。
    langCurrent: { en: 'EN', cn: '中' },
    langTarget: { en: '中', cn: 'EN' },
    // 可访问性用：完整语言名 + 提示语。
    langName: { en: 'English', cn: '中文' },
    switchHint: { en: 'Switch language, current:', cn: '切换语言，当前：' },
  },
  nav: {
    brand: { en: 'Amber River', cn: '琥珀川' },
    mark: 'AR',
    links: [
      { key: 'about', label: { en: 'About', cn: '关于我' }, href: '#about' },
      { key: 'projects', label: { en: 'Projects', cn: '作品集' }, href: '#projects' },
      { key: 'skills', label: { en: 'Skills', cn: '技能' }, href: '#skills' },
      { key: 'services', label: { en: 'Services', cn: '服务方向' }, href: '#services' },
      { key: 'opensource', label: { en: 'Open Source', cn: '开源贡献' }, href: '#opensource' },
      { key: 'contact', label: { en: 'Contact', cn: '联系我' }, href: '#contact' },
    ],
    cta: { label: { en: 'Contact', cn: '联系我' }, href: '#contact' },
  },
  titles: {
    hero: { en: 'Hero', cn: '首页' },
    about: { en: 'About Me', cn: '关于我' },
    projects: { en: 'Selected Projects', cn: '精选作品' },
    skills: { en: 'Skills', cn: '技能' },
    services: { en: 'Services', cn: '服务方向' },
    opensource: { en: 'Open Source', cn: '开源贡献' },
    contact: { en: 'Contact', cn: '联系我' },
  },
  opensource: {
    heading: {
      en: 'Sharing projects on GitHub and contributing to the community.',
      cn: '在GitHub上分享项目，参与开源社区。',
    },
    items: [
      { en: 'Code contributions', cn: '代码贡献' },
      { en: 'Open source contributor', cn: '开源贡献' },
      { en: 'Participating in the open source community', cn: '参与开源社区。' },
    ],
    url: 'https://github.com/',
  },
  footer: {
    about: { en: 'About Me', cn: '关于我' },
  },
}
