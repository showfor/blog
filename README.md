# 个人主页（Vite + Vue 3 + GitHub Pages）

一个零成本的**个人自我介绍展示网站**：个人简介 / 我的爱好 / 我爱的音乐 / 我爱看的动漫 / 我爱看的电影。纯静态、响应式、带深色模式，没有文章发布后台——只是把"你是谁、你喜欢什么"漂亮地陈列出来。

本地用 Vite 开发，推送到 GitHub 后由 Actions 自动构建并部署到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev        # 启动开发服务器
```

## 怎么换成你自己的内容

所有展示内容都在 `src/data/` 下的数据文件里，**改文件即可，不用碰组件**：

| 文件 | 控制板块 |
|------|----------|
| `src/data/profile.js` | 个人简介（名字、头衔、简介、所在地、社交链接） |
| `src/data/hobbies.js` | 我的爱好（卡片列表） |
| `src/data/music.js` | 我爱的音乐（按分类组织，含歌曲/歌手/专辑） |
| `src/data/anime.js` | 我爱看的动漫（名称 + 信息） |
| `src/data/movies.js` | 我爱看的电影（片名 + 年份 + 推荐语） |

### 替换封面 / 头像

图片放在 `public/covers/` 下（现用的是渐变占位图）。把 `cover` 字段改成你的图片路径即可，例如：

```js
// src/data/music.js
{ title: '晴天', artist: '周杰伦', album: '叶惠美', cover: 'covers/my-cover.jpg' }
```

把 `my-cover.jpg` 丢进 `public/covers/` 即可。音乐封面建议正方形，动漫/电影建议竖图。

## 部署到 GitHub Pages

1. 把本项目推送到 GitHub 仓库（如 `your-name/blog`）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 之后每次 `git push` 到 `main` 分支，Actions 自动构建并发布。
4. 访问 `https://<user>.github.io/<repo>/`。

> 本项目站点（仓库名不是 `*.github.io`）已自动处理子路径 base，无需改动。本地开发默认 base 为 `/`，也不受影响。

## 技术栈

- Vite 5
- Vue 3（`<script setup>` + 单文件组件）
- 纯数据驱动：内容集中在 `src/data/`，组件只负责展示
- 自带深色模式（跟随系统 + 手动切换，记忆偏好）
- 响应式：桌面多列网格，移动端自动单列
