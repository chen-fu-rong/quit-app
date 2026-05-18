"use client"
import { useState } from 'react'

export default function CravingCrusher() {
  const [health, setHealth] = useState(100)
  const [crushed, setCrushed] = useState(false)
  const [shake, setShake] = useState(false)

  function hit() {
    if (crushed) return
    const newHealth = Math.max(0, health - 15)
    setHealth(newHealth)
    setShake(true)
    setTimeout(() => setShake(false), 100)

    if (newHealth === 0) {
      setCrushed(true)
      setTimeout(() => {
        setHealth(100)
        setCrushed(false)
      }, 4000)
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Crush the Urge</p>
      <h2 className="mt-2 text-xl font-semibold text-white">Tap the monster to fight cravings</h2>

      <div className="my-8 flex justify-center">
        <button
          onClick={hit}
          className={`relative flex h-32 w-32 cursor-pointer select-none items-center justify-center rounded-full text-[5rem] transition-transform ${
            shake ? '-rotate-12 scale-90' : ''
          } ${
            crushed ? 'scale-150 opacity-0 duration-500 ease-out' : 'duration-75 active:scale-75'
          }`}
          style={!crushed ? { transform: `scale(${0.4 + (health / 100) * 0.6}) ${shake ? 'rotate(10deg)' : ''}` } : {}}
        >
          {crushed ? '💥' : '👾'}
        </button>
      </div>

      <div className="mx-auto mt-4 h-3 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
        <div className="h-full bg-violet-500 transition-all duration-200" style={{ width: `${health}%` }} />
      </div>
      <p className="mt-4 h-5 text-sm text-slate-400">
        {crushed ? "Urge destroyed! Keep it up! 🎉" : "Rapid tap to destroy!"}
      </p>
    </section>
  )
}
