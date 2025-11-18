import React from 'react'

// Use the same visuals as the reels (emojis)
const PRIZES = [
  { key: 'laptop', label: 'Laptop', symbol: '💻' },
  { key: 'gopay50', label: 'Rp. 50000', symbol: '💵' },
  { key: 'gopay10', label: 'Rp. 10000', symbol: '💵' },
  { key: 'candy', label: 'Permen', symbol: '🍬' },
  { key: 'zonk', label: 'Zonk', symbol: '❌' },
]

export default function PrizeShowcase() {
  const leftGroup = PRIZES.filter(p => ['laptop','gopay50','gopay10'].includes(p.key))
  const rightGroup = PRIZES.filter(p => ['candy','zonk'].includes(p.key))

  const Card = ({ item }) => (
    <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-gradient-to-b from-red-800/60 to-red-950/70 px-3 py-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-black/30">
          <span className="text-2xl sm:text-3xl text-yellow-200 drop-shadow-[0_0_8px_rgba(255,220,100,0.45)]">
            {item.symbol}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">{item.label}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-44">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {leftGroup.map((p) => (
            <Card key={p.key} item={p} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {rightGroup.map((p) => (
            <Card key={p.key} item={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
