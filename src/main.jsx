import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 30, color: '#fff', background: '#111', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#c8ff00' }}>hakuriver</h1>
          <p>页面加载发生异常，正在尝试自动恢复...</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', background: '#c8ff00', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
          >
            重新加载页面
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
