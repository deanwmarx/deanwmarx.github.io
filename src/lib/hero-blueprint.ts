type HeroSpace = { width: number; height: number; copyTop: number; copyBottom: number; desktop: boolean; columnLeft: number }

export function heroBlueprintDetails({ width, height, copyTop, copyBottom, desktop, columnLeft }: HeroSpace) {
  if (desktop) return [
    { id: 'isometric-tile', x: columnLeft + 44, y: 52, size: 64, angle: -18 },
    { id: 'arc', x: width - 52, y: height - 58, size: 64, angle: 22 },
  ]
  const details = []
  const size = 52
  if (copyTop >= 100) {
    details.push({ id: 'plane', x: 42, y: copyTop * .4, size, angle: -22 })
    details.push({ id: 'arc', x: width - 42, y: copyTop * .6, size, angle: 14 })
  }
  if (copyTop >= 170) details.push({ id: 'offset-tiles', x: width * .52, y: copyTop * .23, size: 40, angle: 18 })
  if (height - copyBottom >= 90) {
    const y = copyBottom + (height - copyBottom) * .55
    details.push({ id: 'corner-frame', x: width * .72, y, size, angle: 20 })
    details.push({ id: 'hatch', x: 42, y: y - 8, size: 44, angle: -16 })
  }
  return details
}
