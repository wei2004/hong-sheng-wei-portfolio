// 建置時檢查所有頁面能否完整產生，也預先放入首頁內容。
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
export function render(url) {
  return renderToString(<StaticRouter location={url}><App /></StaticRouter>)
}
