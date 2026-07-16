// 我爱的音乐 —— 按分类组织，每个分类下是歌曲列表。
// cover 指向 public/covers/ 下的图片，可替换成真实专辑封面（建议正方形）。
// douban 为点击卡片后跳转的豆瓣音乐页面（这里用搜索页，换成真实条目 URL 也可）。
import { doubanSearch } from '../utils.js'

export const musicCategories = [
  {
    name: '华语流行',
    songs: [
      { title: '晴天', artist: '周杰伦', album: '叶惠美', cover: 'covers/music-1.svg', douban: doubanSearch('晴天 周杰伦') },
      { title: '平凡之路', artist: '朴树', album: '猎户星座', cover: 'covers/music-2.svg', douban: doubanSearch('平凡之路 朴树') },
      { title: '小幸运', artist: '田馥甄', album: '我的少女时代', cover: 'covers/music-3.svg', douban: doubanSearch('小幸运 田馥甄') },
    ],
  },
  {
    name: '摇滚 / 独立',
    songs: [
      { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', cover: 'covers/music-4.svg', douban: doubanSearch('Bohemian Rhapsody Queen') },
      { title: 'Redbone', artist: 'Childish Gambino', album: '"Awaken, My Love!"', cover: 'covers/music-5.svg', douban: doubanSearch('Redbone Childish Gambino') },
      { title: '海阔天空', artist: 'Beyond', album: '乐与怒', cover: 'covers/music-6.svg', douban: doubanSearch('海阔天空 Beyond') },
    ],
  },
  {
    name: '电子 / Lo-fi',
    songs: [
      { title: 'Night Owl', artist: 'Galimatias', album: '—', cover: 'covers/music-7.svg', douban: doubanSearch('Night Owl Galimatias') },
      { title: 'Lush', artist: 'Four Tet', album: 'There Is Love in You', cover: 'covers/music-8.svg', douban: doubanSearch('Lush Four Tet') },
      { title: 'Teardrop', artist: 'Massive Attack', album: 'Mezzanine', cover: 'covers/music-9.svg', douban: doubanSearch('Teardrop Massive Attack') },
    ],
  },
]
