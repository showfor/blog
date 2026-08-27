// Notion 风格兴趣爱好数据：音乐 / 小说 / 动漫 / 电影（双语）

export const hobbies = [
  {
    key: 'music',
    id: 'music',
    icon: '🎵',
    eyebrow: { en: 'PLAYLIST', cn: '播放列表' },
    title: { en: 'Music', cn: '音乐' },
    intro: {
      en: 'Soundtracks, post-rock, and ambient electronica. Music is the emotional undercurrent of every creative session.',
      cn: '原声带、后摇、氛围电子。音乐是每一次创作时的情感暗流。',
    },
    items: [
      {
        en: 'Joe Hisaishi — Spirited Away OST',
        cn: '久石让 — 千与千寻原声',
        note: { en: 'Orchestral · Studio Ghibli', cn: '管弦乐 · 吉卜力工作室' },
        tag: 'Ghibli',
      },
      {
        en: 'MONO — Hymn to the Immortal Wind',
        cn: 'MONO — 不朽之风赞歌',
        note: { en: 'Post-rock · Cinematic', cn: '后摇 · 史诗交响' },
        tag: 'Post-rock',
      },
      {
        en: 'Nujabes — Modal Soul',
        cn: 'Nujabes — Modal Soul',
        note: { en: 'Jazz Hip-Hop · Soulful', cn: '爵士嘻哈 · 灵魂律动' },
        tag: 'Jazz Hop',
      },
      {
        en: 'Ólafur Arnalds — re:member',
        cn: 'Ólafur Arnalds — re:member',
        note: { en: 'Neo-classical · Ambient', cn: '新古典 · 极简氛围' },
        tag: 'Ambient',
      },
      {
        en: 'Yoko Kanno — Cowboy Bebop OST',
        cn: '菅野洋子 — 星际牛仔原声',
        note: { en: 'Jazz Fusion · Bebop', cn: '爵士融合 · 比波普' },
        tag: 'Anime OST',
      },
      {
        en: 'Radwimps — Your Name OST',
        cn: 'Radwimps — 你的名字原声',
        note: { en: 'J-Rock · Cinematic', cn: '日系摇滚 · 动画电影' },
        tag: 'J-Rock',
      },
    ],
  },
  {
    key: 'novels',
    id: 'novels',
    icon: '📚',
    eyebrow: { en: 'BOOKSHELF', cn: '书架' },
    title: { en: 'Novels', cn: '小说' },
    intro: {
      en: 'Science fiction, magical realism, and contemporary literature. The written word is a portal to infinite worlds.',
      cn: '科幻、魔幻现实主义、当代文学。文字是通往无限世界的入口。',
    },
    items: [
      {
        en: 'The Three-Body Problem Trilogy',
        cn: '三体全集',
        note: { en: 'Liu Cixin · Earth’s Past Trilogy · 9.6', cn: '刘慈欣 · 地球往事三部曲 · 豆瓣 9.6' },
        tag: 'Hard Sci-Fi',
      },
      {
        en: 'One Hundred Years of Solitude',
        cn: '百年孤独',
        note: { en: 'Gabriel García Márquez · Masterpiece · 9.3', cn: '加西亚·马尔克斯 · 魔幻现实主义 · 豆瓣 9.3' },
        tag: 'Magic Realism',
      },
      {
        en: 'To Kill a Mockingbird',
        cn: '杀死一只知更鸟',
        note: { en: 'Harper Lee · Pulitzer Prize · 9.2', cn: '哈珀·李 · 普利策文学奖 · 豆瓣 9.2' },
        tag: 'Pulitzer Prize',
      },
      {
        en: 'Animal Farm',
        cn: '动物农场',
        note: { en: 'George Orwell · Political Allegory · 9.4', cn: '乔治·奥威尔 · 政治讽刺寓言 · 豆瓣 9.4' },
        tag: 'Allegory',
      },
      {
        en: '1984',
        cn: '1984',
        note: { en: 'George Orwell · Dystopian Classic · 9.4', cn: '乔治·奥威尔 · 反乌托邦丰碑 · 豆瓣 9.4' },
        tag: 'Dystopian',
      },
      {
        en: 'To Live',
        cn: '活着',
        note: { en: 'Yu Hua · Contemporary Masterpiece · 9.4', cn: '余华 · 坚韧与苦难的史诗 · 豆瓣 9.4' },
        tag: 'Realism',
      },
      {
        en: 'The Stranger',
        cn: '局外人',
        note: { en: 'Albert Camus · Existentialism · 9.1', cn: '阿尔贝·加缪 · 荒诞与存在主义 · 豆瓣 9.1' },
        tag: 'Existentialism',
      },
      {
        en: 'The Silent Majority',
        cn: '沉默的大多数',
        note: { en: 'Wang Xiaobo · Intellectual Freedom · 9.1', cn: '王小波 · 自由理性与特立独行 · 豆瓣 9.1' },
        tag: 'Essays',
      },
    ],
  },
  {
    key: 'anime',
    id: 'anime',
    icon: '🌸',
    eyebrow: { en: 'WATCH LIST', cn: '追番清单' },
    title: { en: 'Anime', cn: '动漫' },
    intro: {
      en: 'Japanese animation has been a lifelong passion — from Shonen classics to introspective slice-of-life, every frame tells a story.',
      cn: '日本动画是陪伴我成长的热爱——从热血少年番到细腻日常向，每一帧都在诉说故事。',
    },
    items: [
      {
        en: 'Attack on Titan',
        cn: '进击的巨人',
        note: { en: 'Dark fantasy masterpiece · Wit / MAPPA', cn: '黑暗奇幻巅峰 · 史诗叙事' },
        tag: 'Action / Epic',
      },
      {
        en: 'Steins;Gate',
        cn: '命运石之门',
        note: { en: 'Time-travel sci-fi · White Fox', cn: '时间旅行科幻神作 · 命运石之门的选择' },
        tag: 'Sci-Fi',
      },
      {
        en: 'Fullmetal Alchemist: Brotherhood',
        cn: '钢之炼金术师 FA',
        note: { en: 'Perfect story arc · Bones', cn: '完美结构零差评 · 等价交换' },
        tag: 'Shonen Classic',
      },
      {
        en: 'Violet Evergarden',
        cn: '紫罗兰永恒花园',
        note: { en: 'Visual poetry · Kyoto Animation', cn: '视觉诗篇 · 追寻爱的真谛' },
        tag: 'Drama / KyoAni',
      },
      {
        en: 'Monogatari Series',
        cn: '物语系列',
        note: { en: 'Dialogue-driven art · Shaft', cn: '台词与怪异美学 · 新房昭之' },
        tag: 'Supernatural',
      },
      {
        en: 'Mushishi',
        cn: '虫师',
        note: { en: 'Meditative folklore · Artland', cn: '清冷浮生 · 冥想式民间物语' },
        tag: 'Slice of Life',
      },
    ],
  },
  {
    key: 'movies',
    id: 'movies',
    icon: '🎬',
    eyebrow: { en: 'SCREEN', cn: '银幕' },
    title: { en: 'Movies', cn: '电影' },
    intro: {
      en: 'From Wong Kar-wai to Christopher Nolan — cinema that bends time, challenges perception, and leaves a mark.',
      cn: '从王家卫到诺兰——改变时间感知、挑战认知边界、留下深刻印记的电影。',
    },
    items: [
      {
        en: 'In the Mood for Love',
        cn: '花样年华',
        note: { en: 'Wong Kar-wai · 2000', cn: '王家卫 导演 · 2000' },
        tag: 'Classic Romance',
      },
      {
        en: 'Interstellar',
        cn: '星际穿越',
        note: { en: 'Christopher Nolan · 2014', cn: '克里斯托弗·诺兰 · 2014' },
        tag: 'Hard Sci-Fi',
      },
      {
        en: 'Spirited Away',
        cn: '千与千寻',
        note: { en: 'Hayao Miyazaki · 2001', cn: '宫崎骏 导演 · 2001' },
        tag: 'Ghibli Animation',
      },
      {
        en: 'Parasite',
        cn: '寄生虫',
        note: { en: 'Bong Joon-ho · 2019', cn: '奉俊昊 导演 · 2019' },
        tag: 'Thriller / Palme d\'Or',
      },
      {
        en: 'Blade Runner 2049',
        cn: '银翼杀手 2049',
        note: { en: 'Denis Villeneuve · 2017', cn: '丹尼斯·维伦纽瓦 · 2017' },
        tag: 'Neo-Noir Sci-Fi',
      },
      {
        en: 'Your Name',
        cn: '你的名字。',
        note: { en: 'Makoto Shinkai · 2016', cn: '新海诚 导演 · 2016' },
        tag: 'Romance Fantasy',
      },
    ],
  },
]
