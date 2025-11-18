import React from 'react'

export default function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-yellow-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
        Se Hoki apa sih lu?
      </h1>
      <p className="mt-3 text-red-100/90 text-sm sm:text-base">
        Tekan tombol spin. Jika tiga ikon sama (dan bukan ZONK), kamu menang!
      </p>
    </div>
  )
}
