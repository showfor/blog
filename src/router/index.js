import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'

// 注意：history 的 base 必须用 import.meta.env.BASE_URL，
// 否则部署到 GitHub Pages 子路径时路由会 404
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/post/:slug', name: 'post', component: Post },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
