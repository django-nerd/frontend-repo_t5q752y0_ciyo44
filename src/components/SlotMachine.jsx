import React, { useMemo, useRef, useState } from 'react'

// Symbols configuration
const SYMBOLS = [
  { id: 'laptop', label: '💻', weight: 0 }, // 0% win chance
  { id: 'gopay50', label: '💸', weight: 0 }, // 0% win chance
  { id: 'gopay10', label: '🪙', weight: 0.5 }, // 0.5% overall when all three match
  { id: 'candy', label: '🍬', weight: 20 }, // 20%
  { id: 'zonk', label: '❌', weight: 79.5 }, // remaining
]

function weightedRandomSymbol() {
  const total = SYMBOLS.reduce((sum, s) => sum + s.weight, 0)
  let r = Math.random() * total
  for (const s of SYMBOLS) {
    if ((r -= s.weight) <= 0) return s
  }
  return SYMBOLS[SYMBOLS.length - 1]
}

function decideResult() {
  // Determine if it is a forced win for gopay10 or candy according to chances
  // Chances define probability of a full 3-match outcome per spin
  const roll = Math.random() * 100
  if (roll < 0.5) {
    return 'gopay10'
  } else if (roll < 0.5 + 20) {
    return 'candy'
  }
  return 'zonk'
}

function getSymbolForId(id) {
  return SYMBOLS.find((s) => s.id === id) || SYMBOLS[SYMBOLS.length - 1]
}

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false)
  const [message, setMessage] = useState('')
  const [columns, setColumns] = useState([
    { id: 'candy', label: '🍬' },
    { id: 'zonk', label: '❌' },
    { id: 'gopay10', label: '🪙' },
  ])

  const targetRef = useRef(['zonk', 'zonk', 'zonk'])

  const spin = () => {
    if (spinning) return
    setMessage('')
    setSpinning(true)

    const outcome = decideResult()
    // Laptop and gopay50 have 0% chance to win as 3-match
    const target = outcome === 'zonk' ? ['zonk', 'candy', 'zonk'] : [outcome, outcome, outcome]
    targetRef.current = target

    // Animate for ~2.5s with easing, then settle to target
    const start = performance.now()
    const duration = 2600

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      // EaseOutCubic
      const eased = 1 - Math.pow(1 - t, 3)

      // During spin, show random symbols weighted (but exclude impossible jackpots visually can appear, but final outcome enforces chance)
      if (t < 0.85) {
        setColumns([
          weightedRandomSymbol(),
          weightedRandomSymbol(),
          weightedRandomSymbol(),
        ])
      } else {
        // Interpolate to target in the last 15%
        const step = (idx) => (eased - 0.85) / 0.15 > idx / 3
        setColumns((prev) => prev.map((c, i) => getSymbolForId(step(i) ? target[i] : prev[i].id)))
      }

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        // Finalize
        setColumns(target.map(getSymbolForId))
        const isWin = target.every((v) => v === target[0]) && target[0] !== 'zonk'
        setMessage(
          isWin ? 'Hoki juga lu, selamat ya.' : "You're a loser"
        )
        setSpinning(false)
      }
    }

    requestAnimationFrame(tick)
  }

  const bgGlow = useMemo(
    () => 'shadow-[0_0_60px_rgba(255,255,255,0.2)]',
    []
  )

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-start justify-center gap-6">
        {/* Left prizes */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 gap-4 w-40">
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop" className="h-28 w-full object-cover" />
              <div className="bg-black/60 text-white text-xs p-2">Laptop (0%)</div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=800&auto=format&fit=crop" className="h-28 w-full object-cover" />
              <div className="bg-black/60 text-white text-xs p-2">GoPay 50K (0%)</div>
            </div>
          </div>
        </div>

        {/* Machine */}
        <div className="flex-1">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-red-700 to-red-900 border border-red-300/20 shadow-2xl">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.25),transparent_40%)]" />
            <div className="relative">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {columns.map((s, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-28 sm:h-36 md:h-44 rounded-2xl bg-gradient-to-b from-red-800 to-red-950 border border-red-300/20 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl text-yellow-200 ${bgGlow}`}
                  >
                    <span className="drop-shadow-[0_0_10px_rgba(255,220,100,0.5)]">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center">
                <button
                  onClick={spin}
                  disabled={spinning}
                  className="relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-yellow-400 text-red-900 font-extrabold text-lg sm:text-xl tracking-wide transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                >
                  <span className="absolute inset-0 rounded-full bg-white/50 blur-sm"></span>
                  <span className="relative">SPIN</span>
                </button>
              </div>

              {message && (
                <div className="mt-6 text-center text-white text-lg font-semibold">
                  {message}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-center text-red-100 text-sm">
            Hadiah tersedia: Laptop, GoPay 50.000, GoPay 10.000, Permen, dan Zonk. Laptop & GoPay 50K tidak bisa dimenangkan.
          </div>
        </div>

        {/* Right prizes */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 gap-4 w-40">
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" className="h-28 w-full object-cover" />
              <div className="bg-black/60 text-white text-xs p-2">GoPay 10K (0.5%)</div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=800&auto=format&fit=crop" className="h-28 w-full object-cover" />
              <div className="bg-black/60 text-white text-xs p-2">Permen (20%)</div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" className="h-28 w-full object-cover" />
              <div className="bg-black/60 text-white text-xs p-2">Zonk (79.5%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
