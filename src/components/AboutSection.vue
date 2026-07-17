<script setup>
import { profile } from '../data/profile.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="about" class="section">
    <div class="section-head">
      <span class="eyebrow">About</span>
      <span class="section-index">01</span>
      <h2 class="section-title">关于我</h2>
    </div>

    <div class="about-grid">
      <div class="about-bio" v-reveal>
        <p>{{ profile.bio }}</p>
      </div>
      <div class="about-stats">
        <div v-for="(s, i) in profile.stats" :key="s.label" class="stat-card" v-reveal="i * 0.07">
          <span class="stat-num">{{ s.num }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <p class="about-statement" v-reveal>{{ profile.slogan }}</p>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 36px;
  align-items: start;
}
.about-bio p {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--text-muted);
}
.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px 20px;
  transition: transform .4s cubic-bezier(.22, 1, .36, 1), border-color .3s ease, box-shadow .3s ease;
}
.stat-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
  box-shadow: var(--shadow-hover);
}
.stat-num {
  display: block;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.1;
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat-label { font-size: 0.85rem; color: var(--text-muted); }
/* 大字主张：仿 gerenzhan 的 “DESIGN IS NOT DECORATION” 收尾陈述 */
.about-statement {
  margin: 44px 0 0;
  font-size: clamp(1.5rem, 4.5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: .5px;
  max-width: 18ch;
}
.about-statement::after {
  content: "";
  display: block;
  width: 56px; height: 4px;
  margin-top: 18px;
  border-radius: 4px;
  background: var(--grad);
}

@media (max-width: 760px) {
  .about-grid { grid-template-columns: 1fr; gap: 24px; }
}
</style>
