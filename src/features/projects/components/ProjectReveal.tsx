import { createContext, useContext, useEffect, useRef } from 'react'
import type { PropsWithChildren } from 'react'
import { m, useAnimationControls, useReducedMotion } from 'motion/react'
import { onScrollTransitionEnd, remainingScrollTransition } from '../../../lib/scroll-transition'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

type Entrance = { direction: number; visits: number; duration: number }
const RevealContext = createContext<{
  controls: ReturnType<typeof useAnimationControls>
  entrance: { current: Entrance }
} | null>(null)

export function ProjectReveal({ children }: PropsWithChildren) {
  const controls = useAnimationControls()
  const entrance = useRef<Entrance>({ direction: 1, visits: 0, duration: 1 })
  return <RevealContext.Provider value={{ controls, entrance }}>{children}</RevealContext.Provider>
}

export function ProjectPreviewReveal({ children }: PropsWithChildren) {
  const context = useContext(RevealContext)
  const controls = context?.controls
  const entrance = context?.entrance
  const target = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 1024px)')
  useEffect(() => {
    if (!controls || !entrance || !target.current) return
    if (reduced) { controls.set('visible'); return }
    let lastY = window.scrollY
    let direction = 1
    let armed = true
    const trackDirection = () => {
      const nextY = window.scrollY
      if (nextY !== lastY) direction = nextY > lastY ? 1 : -1
      lastY = nextY
    }
    const observer = new IntersectionObserver(([observed]) => {
      if (!observed) return
      if (!observed.isIntersecting) {
        armed = true
        controls.stop()
        controls.set('hidden')
      } else if (armed && observed.intersectionRatio >= .35) {
        armed = false
        entrance.current.direction = direction
        entrance.current.visits += 1
        entrance.current.duration = Math.min(entrance.current.visits > 1 ? .7 : 1, remainingScrollTransition() ?? 1)
        controls.set('hidden')
        void controls.start('visible')
      }
    }, { threshold: [0, .35] })
    const unsubscribe = onScrollTransitionEnd(() => {
      if (!armed) { controls.stop(); controls.set('visible') }
    })
    window.addEventListener('scroll', trackDirection, { passive: true })
    observer.observe(target.current)
    return () => { unsubscribe(); observer.disconnect(); window.removeEventListener('scroll', trackDirection) }
  }, [controls, entrance, reduced])
  return <div ref={target}><m.div className="project-preview-reveal" initial="hidden" animate={controls ?? 'visible'} variants={{
    hidden: () => ({ opacity: 0, y: (entrance?.current.direction ?? 1) * -48, scale: .95, filter: desktop ? 'blur(6px)' : 'blur(0px)' }),
    visible: () => ({ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: reduced ? 0 : entrance?.current.duration ?? 1, ease: [.25, .1, .25, 1] } }),
  }}>{children}</m.div></div>
}

export function ProjectTitle({ id, children }: PropsWithChildren<{ id: string }>) {
  const controls = useAnimationControls()
  const target = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!target.current || reduced) { controls.set('rest'); return }
    let pending = false
    let armed = true
    const pulse = () => {
      if (!pending || remainingScrollTransition() !== undefined || !target.current) return
      const bounds = target.current.getBoundingClientRect()
      if (bounds.top < 0 || bounds.bottom > window.innerHeight) return
      pending = false
      void controls.start('pulse')
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (!entry.isIntersecting) {
        pending = false
        armed = true
        controls.stop()
        controls.set('rest')
      } else if (armed && entry.intersectionRatio >= .5) { pending = true; armed = false }
    }, { threshold: [0, .5] })
    observer.observe(target.current)
    const unsubscribe = onScrollTransitionEnd(pulse)
    window.addEventListener('scrollend', pulse)
    return () => { observer.disconnect(); unsubscribe(); window.removeEventListener('scrollend', pulse) }
  }, [controls, reduced])
  return <m.h3 ref={target} id={id} className="project-title w-fit max-w-full origin-center font-bold leading-tight tracking-[-0.035em] text-foreground" initial="rest" animate={controls} variants={{
    rest: { scale: 1 },
    pulse: { scale: [1, 1.018, 1], transition: { duration: .42, times: [0, .45, 1], ease: 'easeInOut' } },
  }}>{children}</m.h3>
}
