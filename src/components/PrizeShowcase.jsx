import React from 'react'

// Use the exact same visuals as the reels: emoji symbols
const PRIZES = [
  { key: 'laptop', label: 'Laptop', symbol: '💻' },
  { key: 'gopay50', label: 'E-Money 50.000', symbol: '💵' },
  { key: 'gopay10', label: 'E-Money 10.000', symbol: '💵' },
  { key: 'candy', label: 'Permen', symbol: '🍬' },
  { key: 'zonk', label: 'Zonk', symbol: '❌' },
]

export default function PrizeShowcase() {
  return (
    <div className="flex flex-col gap-3 w-44">
      {PRIZES.map((p) => (
        <div
          key={p.key}
          className="relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-gradient-to-b from-red-800/60 to-red-950/70 px-3 py-2"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-black/30">
              <span className="text-3xl sm:text-4xl text-yellow-200 drop-shadow-[0_0_8px_rgba(255,220,100,0.45)]">
                {p.symbol}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-tight truncate">{p.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
