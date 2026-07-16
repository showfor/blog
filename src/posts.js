import { marked } from 'marked'

// 用 Vite 的 import.meta.glob 在构建期把 src/posts 下的所有 .md 以原始文本导入
const modules = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// 极简 frontmatter 解析：支持 title / date / excerpt 三个字段
function parseFrontmatter(raw) {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw)
  if (!match) return { meta: {}, content: raw }
  const meta = {}
  match[1].split('\n').forEach((line) => {
    const i = line.indexOf(':')
    if (i > -1) {
      const key = line.slice(0, i).trim()
      let val = line.slice(i + 1).trim()
      val = val.replace(/^["']|["']$/g, '')
      meta[key] = val
    }
  })
  return { meta, content: match[2] }
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { meta, content } = parseFrontmatter(raw)
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      excerpt: meta.excerpt || '',
      html: marked.parse(content),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1)) // 按日期倒序
