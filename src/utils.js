// 资源路径助手：自动拼接 GitHub Pages 子路径 base（如 /blog/）。
// 放到 public/ 下的文件用此函数引用，部署在子路径时也能正确加载。
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + '/' + String(path).replace(/^\//, '')
}
