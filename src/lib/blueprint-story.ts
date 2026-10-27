import { createSeededRandom } from './random.ts'

export type BlueprintStop = { x: number; y: number; turnY?: number; kind: 'start' | 'work' | 'skills' | 'end' | 'ticks' | 'registration' | 'diamond' | 'arc' | 'tiles' | 'angle' | 'hatch' | 'isometric' | 'steps' | 'corners' }

const detailKinds = ['ticks', 'registration', 'diamond', 'arc', 'tiles', 'angle', 'hatch', 'isometric', 'steps', 'corners'] as const

export function isBlueprintDetail(kind: BlueprintStop['kind']): kind is typeof detailKinds[number] {
  return (detailKinds as readonly string[]).includes(kind)
}

function blueprintSegments(previous: BlueprintStop, stop: BlueprintStop) {
  const turn = stop.turnY ?? stop.y
  const points: { x: number; y: number }[] = []
  // Stable irregular geometry: avoid repeating one notch on every run.
  const random = createSeededRandom(Math.round(previous.y * 17) ^ Math.round(turn * 31) ^ previous.kind.charCodeAt(0) * 997)
  const gap = turn - previous.y
  if (gap > 180 && random() > .2) {
    const depth = 3 + Math.floor(random() * 4)
    const direction = random() > .5 ? 1 : -1
    const span = 24 + random() * Math.min(110, gap * .32)
    const start = previous.y + 24 + random() * Math.max(1, gap - span - 60)
    const shape = random()
    const offsets = shape < .4 ? [depth * direction]
      : shape < .75 ? [depth * direction, Math.max(2, depth - 2) * direction]
      : [-Math.max(2, depth - 2) * direction, depth * direction]
    let currentOffset = 0
    offsets.forEach((offset, index) => {
      const y = start + span * index / offsets.length
      points.push({ x: previous.x + currentOffset, y },
        { x: previous.x + offset, y: y + Math.abs(offset - currentOffset) })
      currentOffset = offset
    })
    points.push({ x: previous.x + currentOffset, y: start + span },
      { x: previous.x, y: start + span + Math.abs(currentOffset) })
  }
  points.push({ x: previous.x, y: turn })
  if (previous.x !== stop.x) {
    const across = (fraction: number) => previous.x + (stop.x - previous.x) * fraction
    if (stop.kind === 'work') {
      points.push({ x: across(.28), y: turn }, { x: across(.28) + 8, y: turn - 6 },
        { x: across(.58), y: turn - 6 }, { x: across(.58) + 8, y: turn })
    } else if (stop.kind === 'skills') {
      points.push({ x: across(.38), y: turn }, { x: across(.5), y: turn + 6 }, { x: across(.62), y: turn })
    } else {
      points.push({ x: across(.2), y: turn }, { x: across(.2), y: turn - 6 },
        { x: across(.45), y: turn - 6 }, { x: across(.45), y: turn },
        { x: across(.7), y: turn }, { x: across(.7), y: turn + 6 },
        { x: across(.85), y: turn + 6 }, { x: across(.85), y: turn })
    }
  }
  points.push({ x: stop.x, y: turn })
  points.push({ x: stop.x, y: stop.y })
  return points
}

export function blueprintRoutes(stops: readonly BlueprintStop[]) {
  return stops.slice(1).map((stop, index) => {
    const previous = stops[index]!
    const points = blueprintSegments(previous, stop)
    let last = { x: previous.x, y: previous.y }
    const length = points.reduce((total, point) => {
      const next = total + Math.hypot(point.x - last.x, point.y - last.y)
      last = point
      return next
    }, 0)
    return { start: previous.y, end: stop.y, length, d: `M${previous.x} ${previous.y}` + points.map(({ x, y }) => ` L${x} ${y}`).join('') }
  })
}

export function blueprintSeparators(stops: readonly BlueprintStop[], width: number) {
  const left = 24
  const right = width - 24
  const span = Math.max(1, right - left)
  return stops.filter(stop => stop.turnY !== undefined).map(stop => {
    const y = stop.turnY!
    const random = createSeededRandom(stop.kind.charCodeAt(0) * 7919)
    let d = `M${left} ${y} H${right}`
    for (const region of [.1, .62]) {
      const start = left + span * (region + random() * .12)
      const count = 3 + Math.floor(random() * 3)
      for (let index = 0; index < count; index++) {
        const x = start + index * 6
        const length = index === 0 || index === count - 1 ? 7 : 3 + Math.floor(random() * 3)
        d += ` M${x} ${y} v${length}`
      }
    }
    return { kind: stop.kind, d }
  })
}

// One path and one drawing head: section positions map to cumulative path distance.
export function blueprintContinuousRoute(stops: readonly BlueprintStop[], viewport: number, maxScroll: number) {
  const routes = blueprintRoutes(stops)
  const total = routes.reduce((length, route) => length + route.length, 0)
  const input: number[] = []
  const output: number[] = []
  let distance = 0
  stops.forEach((stop, index) => {
    if (index) distance += routes[index - 1]!.length
    const at = Math.min(stop.y - viewport * .6, maxScroll)
    const fraction = distance / Math.max(1, total)
    if (input.length && at <= input.at(-1)!) output[output.length - 1] = fraction
    else { input.push(at); output.push(fraction) }
  })
  return { d: routes.map((route, index) => index ? route.d.slice(route.d.indexOf(' L')) : route.d).join(''), input, output }
}

// Drawing happens through the middle of the viewport rather than at a global page percentage.
export function blueprintRevealRange(start: number, end: number, viewport: number, maxScroll = Infinity) {
  const from = Math.min(start - viewport * .8, maxScroll - 1)
  return [from, Math.max(from + 1, Math.min(end - viewport * .35, maxScroll))]
}

export function blueprintDetails(stops: readonly BlueprintStop[]) {
  const kinds = ['ticks', 'registration', 'arc', 'tiles', 'angle', 'diamond', 'hatch', 'isometric', 'steps', 'corners'] as const
  const gaps = [250, 340, 290, 380, 270, 320, 410, 280]
  let detailIndex = 0
  return stops.flatMap((stop, index) => {
    const next = stops[index + 1]
    if (!next) return [stop]
    const details: BlueprintStop[] = [stop]
    const limit = (next.turnY ?? next.y) - 80
    let y = stop.y + gaps[detailIndex % gaps.length]!
    while (y < limit) {
      details.push({ x: stop.x, y, kind: kinds[detailIndex % kinds.length]! })
      detailIndex += 1
      y += gaps[detailIndex % gaps.length]!
    }
    return details
  })
}
