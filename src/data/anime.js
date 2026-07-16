// 我爱看的动漫 —— 增删条目即可。
// cover 指向 public/covers/ 下的图片，可替换成真实剧照或海报（建议竖图 3:4）。
// douban 为点击卡片后跳转的豆瓣动漫页面（这里用搜索页，换成真实条目 URL 也可）。
import { doubanSearch } from '../utils.js'

export const animeList = [
  { title: '灌篮高手', meta: '井上雄彦 · 运动 / 青春', cover: 'covers/anime-1.svg', douban: doubanSearch('灌篮高手') },
  { title: '千与千寻', meta: '宫崎骏 · 吉卜力 / 奇幻', cover: 'covers/anime-2.svg', douban: doubanSearch('千与千寻') },
  { title: '间谍过家家', meta: '远藤达哉 / 日常 · 搞笑', cover: 'covers/anime-3.svg', douban: doubanSearch('间谍过家家') },
  { title: '进击的巨人', meta: '谏山创 / 热血 · 史诗', cover: 'covers/anime-4.svg', douban: doubanSearch('进击的巨人') },
  { title: '葬送的芙莉莲', meta: '山田钟人 / 奇幻 · 治愈', cover: 'covers/anime-5.svg', douban: doubanSearch('葬送的芙莉莲') },
  { title: '新世纪福音战士', meta: '庵野秀明 / 科幻 · 心理', cover: 'covers/anime-6.svg', douban: doubanSearch('新世纪福音战士') },
]
