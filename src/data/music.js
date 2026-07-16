// 我爱的音乐 —— 按分类组织，每个分类下是歌曲列表。
// cover 指向 public/covers/ 下的图片，可替换成真实专辑封面（建议正方形）。
export const musicCategories = [
  {
    name: '华语流行',
    songs: [
      { title: '晴天', artist: '周杰伦', album: '叶惠美', cover: 'covers/music-1.svg' },
      { title: '平凡之路', artist: '朴树', album: '猎户星座', cover: 'covers/music-2.svg' },
      { title: '小幸运', artist: '田馥甄', album: '我的少女时代', cover: 'covers/music-3.svg' },
    ],
  },
  {
    name: '摇滚 / 独立',
    songs: [
      { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', cover: 'covers/music-4.svg' },
      { title: 'Redbone', artist: 'Childish Gambino', album: '"Awaken, My Love!"', cover: 'covers/music-5.svg' },
      { title: '海阔天空', artist: 'Beyond', album: '乐与怒', cover: 'covers/music-6.svg' },
    ],
  },
  {
    name: '电子 / Lo-fi',
    songs: [
      { title: 'Night Owl', artist: 'Galimatias', album: '—', cover: 'covers/music-7.svg' },
      { title: 'Lush', artist: 'Four Tet', album: 'There Is Love in You', cover: 'covers/music-8.svg' },
      { title: 'Teardrop', artist: 'Massive Attack', album: 'Mezzanine', cover: 'covers/music-9.svg' },
    ],
  },
]
