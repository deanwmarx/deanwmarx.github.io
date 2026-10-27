import { PreviewViewer } from './PreviewViewer'
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, m, useInView, useReducedMotion } from 'motion/react'
import { PhoneFrame } from './PhoneFrame'
import type { Project } from '../schema'

type PhoneShowcaseProps = { showcase: NonNullable<Project['showcase']>; label: string }

export function PhoneShowcase({ showcase, label }: PhoneShowcaseProps) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const showcaseRef = useRef<HTMLElement>(null)
  const visible = useInView(showcaseRef, { amount: .5 })
  const [pending, setPending] = useState<number | null>(null)
  const [error, setError] = useState(false)
  const request = useRef(0)
  const screenId = useId()
  const reduced = useReducedMotion()
  useEffect(() => () => { request.current += 1 }, [])
  const view = showcase.views[active]!
  const first = showcase.views[0]!
  const select = useCallback(async (index: number) => {
    const current = ++request.current
    setError(false)
    if (index === active) { setPending(null); return }
    setPending(index)
    try {
      // Keep the current screen visible until the requested screenshot is ready.
      const image = new Image()
      image.src = showcase.views[index]!.src
      await image.decode()
      if (current !== request.current) return
      setActive(index)
      setPending(null)
    } catch {
      if (current !== request.current) return
      setPending(null)
      setError(true)
    }
  }, [active, showcase.views])
  useEffect(() => {
    if (!playing || hovered || focused || reduced || !visible || showcase.views.length < 2) return
    const timer = window.setInterval(() => {
      if (document.hidden || document.querySelector('dialog[open]')) return
      void select((active + 1) % showcase.views.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [active, focused, hovered, playing, reduced, select, showcase.views.length, visible])
  return <figure ref={showcaseRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }} aria-label={`${label} app preview`} className="phone-showcase flex min-w-0 flex-col gap-3 md:gap-5">
    <div role="group" aria-label={`${label} preview views`} className="phone-showcase-controls order-1 flex flex-wrap justify-center gap-2 md:order-3">
      {showcase.views.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} aria-controls={screenId} onClick={() => { setPlaying(false); void select(index) }} className={`min-h-11 rounded-md border px-3 py-2 text-xs font-medium transition-colors duration-200 motion-reduce:transition-none ${active === index ? 'border-primary bg-accent text-accent-foreground' : 'border-border bg-background text-muted-foreground hover:border-primary hover:text-primary'}`}>
        {item.label}{pending === index && <span className="sr-only"> (loading)</span>}
      </button>)}
      {!reduced && showcase.views.length > 1 && <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause automatic previews' : 'Play automatic previews'} className="min-h-11 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:text-primary">{playing ? 'Pause' : 'Play'}</button>}
    </div>
    <div className="phone-showcase-device relative order-2 mx-auto w-full max-w-[min(16rem,calc((62svh_-_74px)_*_var(--phone-ratio)))] md:order-1 md:max-w-none" style={{ '--phone-ratio': first.width / first.height } as CSSProperties}>
    {showcase.views.length > 1 && ([-1, 1] as const).map(direction => <button
      key={direction}
      type="button"
      aria-label={`${direction === -1 ? 'Previous' : 'Next'} ${label} preview`}
      aria-controls={screenId}
      onClick={() => { setPlaying(false); void select((active + direction + showcase.views.length) % showcase.views.length) }}
      className={`absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-accent hover:text-primary motion-reduce:transition-none md:flex ${direction === -1 ? 'right-full mr-3' : 'left-full ml-3'}`}
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={direction === -1 ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} /></svg>
    </button>)}
    <PhoneFrame id={screenId} busy={pending !== null}>
      <PreviewViewer {...view}><div className="relative isolate overflow-hidden bg-device-screen" style={{ aspectRatio: `${first.width} / ${first.height}` }}>
        <AnimatePresence initial={false}>
          <m.img key={view.id} src={view.src} alt={view.alt} width={view.width} height={view.height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .22 }} />
        </AnimatePresence>
      </div></PreviewViewer>
    </PhoneFrame>
    </div>
    <figcaption className="phone-showcase-caption order-3 mx-auto min-h-12 md:order-2 max-w-sm text-center text-sm leading-relaxed text-muted-foreground" aria-live="polite" aria-atomic="true">{view.caption}</figcaption>

    {error && <p role="alert" className="order-4 text-center text-xs text-muted-foreground">This view could not load. Please try again.</p>}
  </figure>
}
