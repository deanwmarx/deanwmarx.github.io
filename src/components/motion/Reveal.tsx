import { useEffect, useRef } from 'react'
import type { PropsWithChildren } from 'react'
import { m, useAnimationControls, useInView, useReducedMotion } from 'motion/react'

export function Reveal({ children, entry, armed, delay = 0, className = '' }: PropsWithChildren<{ entry: number; armed: boolean; delay?: number; className?: string }>) {
  const target = useRef<HTMLDivElement>(null)
  const visible = useInView(target, { amount: .15 })
  const played = useRef(0)
  const controls = useAnimationControls()
  const reduced = useReducedMotion()
  const replay = armed ? entry > 0 : entry > 1
  useEffect(() => {
    if (reduced === true) {
      controls.stop()
      controls.set('static')
      target.current?.setAttribute('data-settled', 'true')
      return
    }
    if (armed) {
      controls.stop()
      target.current?.removeAttribute('data-settled')
      controls.set('prepare')
      return
    }
    if (!visible || entry === 0 || played.current === entry) return
    played.current = entry
    void controls.start('enter').then(() => target.current?.setAttribute('data-settled', 'true'))
  }, [visible, armed, entry, reduced, controls])
  return (
    <m.div ref={target} data-entry={entry} className={`motion-reveal ${className}`} initial="prepare" animate={controls} custom={replay} variants={{
      static: { opacity: 1, y: 0 },
      prepare: (returning: boolean) => ({ opacity: 0, y: returning ? 12 : 24 }),
      enter: (returning: boolean) => ({ opacity: 1, y: 0, transition: { duration: returning ? .4 : .6, delay: returning ? delay / 2 : delay, ease: [.2, .8, .2, 1] } }),
    }}>{children}</m.div>
  )
}
