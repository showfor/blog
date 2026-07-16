// 我爱看的电影 —— 增删条目即可，note 写一句你的推荐语。
// cover 指向 public/covers/ 下的图片，可替换成真实海报（建议竖图 2:3）。
// url 为点击卡片后跳转的豆瓣电影「条目页」精确链接（非搜索页）。
// rating 为豆瓣评分（取自对应条目页），votes 为评分人数（无则留空）。
export const movieList = [
  { title: '星际穿越', year: 2014, cover: 'covers/movie-1.svg', rating: 9.4, votes: 2201533, note: '诺兰用爱与时空写就的一首科幻诗，看完会想给家人打个电话。', url: 'https://movie.douban.com/subject/1889243/' },
  { title: '肖申克的救赎', year: 1994, cover: 'covers/movie-2.svg', rating: 9.7, votes: 3304301, note: '希望是好事，也许是最好的事，美好的事物永不消逝。', url: 'https://movie.douban.com/subject/1292052/' },
  { title: '楚门的世界', year: 1998, cover: 'covers/movie-3.svg', rating: 9.4, votes: 2034144, note: '如果整个人生都是一档真人秀，你敢推开那扇门吗？', url: 'https://movie.douban.com/subject/1292064/' },
  { title: '霸王别姬', year: 1993, cover: 'covers/movie-4.svg', rating: 9.6, votes: 2438158, note: '不疯魔不成活，华语电影里难以逾越的巅峰。', url: 'https://movie.douban.com/subject/1291546/' },
  { title: '疯狂动物城', year: 2016, cover: 'covers/movie-5.svg', rating: 9.2, votes: null, note: '关于偏见与勇气的暖心寓言，大人小孩都能看哭。', url: 'https://movie.douban.com/subject/25662329/' },
  { title: '盗梦空间', year: 2010, cover: 'covers/movie-6.svg', rating: 9.4, votes: 2338549, note: '梦境一层层折叠，真实与虚幻的边界让人着迷。', url: 'https://movie.douban.com/subject/3541415/' },
]
