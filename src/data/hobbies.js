// 爱好分类数据：音乐 / 小说 / 动漫 / 电影，全双语

export const hobbies = [
  {
    key: 'music',
    id: 'music',
    eyebrow: { en: 'PLAYLIST', cn: '播放列表' },
    title: { en: 'Music', cn: '音乐' },
    intro: {
      en: 'Soundtracks, post-rock, and ambient electronica. Music is the emotional undercurrent of every creative session.',
      cn: '原声带、后摇、氛围电子。音乐是每一次创作时的情感暗流。',
    },
    items: [
      { en: 'MONO — Hymn to the Immortal Wind', cn: 'MONO — 不朽之风赞歌', note: { en: 'Post-rock', cn: '后摇' } },
      { en: 'Joe Hisaishi — Spirited Away OST', cn: '久石让 — 千与千寻原声', note: { en: 'Orchestral', cn: '管弦乐' }, embed: 'https://music.163.com/outchain/player?type=2&id=443794&auto=0&height=152' },
      { en: 'Nujabes — Modal Soul', cn: 'Nujabes — Modal Soul', note: { en: 'Jazz hip-hop', cn: '爵士嘻哈' } },
      { en: 'Ólafur Arnalds — re:member', cn: 'Ólafur Arnalds — re:member', note: { en: 'Neo-classical', cn: '新古典' } },
      { en: 'Yoko Kanno — Cowboy Bebop OST', cn: '菅野洋子 — 星际牛仔原声', note: { en: 'Jazz fusion', cn: '爵士融合' } },
      { en: 'Radwimps — Your Name OST', cn: 'Radwimps — 你的名字原声', note: { en: 'J-rock', cn: '日系摇滚' } },
    ],
  },
  {
    key: 'novels',
    id: 'novels',
    eyebrow: { en: 'BOOKSHELF', cn: '书架' },
    title: { en: 'Novels', cn: '小说' },
    intro: {
      en: 'Science fiction, magical realism, and contemporary literature. The written word is a portal to infinite worlds.',
      cn: '科幻、魔幻现实主义、当代文学。文字是通往无限世界的入口。',
    },
    items: [
      { en: 'The Three-Body Problem', cn: '三体', note: { en: 'Liu Cixin · Hard sci-fi', cn: '刘慈欣 · 硬科幻' } },
      { en: 'Kafka on the Shore', cn: '海边的卡夫卡', note: { en: 'Haruki Murakami', cn: '村上春树' } },
      { en: 'One Hundred Years of Solitude', cn: '百年孤独', note: { en: 'Gabriel García Márquez', cn: '马尔克斯' } },
      { en: 'Neuromancer', cn: '神经漫游者', note: { en: 'William Gibson · Cyberpunk', cn: '威廉·吉布森 · 赛博朋克' } },
      { en: 'Norwegian Wood', cn: '挪威的森林', note: { en: 'Haruki Murakami', cn: '村上春树' } },
      { en: 'The Wind-Up Bird Chronicle', cn: '奇鸟行状录', note: { en: 'Haruki Murakami', cn: '村上春树' } },
    ],
  },
  {
    key: 'anime',
    id: 'anime',
    eyebrow: { en: 'WATCH LIST', cn: '追番清单' },
    title: { en: 'Anime', cn: '动漫' },
    intro: {
      en: 'Japanese animation has been a lifelong passion — from Shonen classics to introspective slice-of-life, every frame tells a story.',
      cn: '日本动画是陪伴我成长的热爱——从热血少年番到细腻日常向，每一帧都在诉说故事。',
    },
    items: [
      { en: 'Attack on Titan', cn: '进击的巨人', note: { en: 'Dark fantasy masterpiece', cn: '黑暗奇幻巅峰' } },
      { en: 'Steins;Gate', cn: '命运石之门', note: { en: 'Time-travel sci-fi', cn: '时间旅行科幻' } },
      { en: 'Fullmetal Alchemist: Brotherhood', cn: '钢之炼金术师 FA', note: { en: 'Perfect story arc', cn: '完美叙事弧线' } },
      { en: 'Violet Evergarden', cn: '紫罗兰永恒花园', note: { en: 'Visual poetry', cn: '视觉诗篇' } },
      { en: 'Monogatari Series', cn: '物语系列', note: { en: 'Dialogue-driven art', cn: '对话驱动的艺术' } },
      { en: 'Mushishi', cn: '虫师', note: { en: 'Meditative folklore', cn: '冥想式民间传说' } },
    ],
  },
  {
    key: 'movies',
    id: 'movies',
    eyebrow: { en: 'SCREEN', cn: '银幕' },
    title: { en: 'Movies', cn: '电影' },
    intro: {
      en: 'From Wong Kar-wai to Christopher Nolan — cinema that bends time, challenges perception, and leaves a mark.',
      cn: '从王家卫到诺兰——改变时间感知、挑战认知边界、留下深刻印记的电影。',
    },
    items: [
      { en: 'In the Mood for Love', cn: '花样年华', note: { en: 'Wong Kar-wai · 2000', cn: '王家卫 · 2000' } },
      { en: 'Interstellar', cn: '星际穿越', note: { en: 'Christopher Nolan · 2014', cn: '诺兰 · 2014' } },
      { en: 'Spirited Away', cn: '千与千寻', note: { en: 'Hayao Miyazaki · 2001', cn: '宫崎骏 · 2001' } },
      { en: 'Parasite', cn: '寄生虫', note: { en: 'Bong Joon-ho · 2019', cn: '奉俊昊 · 2019' } },
      { en: 'Blade Runner 2049', cn: '银翼杀手2049', note: { en: 'Denis Villeneuve · 2017', cn: '维伦纽瓦 · 2017' } },
      { en: 'Your Name', cn: '你的名字', note: { en: 'Makoto Shinkai · 2016', cn: '新海诚 · 2016' } },
    ],
  },
]
