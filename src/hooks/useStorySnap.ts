import { useEffect } from 'react'
import { animate } from 'motion/react'
import { beginScrollTransition, finishScrollTransition } from '../lib/scroll-transition'
import { subscribeToScroll, storyDestinationId } from '../lib/scroll'

const transitionDuration = 1.15

export function useStorySnap() {
  useEffect(() => {
    const root = document.documentElement
    let animation: ReturnType<typeof animate> | undefined
    let pendingFrame = 0
    let animating = false
    let wheelTotal = 0
    let lastWheel = 0
    let quietUntil = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const snapping = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)')
    const destinationFor = (element: HTMLElement) => {
      const firstProject = document.querySelector<HTMLElement>('.project-anchor')
      return document.getElementById(storyDestinationId(element.id, firstProject?.id)) ?? element
    }
    const offset = (target?: HTMLElement) => {
      const header = window.innerWidth >= 768 ? 88 : 0
      return header + (target?.matches('.project-anchor, .story-hero') ? Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0)
    }
    const navigator = document.querySelector<HTMLElement>('.project-navigator')
    const headerElement = document.querySelector<HTMLElement>('.site-header')
    const measureNavigator = () => {
      root.style.setProperty('--intro-header-height', `${headerElement?.getBoundingClientRect().height ?? 88}px`)
      root.style.setProperty('--project-strip-height', `${navigator?.getBoundingClientRect().height ?? 0}px`)
    }
    const observer = new ResizeObserver(measureNavigator)
    if (navigator) observer.observe(navigator)
    if (headerElement) observer.observe(headerElement)
    measureNavigator()
    let wasInSkills = Boolean(document.getElementById('skills') && document.getElementById('skills')!.getBoundingClientRect().top <= offset() + 2)
    const update = () => {
      const skills = document.getElementById('skills')
      const inSkills = Boolean(skills && skills.getBoundingClientRect().top <= offset() + 2)
      // Also ease boundary crossings caused by native scrolling (touch/keyboard).
      if (snapping.matches && wasInSkills && !inSkills && !animating && !reduced.matches) {
        const lastProject = document.querySelector<HTMLElement>('.project-anchor:last-child')
        if (lastProject) {
          root.classList.add('wheel-story')
          pendingFrame = requestAnimationFrame(() => transitionTo(Math.max(0, destinationFor(lastProject).getBoundingClientRect().top + window.scrollY - offset(destinationFor(lastProject)))))
        }
      }
      wasInSkills = inSkills
      root.classList.toggle('story-snap', snapping.matches && !animating && !inSkills)
    }
    const cancel = () => {
      cancelAnimationFrame(pendingFrame)
      animation?.stop()
      finishScrollTransition()
      animation = undefined
      animating = false
      wheelTotal = 0
      update()
    }
    const transitionTo = (target: number, complete?: () => void) => {
      cancel()
      animating = true
      beginScrollTransition(transitionDuration)
      update()
      animation = animate(window.scrollY, target, {
        duration: transitionDuration,
        ease: [.65, 0, .35, 1],
        onUpdate: (value) => window.scrollTo({ top: value, behavior: 'instant' }),
        onComplete: () => {
          animating = false
          finishScrollTransition()
          animation = undefined
          quietUntil = performance.now() + 120
          complete?.()
          update()
        },
      })
    }
    const onWheel = (event: WheelEvent) => {
      if (document.querySelector('dialog[open]')) return
      if (!snapping.matches || reduced.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      root.classList.add('wheel-story')
      if (animating) { event.preventDefault(); return }
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
      const skills = document.getElementById('skills')
      if (!skills) return
      const skillsTop = skills.getBoundingClientRect().top
      // Catch the upward gesture before it crosses from free scrolling into chapters.
      const enteringStory = delta < 0 && skillsTop - delta >= offset() - 2
      if (skillsTop <= offset() + 2 && !enteringStory) return
      // Ignore the trailing momentum of the gesture that started this transition.
      const now = performance.now()
      if (now < quietUntil) { event.preventDefault(); quietUntil = now + 120; return }
      const chapterElements = [...document.querySelectorAll<HTMLElement>('.story-hero, .project-anchor, #skills')]
      const chapters = chapterElements.map(destinationFor)
      const positions = chapters.map((chapter) => Math.max(0, chapter.getBoundingClientRect().top + window.scrollY - offset(chapter)))
      const current = window.scrollY
      const direction = Math.sign(event.deltaY)
      const target = direction > 0 ? positions.find((position) => position > current + 3) : positions.findLast((position) => position < current - 3)
      if (target === undefined) return
      // Tall chapters retain ordinary scrolling until their trailing edge is reached.
      const chapterIndex = positions.findLastIndex((position) => position <= current + 3)
      const chapter = chapterElements[chapterIndex]
      if (chapter && chapter.getBoundingClientRect().height > window.innerHeight - offset() + 4) {
        const bounds = chapter.getBoundingClientRect()
        if ((direction > 0 && bounds.bottom > window.innerHeight + 4) || (direction < 0 && bounds.top < offset() - 4)) return
      }
      event.preventDefault()
      wheelTotal = now - lastWheel > 180 || Math.sign(wheelTotal) !== direction ? delta : wheelTotal + delta
      lastWheel = now
      if (Math.abs(wheelTotal) < 24) return
      transitionTo(target)
    }
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
      const hash = link?.getAttribute('href')
      if (!hash || hash === '#' || link?.target === '_blank') return
      const anchor = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!anchor) return
      const destination = destinationFor(anchor)
      cancel()
      if (reduced.matches) return
      event.preventDefault()
      // Wait for the mobile menu to close before measuring the destination.
      pendingFrame = requestAnimationFrame(() => {
        const top = destination.getBoundingClientRect().top + window.scrollY - offset(destination)
        const target = Math.max(0, Math.min(top, root.scrollHeight - window.innerHeight))
        if (window.location.hash !== hash) window.history.pushState(null, '', hash)
        transitionTo(target, () => {
          const hadTabIndex = destination.hasAttribute('tabindex')
          if (!hadTabIndex) destination.setAttribute('tabindex', '-1')
          destination.focus({ preventScroll: true })
          if (!hadTabIndex) destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true })
        })
      })
    }
    const unsubscribe = subscribeToScroll(update)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', cancel)
    window.addEventListener('pointerdown', cancel)
    window.addEventListener('resize', cancel)
    document.addEventListener('click', onClick)
    reduced.addEventListener('change', cancel)
    return () => {
      unsubscribe()
      observer.disconnect()
      root.style.removeProperty('--project-strip-height')
      root.style.removeProperty('--intro-header-height')
      cancelAnimationFrame(pendingFrame)
      animation?.stop()
      finishScrollTransition()
      root.classList.remove('story-snap', 'wheel-story')
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', cancel)
      window.removeEventListener('pointerdown', cancel)
      window.removeEventListener('resize', cancel)
      document.removeEventListener('click', onClick)
      reduced.removeEventListener('change', cancel)
    }
  }, [])
}
