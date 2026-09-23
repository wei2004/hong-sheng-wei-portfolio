import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
const projects = fs.readdirSync('content/projects').filter(n=>n.endsWith('.json')).map(n=>JSON.parse(fs.readFileSync(`content/projects/${n}`, 'utf8'))).filter(p=>p.visible)
const routes = ['/', '/cv', ...projects.map(p=>`/projects/${p.slug}`)]
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
  fs.mkdirSync('.qa', { recursive: true })
  let home = ''
  for (const url of routes) {
    // SSR 開發環境會回傳 /assets；轉成相對路徑，讓 GitHub Pages 的
    // /repository-name/ 子路徑在 JavaScript 載入前也能顯示正確圖片。
    const html = render(url)
      .replaceAll('src="/assets/', 'src="./assets/')
      .replaceAll('href="/assets/', 'href="./assets/')
    const visibleText = html.replace(/<[^>]*>/g,'')
    assert(!/\?{2,}|\uFFFD/.test(visibleText), `中文損壞：${url}`)
    assert(html.includes('洪聖崴'), `姓名缺漏：${url}`)
    assert((html.match(/<h1(?:\s|>)/g)||[]).length === 1, `需有一個主標題：${url}`)
    assert(!/CMoney|95%|心理學副學士|a96020183@gmail|0901-404-044|PressPlay|金孕獎/.test(visibleText), `混入學長個人經歷：${url}`)
    for (const [,src] of html.matchAll(/(?:src|href)="(\.\/assets\/[^"#]+)(?:#[^"]*)?"/g)) {
      assert(fs.existsSync(path.join('dist',decodeURIComponent(src))), `素材不存在：${src}`)
    }
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])
    assert(new Set(ids).size===ids.length, `id 重複：${url}`)
    if(url === '/') home=html.replaceAll('href="/', 'href="#/')
    fs.writeFileSync(`.qa/${url==='/'?'index':url.replaceAll('/','-')}.html`, html, 'utf8')
  }
  assert(home.includes('檜山坊') && home.includes('TapAble') && home.includes('保包巴士'), '首頁競賽不完整')
  assert(home.includes('修習中'), '法律學程狀態缺漏')
  assert(!home.includes('mailto:null'), '出現空聯絡資訊')
  const template=fs.readFileSync('dist/index.html','utf8')
  fs.writeFileSync('dist/index.html',template.replace('<div id="root"></div>',`<div id="root">${home}</div>`),'utf8')
  fs.writeFileSync('dist/.nojekyll','')
  console.log(`Render OK: ${routes.length} pages; Chinese, identity, assets, headings and duplicate IDs checked.`)
} finally { await server.close() }
