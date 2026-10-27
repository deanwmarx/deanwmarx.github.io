// Stable decorative variation without layout changes on rerender.
export function createSeededRandom(initial: number) {
  let seed = initial >>> 0
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}
