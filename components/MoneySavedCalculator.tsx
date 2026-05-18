"use client"
import { useEffect, useState } from 'react'

type Props = { days: number }

export default function MoneySavedCalculator({ days }: Props) {
  const [cigsPerDay, setCigsPerDay] = useState<number>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('cigsPerDay') : null
    return s ? Number(s) : 10
  })
  const [packPrice, setPackPrice] = useState<number>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('packPrice') : null
    return s ? Number(s) : 6
  })

  useEffect(() => {
    localStorage.setItem('cigsPerDay', String(cigsPerDay))
  }, [cigsPerDay])
  useEffect(() => {
    localStorage.setItem('packPrice', String(packPrice))
  }, [packPrice])

  const saved = days * (cigsPerDay / 20) * packPrice

  return (
    <div className="mt-3 p-3 border rounded">
      <h3 className="font-medium">Money Saved</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <label className="text-sm">Cigs / day
          <input type="number" value={cigsPerDay} onChange={e=>setCigsPerDay(Number(e.target.value))} className="w-full border px-2 py-1 rounded mt-1" />
        </label>
        <label className="text-sm">Pack price
          <input type="number" value={packPrice} onChange={e=>setPackPrice(Number(e.target.value))} className="w-full border px-2 py-1 rounded mt-1" />
        </label>
      </div>
      <p className="mt-2">Estimated money saved: <strong>${saved.toFixed(2)}</strong></p>
    </div>
  )
}
