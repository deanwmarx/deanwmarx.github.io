import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { blueprintContinuousRoute, blueprintDetails, blueprintRevealRange, blueprintSeparators, isBlueprintDetail } from '../../lib/blueprint-story'
import { blueprintSymbols } from '../../lib/blueprint-symbols'
import { desktopBlueprintDetails } from '../../lib/blueprint-decoration'
import type { BlueprintStop } from '../../lib/blueprint-story'

const fragmentPaths = {
  start: 'M2 0H22 M12 -10V10 M8 -4H16V4H8Z',
  work: 'M2 -12V12 M0 -12H5 M0 12H5 M7 -8H25V8H7 M11 -4H21 M11 0H18',
  skills: 'M2 -12H26V12H2Z M10 -12V12 M18 -12V12 M2 -4H26 M2 4H26',
  end: 'M24 -10V10H2 M19 -5V5H7 M3 -1L7 3L13 -4',


}

function BlueprintStroke({ d, start, end, viewport, maxScroll, scroll, reduced, transform, fragment = false, fadeOnly = false }: {
  d: string; start: number; end: number; viewport: number; maxScroll: number; scroll: MotionValue<number>; reduced: boolean; transform?: string; fragment?: boolean; fadeOnly?: boolean
}) {
  const drawn = useTransform(scroll, blueprintRevealRange(start, end, viewport, maxScroll), [0, 1])
  return <m.path d={d} transform={transform} style={{ pathLength: reduced || fadeOnly ? 1 : drawn, opacity: fadeOnly ? (reduced ? .3 : drawn) : undefined }} className={fragment ? 'blueprint-story-fragment' : 'blueprint-story-line'} />
}

function BlueprintGuide({ stops, viewport, height, scroll, reduced }: { stops: BlueprintStop[]; viewport: number; height: number; scroll: MotionValue<number>; reduced: boolean }) {
  const route = blueprintContinuousRoute(stops, viewport, Math.max(0, height - viewport))
  const drawn = useTransform(scroll, route.input, route.output)
  return <m.path d={route.d} style={{ pathLength: reduced ? 1 : drawn }} className="blueprint-story-line" />
}

export function BlueprintStory() {
  const target = useRef<HTMLDivElement>(null)
  const [geometry, setGeometry] = useState<{ width: number; height: number; stops: BlueprintStop[]; viewport: number; left: number; right: number } | null>(null)
  const { scrollY } = useScroll()
  const reduced = useReducedMotion() === true
  useEffect(() => {
    const page = target.current?.parentElement
    if (!page) return
    const measure = () => {
      const top = page.getBoundingClientRect().top + window.scrollY
      const position = (selector: string) => (page.querySelector(selector)?.getBoundingClientRect().top ?? 0) + window.scrollY - top
      const height = page.clientHeight
      const width = page.clientWidth
      const left = Math.max(width >= 768 ? 22 : 12, (width - 1280) / 2 + 22)
      const right = width - Math.max(left, 16)
      const start = position('.story-hero') + 40
      const end = Math.max(start + 1, height - 32)
      setGeometry({ width, height, left, right, viewport: window.innerHeight, stops: blueprintDetails([
        { x: left, y: start, kind: 'start' },
        { x: right, y: position('#work') + 16, turnY: position('#work'), kind: 'work' },
        { x: left, y: position('#skills') + 24, turnY: position('#skills'), kind: 'skills' },
        { x: right, y: end, turnY: position('footer') + 16, kind: 'end' },
      ]) })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(page)
    window.addEventListener('resize', measure)
    measure()
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  return <div ref={target} aria-hidden="true" className="blueprint-story pointer-events-none absolute inset-0 select-none">
    {geometry && <svg width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width} ${geometry.height}`} fill="none" className="overflow-visible" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {geometry.width >= 1024
        ? <BlueprintGuide stops={geometry.stops} viewport={geometry.viewport} height={geometry.height} scroll={scrollY} reduced={reduced} />
        : blueprintSeparators(geometry.stops, geometry.width).map(separator => <path key={separator.kind} d={separator.d} className="blueprint-mobile-separator" opacity=".5" />)}
      {geometry.stops.filter(stop => geometry.width >= 1024 && !isBlueprintDetail(stop.kind)).map((stop, index) => <BlueprintStroke key={`${stop.kind}-${index}`} d={fragmentPaths[stop.kind as keyof typeof fragmentPaths]} start={stop.y - 24} end={stop.y + 24} transform={`translate(${stop.x - 12} ${stop.y})`} fragment fadeOnly viewport={geometry.viewport} maxScroll={Math.max(0, geometry.height - geometry.viewport)} scroll={scrollY} reduced={reduced} />)}
      {desktopBlueprintDetails(geometry.width, geometry.stops[0]!.y, geometry.height - 32).map((detail, index) => {
        const symbol = blueprintSymbols[detail.asset]!
        return <g key={`decoration-${index}`} className="blueprint-story-decoration" opacity={symbol.radius > 40 ? .38 : .6}>
          <BlueprintStroke d={symbol.d} start={detail.y - 40} end={detail.y + 40} transform={`translate(${detail.x} ${detail.y}) rotate(${detail.angle}) scale(${detail.scale}) translate(${-symbol.cx} ${-symbol.cy})`} fragment fadeOnly viewport={geometry.viewport} maxScroll={Math.max(0, geometry.height - geometry.viewport)} scroll={scrollY} reduced={reduced} />
        </g>
      })}
    </svg>}
  </div>
}
