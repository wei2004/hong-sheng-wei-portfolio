import React from 'react'
import { profile } from '../data/profile.js'

export default function Portrait({ className = '', small = false }) {
  return profile.photo
    ? <img src={profile.photo} alt={profile.name} className={`object-cover ${className}`} />
    : <div className={`flex flex-col items-center justify-center bg-card ring-1 ring-line ${className}`} aria-label="個人照片預留位置">
      <span className={`font-black pp-grad-text ${small ? 'text-lg' : 'text-6xl'}`}>崴</span>
      {!small && <span className="mt-4 text-xs tracking-widest text-mute">PERSONAL PORTFOLIO</span>}
    </div>
}
