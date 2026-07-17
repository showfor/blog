<script setup>
import { profile } from '../data/profile.js'
import AppIcon from './AppIcon.vue'

// 取邮箱地址用于大号 CTA（若有 mailto）
const emailLink = profile.links.find(l => l.icon === 'mail')
const emailAddr = emailLink ? emailLink.url.replace(/^mailto:/, '') : ''
</script>

<template>
  <section id="contact" class="section">
    <div class="section-head">
      <span class="eyebrow">Contact</span>
      <span class="section-index">03</span>
      <h2 class="section-title">联系方式</h2>
    </div>

    <p class="contact-text" v-reveal>{{ profile.contactText }}</p>

    <div class="contact-actions" v-reveal>
      <a v-if="emailAddr" class="contact-mail" :href="'mailto:' + emailAddr">
        <AppIcon name="mail" /> {{ emailAddr }}
      </a>
      <div class="contact-links">
        <a
          v-for="link in profile.links"
          :key="link.label"
          class="contact-link"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          <AppIcon :name="link.icon" /> {{ link.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-text {
  font-size: clamp(1.3rem, 3.4vw, 2rem);
  font-weight: 600;
  line-height: 1.5;
  margin: 0 0 32px;
  max-width: 26ch;
}
.contact-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; }
.contact-mail {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  background: var(--grad);
  padding: 16px 28px;
  border-radius: 999px;
  box-shadow: 0 12px 30px color-mix(in srgb, var(--accent) 38%, transparent);
  transition: transform .25s cubic-bezier(.22, 1, .36, 1), box-shadow .25s ease;
}
.contact-mail .app-icon { width: 1.2em; height: 1.2em; }
.contact-mail:hover { transform: translateY(-3px); box-shadow: 0 18px 40px color-mix(in srgb, var(--accent) 48%, transparent); }
.contact-links { display: flex; flex-wrap: wrap; gap: 10px; }
.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 11px 18px;
  border-radius: 999px;
  font-size: 0.92rem;
  transition: transform .2s, border-color .2s, color .2s;
}
.contact-link:hover { transform: translateY(-2px); border-color: var(--accent); color: var(--accent); }
</style>
