// 我爱看的电影 —— 增删条目即可，note 写一句你的推荐语。
// cover 指向 public/covers/ 下的图片，可替换成真实海报（建议竖图 2:3）。
// douban 为点击卡片后跳转的豆瓣电影页面（这里用搜索页，换成真实条目 URL 也可）。
import { doubanSearch } from '../utils.js'

export const movieList = [
  { title: '星际穿越', year: 2014, cover: 'covers/movie-1.svg', note: '诺兰用爱与时空写就的一首科幻诗，看完会想给家人打个电话。', douban: doubanSearch('星际穿越') },
  { title: '肖申克的救赎', year: 1994, cover: 'covers/movie-2.svg', note: '希望是好事，也许是最好的事，美好的事物永不消逝。', douban: doubanSearch('肖申克的救赎') },
  { title: '楚门的世界', year: 1998, cover: 'covers/movie-3.svg', note: '如果整个人生都是一档真人秀，你敢推开那扇门吗？', douban: doubanSearch('楚门的世界') },
  { title: '霸王别姬', year: 1993, cover: 'covers/movie-4.svg', note: '不疯魔不成活，华语电影里难以逾越的巅峰。', douban: doubanSearch('霸王别姬') },
  { title: '疯狂动物城', year: 2016, cover: 'covers/movie-5.svg', note: '关于偏见与勇气的暖心寓言，大人小孩都能看哭。', douban: doubanSearch('疯狂动物城') },
  { title: '盗梦空间', year: 2010, cover: 'covers/movie-6.svg', note: '梦境一层层折叠，真实与虚幻的边界让人着迷。', douban: doubanSearch('盗梦空间') },
]
