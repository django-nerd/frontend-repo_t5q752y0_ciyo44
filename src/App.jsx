import React from 'react'
import Header from './components/Header'
import SlotMachine from './components/SlotMachine'

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{background:"radial-gradient(1200px 700px at 50% -10%, rgba(255,255,255,0.15), transparent 60%), linear-gradient(180deg, #7f1d1d 0%, #450a0a 100%)"}}>
      {/* ambient particles */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-red-300/30 blur-3xl rounded-full" />
        <div className="absolute top-1/3 -left-10 w-44 h-44 bg-yellow-300/20 blur-2xl rounded-full" />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-red-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <Header />
        <SlotMachine />
      </div>
    </div>
  )
}

export default App