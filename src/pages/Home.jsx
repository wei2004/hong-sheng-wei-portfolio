import React from 'react'
import { Link } from 'react-router-dom'
import { profile, projects, role } from '../data/profile.js'
import Portrait from '../components/Portrait.jsx'

// 首頁作品區分兩層：代表作（大卡、有封面）／其他競賽（一行一列的清單）。
// 卡片可點規則：ongoing（比賽中）與 noPage（無獨立頁）都不可點；noPage 若有 demoPath 給 Demo 連結。
const featured = projects.filter((p) => p.featured)
const others = projects.filter((p) => !p.featured)

// Hero 數字只放能從資料直接數出來的事實
const heroStats = [
  { big: `${featured.length}`, label: '項競賽 · 團隊獲獎' },
  { big: '約 2 年 3 個月', label: '事務所工讀／實習' },
  { big: '修習中', label: '科技法律學程' },
]

function Badge({ children, tone = 'brand' }) {
  const c = tone === 'mint' ? 'bg-mint text-[#062a1c]' : tone === 'white' ? 'bg-white/10 text-white ring-1 ring-line' : 'bg-brand text-[#231600]'
  return <span className={`rounded-md px-2 py-0.5 text-[11px] font-black ${c}`}>{children}</span>
}

function FeaturedCard({ p }) {
  return (
    <Link to={`/projects/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-brand/60 bg-card shadow-glow transition hover:border-brand hover:shadow-card">
      {/* 封面 */}
      <div className="relative aspect-[16/9] overflow-hidden bg-ink2">
        {p.coverImg && (
          <img src={p.coverImg} alt={p.title} loading="lazy"
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge>★ 代表作</Badge>
          {p.startup && <Badge tone="mint">🚀 創業進行中</Badge>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand/90 px-2.5 py-1 text-[12px] font-black text-[#231600]">{p.award}</span>
          <span className="text-[11px] text-white/70">{p.period}</span>
        </div>
      </div>

      {/* 內文 */}
      <div className="flex flex-1 flex-col p-5">
        <div className="text-[12px] font-bold text-cyan">{p.host}</div>
        <h3 className="mt-1 text-lg font-black leading-snug">{p.title}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{p.hook}</p><p className="mt-3 border-l-2 border-cyan/60 pl-3 text-xs leading-relaxed text-cyan">{role(p)}</p>

        {p.stat && (
          <div className="mt-4 flex items-baseline gap-2 border-t border-line/60 pt-3">
            <span className="text-xl font-black text-brand">{p.stat.big}</span>
            <span className="text-[12px] text-mute">{p.stat.label}</span>
          </div>
        )}

        {/* TapAble 專用：一年四站的時間軸 */}
        {p.timeline && (
          <ol className="mt-4 grid grid-cols-4 gap-1 border-t border-line/60 pt-3">
            {p.timeline.map((n, i) => (
              <li key={n.t} className="relative">
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${i === p.timeline.length - 1 ? 'bg-mint' : 'bg-brand'}`} />
                  {i < p.timeline.length - 1 && <span className="ml-1 h-px flex-1 bg-line" />}
                </div>
                <div className="mt-1.5 text-[11px] font-bold leading-tight text-white/90">{n.t}</div>
                <div className="text-[10.5px] leading-tight text-cyan">{n.s}</div>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-auto flex items-center gap-3 pt-4 text-[13px] font-semibold">
          <span className="text-brand">閱讀作品介紹 →</span>
          {p.hasDemo && <span className="text-cyan">可互動 Demo</span>}
          {p.video && <span className="text-cyan">影片</span>}
        </div>
      </div>
    </Link>
  )
}

function OtherRow({ p }) {
  const clickable = !p.ongoing && !p.noPage
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-bold text-cyan">{p.host}</span>
          {p.series && <span className="rounded-md border border-mint/40 px-1.5 py-0.5 text-[10.5px] font-bold text-mint">{p.series}</span>}
        </div>
        <div className="mt-0.5 font-bold leading-snug text-white">{p.title}</div>
        {p.event && <div className="mt-0.5 text-[12px] text-mute">{p.event}</div>}
      </div>
      <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
        <span className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${p.ongoing ? 'bg-mint/15 text-mint' : 'bg-brand/15 text-brand'}`}>{p.award}</span>
        <div className="text-[12px] font-semibold">
          {clickable && <span className="text-brand">閱讀介紹 →</span>}
          {p.ongoing && <span className="text-mute">賽後公開內容</span>}
          {p.noPage && p.demoPath && (
            <a href={p.demoPath} target="_blank" rel="noreferrer" className="text-cyan hover:underline">▶ 開啟 Demo</a>
          )}
          {p.noPage && !p.demoPath && <span className="text-mute">{p.period}</span>}
        </div>
      </div>
    </>
  )
  const base = 'flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 transition'
  return clickable
    ? <Link to={`/projects/${p.slug}`} className={`${base} hover:bg-white/[.03]`}>{inner}</Link>
    : <div className={base}>{inner}</div>
}

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      {/* HERO */}
      <section className="pp-ring">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:py-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-[12px] text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" /> 國立臺北科技大學 · 經營管理系 · 大四
            </div>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              嗨，我是 <span className="pp-grad-text">{profile.name}</span>
            </h1>
            <p className="mt-3 text-lg font-semibold text-white/90 md:text-xl">{profile.title}</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute">{profile.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#/?section=projects" className="rounded-xl bg-brand px-5 py-2.5 font-bold text-[#231600] shadow-glow transition hover:brightness-110">看我的作品 ↓</a>
              <Link to="/cv" className="rounded-xl border border-line px-5 py-2.5 font-semibold text-white/90 transition hover:bg-white/5">履歷</Link>
              {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-xl border border-line px-5 py-2.5 font-semibold text-white/90 transition hover:bg-white/5">GitHub</a>}
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-xl border border-line/70 bg-white/[.03] px-3 py-2.5">
                  <dt className="text-lg font-black text-brand sm:text-2xl">{s.big}</dt>
                  <dd className="mt-0.5 text-[11px] leading-snug text-mute">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="animate-floaty relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand/30 to-cyan/30 blur-2xl" />
              <Portrait className="relative h-52 w-52 rounded-3xl shadow-card md:h-64 md:w-64" />
            </div>
          </div>
        </div>
      </section>

      {/* 能力光譜 */}
      <section className="border-t border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="text-2xl font-black md:text-3xl">從商管出發的四個學習面向</h2>
          <p className="mt-1 text-sm text-mute">透過競賽、研究、實務與法律修課，理解不同的管理問題。</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profile.site.focus.map((f, i) => ({ k: f.title, d: f.text, tag: ['競賽與大學專題', '保包巴士', '國科會計畫參與', '實務與跨域學習'][i], color: ['text-mint', 'text-cyan', 'text-brand', 'text-cyan'][i] })).map((s) => (
              <div key={s.k} className="rounded-2xl border border-line bg-card p-5 transition hover:border-brand/40">
                <div className={`text-lg font-black ${s.color}`}>{s.k}</div>
                <div className="mt-1.5 text-[13px] leading-relaxed text-white/80">{s.d}</div>
                <div className="mt-3 border-t border-line/60 pt-2 text-[11px] text-mute">{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 代表作 */}
      <section id="projects" className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-black md:text-3xl">三項競賽作品</h2>
          <p className="mt-1 text-sm text-mute">品牌行銷、無障礙原型與數位保險。點入了解團隊方案、個人參與及成果證明。</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((p) => <FeaturedCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* 其他競賽 */}
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="mb-5">
          <h2 className="text-xl font-black md:text-2xl">研究與大學專題</h2>
          <p className="mt-1 text-sm text-mute">國科會計畫的資料協助，以及以 S-O-R 理論探討消費者行為的大學專題。</p>
        </div>
        <div className="divide-y divide-line/60 overflow-hidden rounded-2xl border border-line bg-card">
          {others.map((p) => <OtherRow key={p.slug} p={p} />)}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-line/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">關於我</h2>
            <p className="mt-2 text-sm text-mute">{profile.location}・{profile.nameZh}</p>
          </div>
          <div>
            {profile.intro.map((line, i) => (
              <p key={i} className="mb-3 text-[15px] leading-relaxed text-white/85">{line}</p>
            ))}

            {/* 經歷 */}
            <div className="mt-6 space-y-3">
              <div className="mb-2 text-[13px] font-bold text-white/70">經歷</div>
              {profile.experience.map((e) => (
                <div key={`${e.org}-${e.role}`} className="rounded-xl border border-line bg-white/5 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <div className="font-bold text-white">{e.role}<span className="ml-2 text-cyan">{e.org}</span></div>
                    <div className="text-[12px] text-mute">{e.period}</div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {e.points.map((pt, i) => (
                      <li key={i} className="text-[13px] leading-relaxed text-white/80">• {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 學歷 */}
            <div className="mt-4 space-y-2">
              <div className="mb-2 text-[13px] font-bold text-white/70">學歷</div>
              {profile.education.map((ed) => (
                <div key={ed.school} className="flex flex-wrap items-baseline justify-between gap-1 rounded-xl border border-line bg-white/5 px-4 py-3">
                  <div className="text-[14px] text-white/90"><b>{ed.school}</b> · {ed.dept}</div>
                  <div className="text-[12px] text-mute">{ed.period}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-line bg-card p-5">
              <div className="flex flex-wrap items-center gap-3"><h3 className="font-bold">{profile.site.education.law_name}</h3><span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-bold text-mint">{profile.site.education.law_status}</span></div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">已修：{profile.site.education.law_courses.join('、')}。</p>
              <details className="mt-5 border-t border-line pt-4"><summary className="cursor-pointer text-sm text-cyan">精選修課與成績</summary><dl className="mt-4 grid gap-3 sm:grid-cols-2">{profile.site.course_highlights.map(c => <div key={c.name} className="flex justify-between gap-4 text-sm"><dt className="text-mute">{c.name}</dt><dd className="font-bold text-brand">{c.score}</dd></div>)}</dl></details>
            </div>
            {/* 技能：產品 + 技術 */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 text-[13px] font-bold text-brand">證照</div>
                <div className="flex flex-wrap gap-2">
                  {profile.productSkills.map((s) => (
                    <span key={s} className="rounded-lg border border-line bg-white/5 px-2.5 py-1 text-[12px] text-white/85">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 text-[13px] font-bold text-cyan">語言學習</div>
                <div className="flex flex-wrap gap-2">
                  {profile.techSkills.map((s) => (
                    <span key={s} className="rounded-lg border border-line bg-white/5 px-2.5 py-1 text-[12px] text-white/85">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {profile.email && <a href={`mailto:${profile.email}`} className="rounded-xl bg-brand px-5 py-2.5 font-bold text-[#231600] transition hover:brightness-110">聯絡我</a>}
              <Link to="/cv" className="rounded-xl border border-line px-5 py-2.5 font-semibold text-white/90 transition hover:bg-white/5">履歷</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
