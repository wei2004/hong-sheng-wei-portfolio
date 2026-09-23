import React, { useRef, useState } from 'react'
import { asset } from '../data/profile.js'

export default function Media({ item, eager = false }) {
  const dialog = useRef(null)
  const trigger = useRef(null)
  const [open, setOpen] = useState(false)
  const src = asset(item.path)
  function expand(event) {
    if (!dialog.current?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setOpen(true)
    dialog.current.showModal()
  }
  return <figure className="overflow-hidden rounded-2xl border border-line bg-ink2">
    <a ref={trigger} href={src} onClick={expand} target="_blank" rel="noreferrer" aria-label={`放大：${item.alt}`} className="block">
      <img src={src} alt={item.alt} width={item.width} height={item.height} loading={eager ? 'eager' : 'lazy'} className="max-h-[560px] w-full object-contain" />
      <span className="block px-4 pt-2 text-xs text-cyan">點擊放大 ↗</span>
    </a>
    <figcaption className="px-4 py-3 text-[13px] leading-relaxed text-mute">{item.caption}</figcaption>
    <dialog ref={dialog} className="photo-dialog" onClose={() => { setOpen(false); trigger.current?.focus() }} onClick={e => { if (e.target === dialog.current) dialog.current.close() }}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <a href={src} target="_blank" rel="noreferrer" className="text-sm text-cyan">開啟原圖 ↗</a>
        <button type="button" onClick={() => dialog.current.close()} className="rounded-lg border border-line px-4 py-2">關閉 ×</button>
      </div>
      {open && <img src={src} alt={item.alt} className="mx-auto max-h-[75vh] max-w-full object-contain" />}
      <p className="mt-3 text-sm text-mute">{item.caption}</p>
    </dialog>
  </figure>
}
