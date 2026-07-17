<script setup>
import { profile } from '../data/profile.js'
</script>

<template>
  <section id="strengths" class="section">
    <div class="section-head">
      <span class="eyebrow">Capabilities</span>
      <span class="section-index">02</span>
      <h2 class="section-title">个人优势</h2>
      <p class="section-sub">不是简历式的罗列，而是我对待生活与创作的方式。</p>
    </div>

    <div class="strength-grid">
      <div
        v-for="(s, i) in profile.strengths"
        :key="s.title"
        class="strength-card"
        v-reveal="i * 0.07"
      >
        <span class="strength-no">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="strength-title">{{ s.title }}</h3>
        <p class="strength-desc">{{ s.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strength-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}
.strength-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px 24px 26px;
  overflow: hidden;
  transition: transform .45s cubic-bezier(.22, 1, .36, 1), box-shadow .45s ease, border-color .3s ease;
}
.strength-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover), 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
}
.strength-no {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--accent);
  opacity: .7;
}
.strength-title { font-size: 1.2rem; margin: 14px 0 10px; }
.strength-desc { color: var(--text-muted); line-height: 1.75; font-size: 0.92rem; margin: 0; }
</style>
