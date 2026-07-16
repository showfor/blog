<script setup>
import AppIcon from './AppIcon.vue'

const navItems = [
  { id: 'intro', label: '简介' },
  { id: 'hobbies', label: '爱好' },
  { id: 'music', label: '音乐' },
  { id: 'anime', label: '动漫' },
  { id: 'movies', label: '电影' },
]

const props = defineProps({ brand: { type: String, default: '我的主页' } })

// 深色模式：读取本地偏好，默认跟随系统
import { ref, onMounted } from 'vue'
const isDark = ref(false)
onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  apply()
})
function apply() {
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
}
function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  apply()
}
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <a href="#top" class="nav-brand">
        <span class="nav-dot"></span>{{ brand }}
      </a>
      <nav class="nav-links">
        <a v-for="item in navItems" :key="item.id" :href="'#' + item.id">{{ item.label }}</a>
      </nav>
      <button class="nav-theme" :title="isDark ? '切换到浅色' : '切换到深色'" @click="toggleTheme" aria-label="切换主题">
        <AppIcon :name="isDark ? 'sun' : 'moon'" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  height: 60px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.nav-brand {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 9px;
  white-space: nowrap;
}
.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
}
.nav-links {
  display: flex;
  gap: 4px;
  margin-left: auto;
}
.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.92rem;
  padding: 7px 12px;
  border-radius: 999px;
  transition: color .2s, background .2s;
}
.nav-links a:hover {
  color: var(--text);
  background: var(--surface-2);
}
.nav-theme {
  margin-left: 4px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 1.05rem;
  transition: background .2s, transform .2s;
}
.nav-theme:hover { background: var(--surface-2); transform: rotate(15deg); }

@media (max-width: 640px) {
  .nav-links { display: none; }
  .nav-brand { margin-right: auto; }
}
</style>
