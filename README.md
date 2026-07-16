# 我的博客（Vite + Vue 3 + GitHub Pages）

一个零成本的个人博客框架：本地用 Vite 开发，推送 GitHub 后由 Actions 自动构建并部署到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev        # 启动开发服务器
```

## 写一篇新文章

在 `src/posts/` 下新建 `xxx.md`，顶部写上 frontmatter：

```md
---
title: 文章标题
date: 2026-07-16
excerpt: 一句话摘要（可选）
---

正文用 Markdown 写……
```

保存后首页会自动列出文章，点击进入详情页。

## 部署到 GitHub Pages

1. 把本项目推送到 GitHub 仓库（例如 `your-name/blog`）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 之后每次 `git push` 到 `main` 分支，Actions 会自动构建并发布。
4. 访问 `https://<user>.github.io/<repo>/`。

### 关于 base 路径（重要）

- **项目站点**（`your-name/blog`）：URL 在子路径下，Actions 已自动传 `--base=/blog/`，无需改动。
- **用户/组织站点**（`your-name.github.io`）：URL 在根路径 `/`，需把 `.github/workflows/deploy.yml` 里
  `npm run build -- --base=/${{ github.event.repository.name }}/` 这一行删掉 `--base=...` 部分（即只保留 `npm run build`）。
- 本地开发不受影响（默认 base 为 `/`）。

## 技术栈

- Vite 5
- Vue 3（`<script setup>` + SFC）
- vue-router 4（history 模式，已适配 base）
- marked（Markdown 渲染）
- 文章即 `src/posts/*.md` 文件，无需数据库
