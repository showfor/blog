<script setup>
import { musicCategories } from '../data/music.js'
import { asset } from '../utils.js'
</script>

<template>
  <section id="music" class="section">
    <div class="section-head">
      <span class="eyebrow">Music</span>
      <h2 class="section-title">我爱的音乐</h2>
      <p class="section-sub">按心情分类的循环歌单。</p>
    </div>

    <div v-for="cat in musicCategories" :key="cat.name" class="music-cat">
      <h3 class="music-cat-name">{{ cat.name }}</h3>
      <div class="music-grid">
        <div v-for="(song, i) in cat.songs" :key="song.title" class="music-card" v-reveal="i * 0.05">
          <div class="music-cover">
            <img :src="asset(song.cover)" :alt="song.title" loading="lazy" />
          </div>
          <div class="music-info">
            <p class="music-title">{{ song.title }}</p>
            <p class="music-artist">{{ song.artist }}</p>
            <p class="music-album">{{ song.album }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.music-cat { margin-bottom: 36px; }
.music-cat:last-child { margin-bottom: 0; }
.music-cat-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 16px;
  padding-left: 12px;
  border-left: 3px solid var(--accent);
}
.music-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 18px;
}
.music-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
  display: flex;
  gap: 14px;
  align-items: center;
  transition: transform .45s cubic-bezier(.22, 1, .36, 1), box-shadow .45s ease, border-color .45s ease;
}
.music-card:hover {
  transform: translateY(-5px) scale(1.015);
  box-shadow: var(--shadow-hover), 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
}
.music-cover {
  flex: 0 0 64px;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
}
.music-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.music-info { min-width: 0; }
.music-title { font-weight: 600; margin: 0 0 4px; font-size: 0.95rem; }
.music-artist { color: var(--text-muted); font-size: 0.85rem; margin: 0 0 2px; }
.music-album { color: var(--text-muted); font-size: 0.78rem; margin: 0; opacity: .8; }

@media (max-width: 480px) {
  .music-card { flex-direction: column; text-align: center; align-items: center; }
}
</style>
