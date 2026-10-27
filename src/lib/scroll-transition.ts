let endsAt: number | undefined
const listeners = new Set<() => void>()

export function beginScrollTransition(duration: number, now = performance.now()) {
  endsAt = now + duration * 1000
}

export function remainingScrollTransition(now = performance.now()) {
  return endsAt === undefined ? undefined : Math.max(0, (endsAt - now) / 1000)
}

export function finishScrollTransition() {
  if (endsAt === undefined) return
  endsAt = undefined
  listeners.forEach((listener) => listener())
}

export function onScrollTransitionEnd(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
