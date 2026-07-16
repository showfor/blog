// 我爱的音乐 —— 按分类组织，每个分类下是歌曲列表。
// cover 指向 public/covers/ 下的图片，可替换成真实专辑封面（建议正方形）。
// url 为点击卡片后跳转的「网易云音乐单曲页」精确链接（非搜索页）。
export const musicCategories = [
  {
    name: '华语流行',
    songs: [
      { title: '晴天', artist: '周杰伦', album: '叶惠美', cover: 'covers/music-1.svg', url: 'https://music.163.com/song/3339230677/' },
      { title: '平凡之路', artist: '朴树', album: '猎户星座', cover: 'covers/music-2.svg', url: 'https://music.163.com/song/28815250/' },
      { title: '小幸运', artist: '田馥甄', album: '我的少女时代', cover: 'covers/music-3.svg', url: 'https://music.163.com/song/3343236872/' },
    ],
  },
  {
    name: '摇滚 / 独立',
    songs: [
      { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', cover: 'covers/music-4.svg', url: 'https://music.163.com/song/1868553/' },
      { title: 'Redbone', artist: 'Childish Gambino', album: '"Awaken, My Love!"', cover: 'covers/music-5.svg', url: 'https://music.163.com/song/441489378/' },
      { title: '海阔天空', artist: 'Beyond', album: '乐与怒', cover: 'covers/music-6.svg', url: 'https://music.163.com/song/1357375695/' },
    ],
  },
  {
    name: '电子 / Lo-fi',
    songs: [
      { title: 'Night Owl', artist: 'Galimatias', album: '—', cover: 'covers/music-7.svg', url: 'https://music.163.com/song/2633209218/' },
      { title: 'Lush', artist: 'Four Tet', album: 'There Is Love in You', cover: 'covers/music-8.svg', url: 'https://music.163.com/song/509633435/' },
      { title: 'Teardrop', artist: 'Massive Attack', album: 'Mezzanine', cover: 'covers/music-9.svg', url: 'https://music.163.com/song/22575474/' },
    ],
  },
]
