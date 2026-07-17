import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// React + Vite 入口：挂到 #root，开启 StrictMode（仅开发期双调用 effect，生产构建无影响）。
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
