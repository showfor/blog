// 临时测试：检查网易云外链播放器是否包含可播放逻辑
const ids = {
  hisaishi: 443794,
  mono: 776668,
  nujabes: 1332676778,
  olafur: 1304866633,
  tank: 592687,
  radwimps: 426881487,
};

(async () => {
  for (const [k, id] of Object.entries(ids)) {
    try {
      const res = await fetch(`https://music.163.com/outchain/player?type=2&id=${id}&auto=0&height=152`);
      const html = await res.text();
      const hasPlay = /music-icon|icon-play|toggle|play-bg/.test(html);
      const hasDisabled = /disabled|not-allowed|未开启|暂不支持/.test(html);
      console.log(`${k} (${id}): len=${html.length} hasPlayBtn=${hasPlay} maybeBlocked=${hasDisabled}`);
    } catch (e) {
      console.log(`${k} (${id}): ERR ${e.message}`);
    }
  }
  console.log('done');
})();
