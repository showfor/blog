<script setup>
import AppIcon from './AppIcon.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const navItems = [
  { id: 'intro', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'hobbies', label: '爱好' },
  { id: 'music', label: '音乐' },
  { id: 'anime', label: '动漫' },
  { id: 'movies', label: '电影' },
  { id: 'strengths', label: '优势' },
  { id: 'contact', label: '联系' },
]

const props = defineProps({ brand: { type: String, default: '我的主页' } })

// 深色模式：读取本地偏好，默认跟随系统
const isDark = ref(false)
const activeId = ref('intro')
let io = null
onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  apply()

  // 滚动监听：高亮当前所在板块（scrollspy）
  const sections = navItems
    .map(n => document.getElementById(n.id))
    .filter(Boolean)
  io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) activeId.value = e.target.id }),
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  )
  sections.forEach(s => io.observe(s))
})
onUnmounted(() => io && io.disconnect())

function apply() {
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
}
function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  apply()
  // 切换时的轻微弹跳，增强动态反馈
  popping.value = true
  setTimeout(() => (popping.value = false), 480)
}
const popping = ref(false)
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <a href="#top" class="nav-brand">
        <span class="nav-dot"></span>{{ brand }}
      </a>
      <nav class="nav-links">
        <a v-for="item in navItems" :key="item.id" :href="'#' + item.id" :class="{ active: activeId === item.id }">{{ item.label }}</a>
      </nav>
      <button class="nav-theme" :class="{ pop: popping }" :title="isDark ? '切换到浅色' : '切换到深色'" @click="toggleTheme" aria-label="切换主题">
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
.nav-links a.active {
  color: var(--text);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  box-shadow: inset 0 -2px 0 0 var(--accent);
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
  transition: background .3s ease, transform .3s cubic-bezier(.22, 1, .36, 1), border-color .3s ease;
}
.nav-theme:hover { background: var(--surface-2); transform: rotate(15deg); }
.nav-theme.pop { animation: themePop .48s cubic-bezier(.22, 1, .36, 1); }
@keyframes themePop {
  0% { transform: rotate(0) scale(1); }
  45% { transform: rotate(-25deg) scale(1.18); }
  100% { transform: rotate(0) scale(1); }
}

@media (max-width: 640px) {
  /* 移动端不再隐藏导航，改为横向滚动，保证所有板块可直达 */
  .nav-links {
    display: flex;
    margin-left: 10px;
    gap: 2px;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    mask-image: linear-gradient(to right, transparent, #000 12px, #000 calc(100% - 12px), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 12px, #000 calc(100% - 12px), transparent);
  }
  .nav-links::-webkit-scrollbar { display: none; }
  .nav-links a { padding: 6px 10px; font-size: 0.85rem; white-space: nowrap; }
  .nav-brand { font-size: 0.95rem; }
}
</style>
