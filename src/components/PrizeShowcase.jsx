import React from 'react'

const moneyImg = 'https://images.unsplash.com/photo-1616077168079-c8a0b1e9c85b?q=80&w=1200&auto=format&fit=crop'
const laptopImg = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop'
const candyImg = 'https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=1200&auto=format&fit=crop'
const zonkImg =
  "data:image/svg+xml;utf8,<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%23ffdddd'/><g stroke='%23cc0000' stroke-width='40' stroke-linecap='round'><line x1='120' y1='80' x2='480' y2='320'/><line x1='480' y1='80' x2='120' y2='320'/></g></svg>"

const prizes = [
  { key: 'laptop', label: 'Laptop', img: laptopImg },
  { key: 'gopay50', label: 'E-Money 50.000', img: moneyImg },
  { key: 'gopay10', label: 'E-Money 10.000', img: moneyImg },
  { key: 'candy', label: 'Permen', img: candyImg },
  { key: 'zonk', label: 'Zonk', img: zonkImg },
]

export default function PrizeShowcase() {
  return (
    <div className="hidden lg:flex lg:flex-col gap-4 w-52">
      {prizes.map((p) => (
        <div key={p.key} className="relative rounded-xl overflow-hidden shadow-xl border border-white/10">
          <img src={p.img} alt={p.label} className="h-28 w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-white font-semibold text-sm drop-shadow">{p.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
