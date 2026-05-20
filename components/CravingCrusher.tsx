"use client"
import { useEffect, useState } from 'react'

type Effect = {
  id: number
  x: number
  y: number
  emoji: string
}

export default function CravingCrusher() {
  const [health, setHealth] = useState(100)
  const [crushed, setCrushed] = useState(false)
  const [shake, setShake] = useState(false)
  const [effects, setEffects] = useState<Effect[]>([])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setEffects((current) => current.slice(-12))
    }, 1000)
    return () => window.clearTimeout(timeout)
  }, [effects])

  function playHitSound() {
    if (typeof window === 'undefined' || !window.AudioContext) return
    const audioContext = new window.AudioContext()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    oscillator.type = 'triangle'
    oscillator.frequency.value = 440
    gain.gain.value = 0.12
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.08)
    oscillator.onended = () => audioContext.close()
  }

  function createEffect() {
    const id = Date.now()
    const effect: Effect = {
      id,
      x: Math.random() * 120 - 60,
      y: Math.random() * -80 - 30,
      emoji: ['✨', '💥', '⚡', '🔥'][Math.floor(Math.random() * 4)],
    }
    setEffects((current) => [...current, effect])
    window.setTimeout(() => {
      setEffects((current) => current.filter((item) => item.id !== id))
    }, 450)
  }

  function hit() {
    if (crushed) return
    const newHealth = Math.max(0, health - 15)
    setHealth(newHealth)
    setShake(true)
    createEffect()
    playHitSound()
    if (navigator.vibrate) navigator.vibrate([12, 18, 12])

    window.setTimeout(() => setShake(false), 120)

    if (newHealth === 0) {
      setCrushed(true)
      window.setTimeout(() => {
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
        <div className="relative flex h-40 w-40 items-center justify-center">
          {effects.map((effect) => (
            <span
              key={effect.id}
              className="absolute text-2xl opacity-100 animate-ping"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${effect.x}px, ${effect.y}px)`,
              }}
            >
              {effect.emoji}
            </span>
          ))}

          <button
            onClick={hit}
            className={`relative flex h-32 w-32 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full border border-violet-400/20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-[5rem] text-white shadow-[0_0_40px_rgba(124,58,237,0.25)] transition-transform duration-150 ease-out ${
              shake ? '-rotate-12 scale-95' : ''
            } ${crushed ? 'scale-150 opacity-0 duration-500 ease-out' : 'active:scale-80'} ${
              crushed ? 'shadow-[0_0_80px_rgba(248,113,113,0.35)]' : 'shadow-[0_0_30px_rgba(99,102,241,0.35)]'
            }`}
            style={!crushed ? { transform: `scale(${0.45 + (health / 100) * 0.55})` } : {}}
          >
            {crushed ? '💥' : '👾'}
          </button>

          <div className={`pointer-events-none absolute inset-0 rounded-full ${crushed ? 'animate-ping bg-pink-500/20' : 'opacity-0'}`} />
          <div className={`pointer-events-none absolute inset-0 rounded-full border border-violet-500/20 ${shake || crushed ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
        </div>
      </div>

      <div className="mx-auto mt-4 h-3 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
        <div className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all duration-300" style={{ width: `${health}%` }} />
      </div>
      <p className="mt-4 h-5 text-sm text-slate-400">
        {crushed ? 'Urge destroyed! Keep it up! 🎉' : 'Rapid tap to destroy!'}
      </p>
    </section>
  )
}
