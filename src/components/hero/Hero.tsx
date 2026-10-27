import { HeroBlueprintDetails } from './HeroBlueprintDetails'
import { BlueprintIllustration } from './BlueprintIllustration'
import { useEffect } from 'react'
import { useSectionEntry } from '../../hooks/useSectionEntry'
import { m, useAnimationControls, useReducedMotion, useScroll } from 'motion/react'
import { ActionLink } from '../ActionLink'

export function Hero() {
  const { target, entry } = useSectionEntry()
  const highlight = useAnimationControls()
  const reduced = useReducedMotion()
  useEffect(() => {
    if (entry === 1 && reduced === false) void highlight.start({ x: ['-110%', '110%'], opacity: [0, .22, 0], transition: { duration: 1.5, delay: .12, ease: [.2, .8, .2, 1] } })
  }, [entry, reduced, highlight])
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end start'] })
  return (
    <section ref={target} data-entry={entry} aria-labelledby="hero-title" className="story-hero relative isolate grid min-w-0 items-center gap-8 overflow-clip py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:overflow-visible lg:py-24">
      <div className="hero-copy relative z-10 min-w-0 space-y-7">
        <h1 id="hero-title" className="hero-title font-bold tracking-[-0.055em] text-foreground">Complex products.<br /><span className="relative inline-block overflow-hidden align-bottom text-primary">Simple experiences.<m.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded bg-primary" initial={{ x: '-110%', opacity: 0 }} animate={highlight} /></span></h1>
        <p className="max-w-xl text-base leading-relaxed text-secondary-foreground sm:text-lg">I’m Dean, a frontend developer with 10 years of experience in website and app development. I design and prototype in Figma, then build—with user experience first.</p>
        <ActionLink href="#work" direction="down">Explore my work</ActionLink>
      </div>
      <div className="hero-illustration hidden lg:block lg:relative lg:w-full"><BlueprintIllustration progress={scrollYProgress} entry={entry} /></div>
      <HeroBlueprintDetails />
    </section>
  )
}
