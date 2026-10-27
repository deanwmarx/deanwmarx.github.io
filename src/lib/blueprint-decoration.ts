import { blueprintSymbols } from './blueprint-symbols.ts'
import { createSeededRandom } from './random.ts'

export function desktopBlueprintDetails(width: number, start: number, end: number) {
  if (width < 1024) return []
  const random = createSeededRandom(72419)
  const edge = Math.max(0, (width - 1280) / 2) + 48
  const room = Math.min(1, Math.max(0, (edge - 48) / 220))
  const lastUsed = new Map<number, number>()
  const usage = blueprintSymbols.map(() => 0)
  const details: { x: number; y: number; asset: number; scale: number; angle: number; radius: number }[] = []
  for (let y = start + 55; y < end - 80; y += (165 - room * 25) + random() * 110) {
    const sides = random() < .28 + room * .22 ? [true, false] : [random() > .5]
    for (const left of sides) {
      const recent = new Set(details.slice(-8).map(detail => detail.asset))
      const candidates = blueprintSymbols.map((_, index) => index).filter(index => !recent.has(index) && y - (lastUsed.get(index) ?? -Infinity) >= 1400)
      if (!candidates.length) continue
      const minimum = Math.min(...candidates.map(index => usage[index]!))
      const leastUsed = candidates.filter(index => usage[index] === minimum)
      const asset = leastUsed[Math.floor(random() * leastUsed.length)]!
      const radius = blueprintSymbols[asset]!.radius
      const sizeVariation = random() < .18 ? 1 : .45 + random() ** 1.5 * .45
      const scale = Math.min(radius > 40 ? 1.3 : 1.5, (edge - 20) / (radius * 2)) * sizeVariation
      const slack = Math.max(0, edge / 2 - 8 - radius * scale)
      const centre = edge / 2 + (random() * 2 - 1) * slack
      const x = left ? centre : width - centre
      const placedY = y + random() * 30
      // Prevent denser arrangements from colliding, especially in wide margins.
      if (details.some(detail => Math.hypot(detail.x - x, detail.y - placedY) < detail.radius * detail.scale + radius * scale + 10 + Math.max(detail.radius * detail.scale, radius * scale) * .7)) continue
      lastUsed.set(asset, placedY)
      usage[asset]! += 1
      details.push({ x, y: placedY,
        asset, scale, angle: Math.round(random() * 76 - 38), radius })
    }
  }
  return details
}
