import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 项目站点会把网站放在 https://<user>.github.io/<repo>/ 子路径下，
// 所以 base 必须带仓库名。构建时由 GitHub Actions 通过 --base 传入，本地默认 '/'
export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [react()],
})
