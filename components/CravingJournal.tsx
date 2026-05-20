"use client"
import { useEffect, useState } from 'react'

type Entry = {
  id: number
  tag: string
  note: string
  createdAt: string
}

const tags = ['Stress', 'Boredom', 'Social', 'Habit', 'Anxiety', 'Other']
const storageKey = 'quit-craving-journal'

export default function CravingJournal() {
  const [note, setNote] = useState('')
  const [tag, setTag] = useState(tags[0])
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(storageKey)
    if (stored) {
      setEntries(JSON.parse(stored) as Entry[])
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKey, JSON.stringify(entries))
  }, [entries])

  function addEntry() {
    if (!note.trim()) return
    const newEntry: Entry = {
      id: Date.now(),
      tag,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    }
    setEntries((current) => [newEntry, ...current])
    setNote('')
    setTag(tags[0])
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Craving journal</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Capture how you feel</h2>
          <p className="mt-2 text-sm text-slate-400">Log the reason for a craving and review patterns later.</p>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400"
          onClick={() => setEntries([])}
        >
          Clear journal
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Choose a tag</span>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-violet-400">
            {tags.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={addEntry} className="rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
          Log entry
        </button>
      </div>

      <label className="mt-4 block text-sm text-slate-300">
        <span>What triggered this craving?</span>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400" placeholder="Write one or two sentences..." />
      </label>

      <div className="mt-6 space-y-3">
        {entries.length ? (
          entries.map((entry) => (
            <article key={entry.id} className="rounded-3xl border border-white/5 bg-white/5 p-4 text-slate-200">
              <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                <span>{new Date(entry.createdAt).toLocaleString()}</span>
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-200">{entry.tag}</span>
              </div>
              <p className="mt-3 text-slate-100">{entry.note}</p>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-slate-400">No journal entries yet. Add one after your next craving.</div>
        )}
      </div>
    </section>
  )
}
