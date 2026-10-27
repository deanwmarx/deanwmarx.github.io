import { useEffect, useRef, useState } from 'react'
import { subscribeToScroll } from '../lib/scroll'

export function useActiveSection() {
  const [active, setActive] = useState<string>()
  const last = useRef<string | undefined>(undefined)
  useEffect(() => subscribeToScroll(() => {
    const work = document.getElementById('work')?.getBoundingClientRect()
    const skills = document.getElementById('skills')?.getBoundingClientRect()
    const line = window.matchMedia('(min-width: 768px)').matches ? 170 : 90
    const next = skills && skills.top <= line ? '#skills' : work && work.top <= line && work.bottom > line ? '#work' : undefined
    if (next !== last.current) { last.current = next; setActive(next) }
  }), [])
  return active
}
