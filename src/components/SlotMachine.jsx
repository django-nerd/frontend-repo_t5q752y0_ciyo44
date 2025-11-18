import React, { useMemo, useRef, useState } from 'react'
import PrizeShowcase from './PrizeShowcase'

// Base symbols in order they appear on the reels
const SYMBOLS = [
  { id: 'laptop', label: '💻' },
  { id: 'gopay50', label: '💸' }, // distinct e-money visual for 50k
  { id: 'gopay10', label: '💵' }, // e-money visual for 10k
  { id: 'candy', label: '🍬' },
  { id: 'zonk', label: '❌' },
]

function decideResult() {
  // 0.5% three-of-a-kind for gopay10, 20% three-of-a-kind for candy, else zonk (no laptop/gopay50 jackpots)
  const roll = Math.random() * 100
  if (roll < 0.5) return 'gopay10'
  if (roll < 20.5) return 'candy'
  return 'zonk'
}

function labelFor(id){
  const map = {
    laptop: 'Laptop',
    gopay50: 'E-Money 50.000',
    gopay10: 'E-Money 10.000',
    candy: 'Permen',
    zonk: 'Zonk'
  }
  return map[id] || id
}

function Reel({ targetId, spinKey, height = 112 }) {
  // height ~ item box height in px (responsive-ish via Tailwind sizes)
  const [pos, setPos] = useState(0) // integer item index
  const [anim, setAnim] = useState('')

  const labels = useMemo(() => SYMBOLS.map((s) => s.label), [])
  const ids = useMemo(() => SYMBOLS.map((s) => s.id), [])
  const baseLen = ids.length

  const totalRepeat = 20
  const totalItems = baseLen * totalRepeat

  const targetIndex = ids.indexOf(targetId)

  // Build long list for seamless spin
  const items = useMemo(() => {
    const arr = []
    for (let i = 0; i < totalRepeat; i++) arr.push(...labels)
    return arr
  }, [labels])

  React.useEffect(() => {
    // Trigger on each spinKey change
    const baseSpins = 8 + Math.floor(Math.random() * 5) // 8-12 full cycles
    const newPos = pos + baseSpins * baseLen + (targetIndex >= 0 ? targetIndex : baseLen - 1)

    // Fixed 3000ms animation duration for all reels
    const duration = 3000
    setAnim(`transform ${duration}ms cubic-bezier(0.17, 0.84, 0.44, 1)`)

    // set to large translate then normalize at end
    requestAnimationFrame(() => {
      setPos(newPos)
    })

    const t = setTimeout(() => {
      setAnim('')
      // normalize to keep number small
      setPos((p) => p % baseLen)
    }, duration + 80)

    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinKey])

  const translateY = -((pos % totalItems) * height)

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-red-800 to-red-950 border border-red-300/20 flex-1" style={{ height }}>
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      <div
        className="will-change-transform"
        style={{ transform: `translateY(${translateY}px)`, transition: anim }}
      >
        {items.map((label, i) => (
          <div key={i} className="flex items-center justify-center" style={{ height }}>
            <span className="text-5xl sm:text-6xl md:text-7xl text-yellow-200 drop-shadow-[0_0_10px_rgba(255,220,100,0.5)]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SlotMachine() {
  const [spinning, setSpinning] = useState(false)
  const [spinKey, setSpinKey] = useState(0)
  const [targets, setTargets] = useState(['candy', 'zonk', 'gopay10'])
  const [resultMsg, setResultMsg] = useState('')
  const [resultDetail, setResultDetail] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setShowPopup(false)
    setResultMsg('')
    setResultDetail('')

    const outcome = decideResult()

    // Sync reels with outcome: all three should show the same symbol for the final state
    const target = [outcome, outcome, outcome]
    setTargets(target)

    // trigger reels
    setSpinKey((k) => k + 1)

    // Wait until animations finish (3000ms) + buffer
    const totalDuration = 3000 + 180
    setTimeout(() => {
      const isWin = outcome !== 'zonk' // since non-zonk outcomes are jackpots
      if (isWin) {
        setResultMsg('Hoki juga lu, selamat ya.')
        setResultDetail(`Kamu menang: ${labelFor(outcome)}`)
      } else {
        setResultMsg("You're a loser")
        setResultDetail('Coba lagi, siapa tau hoki berikutnya.')
      }
      setShowPopup(true)
      setSpinning(false)
    }, totalDuration)
  }

  const bgGlow = useMemo(() => 'shadow-[0_0_60px_rgba(255,255,255,0.2)]', [])

  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-start justify-center gap-4 md:gap-6">
        {/* left prizes */}
        <div className="hidden md:block w-44 shrink-0">
          <PrizeShowcase group="left" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative rounded-3xl p-4 sm:p-6 md:p-8 bg-gradient-to-br from-red-700 to-red-900 border border-red-300/20 shadow-2xl">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.25),transparent_40%)]" />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <Reel targetId={targets[0]} spinKey={spinKey} height={104} />
                <Reel targetId={targets[1]} spinKey={spinKey} height={104} />
                <Reel targetId={targets[2]} spinKey={spinKey} height={104} />
              </div>

              <div className="mt-5 sm:mt-6 flex items-center justify-center">
                <button
                  onClick={spin}
                  disabled={spinning}
                  className={`relative inline-flex items-center justify-center px-7 py-3 rounded-full bg-yellow-400 text-red-900 font-extrabold text-lg sm:text-xl tracking-wide transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 ${bgGlow}`}
                >
                  <span className="absolute inset-0 rounded-full bg-white/50 blur-sm"></span>
                  <span className="relative">SPIN</span>
                </button>
              </div>
            </div>
          </div>

          {/* footer credit */}
          <div className="mt-3 text-xs text-red-100/70">
            deploy by ; Aldrien for TekFor 2
          </div>
        </div>

        {/* right prizes */}
        <div className="hidden md:block w-44 shrink-0">
          <PrizeShowcase group="right" />
        </div>
      </div>

      {/* Result Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-100 transition-opacity" onClick={() => setShowPopup(false)} />
          <div className="relative bg-white/95 text-red-900 rounded-2xl px-6 py-5 shadow-2xl border border-red-300/40 scale-100 opacity-100 transition-all duration-300">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-yellow-300/20 to-red-500/10 blur-xl" aria-hidden />
            <div className="relative text-center">
              <div className="text-2xl sm:text-3xl font-extrabold mb-2">{resultMsg}</div>
              {resultDetail && <div className="mb-3 text-sm sm:text-base font-semibold">{resultDetail}</div>}
              <button
                onClick={() => setShowPopup(false)}
                className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full bg-red-700 text-white font-semibold hover:bg-red-800 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
