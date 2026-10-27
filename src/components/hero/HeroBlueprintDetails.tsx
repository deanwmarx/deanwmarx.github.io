import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { blueprintSymbols } from '../../lib/blueprint-symbols'
import { heroBlueprintDetails } from '../../lib/hero-blueprint'

export function HeroBlueprintDetails() {
  const target = useRef<HTMLDivElement>(null)
  const [details, setDetails] = useState<ReturnType<typeof heroBlueprintDetails>>([])
  const reduced = useReducedMotion()
  useEffect(() => {
    const hero = target.current?.parentElement
    const copy = hero?.querySelector('.hero-copy')
    if (!hero || !copy) return
    const measure = () => {
      const bounds = hero.getBoundingClientRect()
      const text = copy.getBoundingClientRect()
      const column = hero.querySelector('.hero-illustration')?.getBoundingClientRect()
      setDetails(heroBlueprintDetails({ width: bounds.width, height: bounds.height, copyTop: text.top - bounds.top,
        copyBottom: text.bottom - bounds.top, desktop: window.innerWidth >= 1024, columnLeft: (column?.left ?? bounds.right) - bounds.left }))
    }
    const observer = new ResizeObserver(measure)
    observer.observe(hero)
    observer.observe(copy)
    window.addEventListener('resize', measure)
    measure()
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  return <div ref={target} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {details.map(detail => {
      const symbol = blueprintSymbols.find(symbol => symbol.id === detail.id)!
      return <m.svg key={detail.id} className="hero-blueprint-detail absolute text-primary" width={detail.size} height={detail.size} viewBox={`${symbol.cx - symbol.radius} ${symbol.cy - symbol.radius} ${symbol.radius * 2} ${symbol.radius * 2}`} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ left: detail.x - detail.size / 2, top: detail.y - detail.size / 2, rotate: detail.angle }} initial={{ opacity: reduced ? .5 : 0 }} whileInView={{ opacity: .5 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .5 }}><path d={symbol.d} /></m.svg>
    })}
  </div>
}
