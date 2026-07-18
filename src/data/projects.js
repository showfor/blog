// 精选项目（逐字照搬 PRD §6.4）
// img 仅存相对路径，渲染时统一走 asset() 拼接 BASE_URL，避免子路径部署 404。
export const projects = [
  {
    id: 1,
    title: '品牌 VI 视觉升级',
    meta: '2023.04 - 2023.06 / 视觉主设计师',
    desc: '完成品牌色彩体系、字体规范、LOGO 延展、图标系统与全渠道视觉规范，推动品牌形象年轻化与标准化。',
    img: 'assets/project-01.jpg',
    crop: 'left center',
  },
  {
    id: 2,
    title: '全年节日营销视觉全案',
    meta: '2022.08 - 至今 / 视觉设计师',
    desc: '围绕电商大促、节日节点与品牌专场，输出活动首页、海报、详情页、引流配图与短视频封面。',
    img: 'assets/project-02.jpg',
    crop: 'center center',
  },
  {
    id: 3,
    title: '电商店铺视觉优化',
    meta: '首页改版 / 详情页 / 主图精修',
    desc: '优化页面视觉层级与浏览路径，提升商品呈现质感，并为运营活动提供稳定视觉支撑。',
    img: 'assets/project-03.jpg',
    crop: 'right center',
  },
]
