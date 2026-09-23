import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Project from './pages/Project.jsx'
import CV from './pages/CV.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { projects, profile } from './data/profile.js'

function ScrollTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    const title = pathname === '/cv' ? '履歷' : projects.find(p => pathname === `/projects/${p.slug}`)?.short
    document.title = `${title ? title + '｜' : ''}${profile.name} · 個人履歷與作品集`
    const section = new URLSearchParams(search).get('section')
    const frame = requestAnimationFrame(() => {
      if (section) document.getElementById(section)?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, search])
  return null
}
export default function App() {
  return <div className="min-h-screen">
    <a href="#main" className="skip-link" onClick={e => {e.preventDefault(); document.getElementById('main')?.focus()}}>跳至主要內容</a>
    <ScrollTop /><Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="/cv" element={<CV />} />
      <Route path="*" element={<main id="main" className="mx-auto max-w-4xl px-5 py-20"><h1 className="text-3xl font-bold">找不到這個頁面</h1><Link to="/" className="mt-6 block text-cyan">回到首頁 →</Link></main>} />
    </Routes><Footer />
  </div>
}
