import { useEffect, useRef, useState } from 'react'
import { useMotionValue } from 'motion/react'
import type { Project } from './schema'
import { activeBoundary, sectionProgress, subscribeToScroll } from '../../lib/scroll'
import { projectAnchor } from './navigation'

export function useProjectScroll(projects: readonly Project[]) {
  const section = useRef<HTMLElement>(null)
  const progress = useMotionValue(0)
  const [state, setState] = useState({ index: 0, visible: false, scrollable: false })
  const latest = useRef(state)
  useEffect(() => {
    const element = section.current
    if (!element) return
    const articles = projects.map(({ id }) => document.getElementById(projectAnchor(id))).filter((node) => node !== null)
    const update = () => {
      const viewport = window.innerHeight
      const offset = window.matchMedia('(min-width: 768px)').matches ? 112 : 0
      const rect = element.getBoundingClientRect()
      const range = sectionProgress(rect.top, rect.height, viewport, offset)
      progress.set(range.progress)
      const next = {
        index: range.scrollable && range.progress === 1 ? Math.max(0, projects.length - 1) : activeBoundary(articles.map((article) => article.getBoundingClientRect().top), offset + Math.min(160, viewport * .2)),
        visible: rect.top < viewport && rect.bottom > offset,
        scrollable: range.scrollable,
      }
      if (next.index !== latest.current.index || next.visible !== latest.current.visible || next.scrollable !== latest.current.scrollable) {
        latest.current = next
        setState(next)
      }
    }
    const unsubscribe = subscribeToScroll(update)
    const observer = new ResizeObserver(update)
    observer.observe(element)
    observer.observe(document.body)
    return () => { unsubscribe(); observer.disconnect() }
  }, [projects, progress])
  return { section, progress, ...state }
}
