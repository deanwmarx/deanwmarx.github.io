import { useEffect, useRef, useState } from 'react'
import { nextSectionEntry } from '../lib/section-entry'

const initialEntry = { armed: true, count: 0 }

// Partial scrolling never re-arms an entrance; the whole section must leave.
export function useSectionEntry() {
  const target = useRef<HTMLElement>(null)
  const state = useRef(initialEntry)
  const [snapshot, setSnapshot] = useState(initialEntry)
  useEffect(() => {
    if (!target.current) return
    const observer = new IntersectionObserver(([observed]) => {
      if (!observed) return
      const next = nextSectionEntry(state.current, observed.isIntersecting, observed.intersectionRatio)
      if (next !== state.current) setSnapshot(next)
      state.current = next
    }, { threshold: [0, .08] })
    observer.observe(target.current)
    return () => observer.disconnect()
  }, [])
  return { target, entry: snapshot.count, armed: snapshot.armed }
}
