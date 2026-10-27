export const clampProgress = (value: number) => Math.max(0, Math.min(1, value))

export function sectionProgress(top: number, height: number, viewport: number, offset: number) {
  const distance = height - viewport + offset
  return { scrollable: distance > 1, progress: distance > 1 ? clampProgress((offset - top) / distance) : 0 }
}

export function activeBoundary(tops: readonly number[], line: number) {
  let active = 0
  for (let index = 0; index < tops.length; index++) {
    if (tops[index]! <= line) active = index
  }
  return active
}

// One passive listener and one scheduled frame for all document-scroll consumers.
const subscribers = new Set<() => void>()
let frame = 0
function schedule() {
  if (!frame) frame = requestAnimationFrame(() => { frame = 0; subscribers.forEach((update) => update()) })
}
export function subscribeToScroll(update: () => void) {
  if (subscribers.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('pageshow', schedule)
    window.addEventListener('hashchange', schedule)
  }
  subscribers.add(update)
  update()
  return () => {
    subscribers.delete(update)
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('pageshow', schedule)
      window.removeEventListener('hashchange', schedule)
      cancelAnimationFrame(frame)
      frame = 0
    }
  }
}

// The first project shares its entry stop with the Selected work introduction.
export function storyDestinationId(id: string, firstProjectId?: string) {
  return id === firstProjectId ? 'work' : id
}
