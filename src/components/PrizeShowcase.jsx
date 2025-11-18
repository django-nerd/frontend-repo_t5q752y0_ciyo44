import React from 'react'

const prizes = [
  { key: 'laptop', label: 'Laptop', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', chance: '0%' },
  { key: 'gopay50', label: 'GoPay 50.000', img: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1200&auto=format&fit=crop', chance: '0%' },
  { key: 'gopay10', label: 'GoPay 10.000', img: 'https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=1200&auto=format&fit=crop', chance: '0.5%' },
  { key: 'candy', label: 'Permen', img: 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=1200&auto=format&fit=crop', chance: '20%' },
  { key: 'zonk', label: 'Zonk', img: 'https://images.unsplash.com/photo-1605146768880-2c9fa4c9fdf7?q=80&w=1200&auto=format&fit=crop', chance: '79.5%' },
]

export default function PrizeShowcase() {
  return (
    <div className="hidden lg:flex lg:flex-col gap-4 w-52">
      {prizes.map((p) => (
        <div key={p.key} className="relative rounded-xl overflow-hidden shadow-xl border border-white/10">
          <img src={p.img} alt={p.label} className="h-28 w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-white font-semibold text-sm drop-shadow">{p.label}</p>
            <p className="text-yellow-200 text-xs">Chance: {p.chance}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
