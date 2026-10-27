import assert from 'node:assert/strict'
import { test } from 'node:test'
import { activeBoundary, sectionProgress, storyDestinationId } from '../src/lib/scroll.ts'

test('section progress follows geometry, not equal project-count fractions', () => {
  assert.deepEqual(sectionProgress(112, 2000, 900, 112), { scrollable: true, progress: 0 })
  assert.equal(sectionProgress(-494, 2000, 900, 112).progress, .5)
  assert.equal(sectionProgress(-1100, 2000, 900, 112).progress, 1)
  assert.equal(sectionProgress(-4000, 2000, 900, 112).progress, 1)
  assert.equal(sectionProgress(900, 2000, 900, 112).progress, 0)
})
test('sections that fit do not produce invalid progress', () => {
  assert.deepEqual(sectionProgress(0, 500, 900, 0), { scrollable: false, progress: 0 })
  assert.deepEqual(sectionProgress(0, 900, 900, 0), { scrollable: false, progress: 0 })
})
test('active projects work in reverse and retain position through gaps', () => {
  assert.equal(activeBoundary([-900, -50, 700], 200), 1)
  assert.equal(activeBoundary([-900, 250, 1000], 200), 0)
  assert.equal(activeBoundary([-1500, -700, 100], 200), 2)
  assert.equal(activeBoundary([300, 900, 1500], 200), 0)
})

test('first-project navigation lands at Selected work without changing later project stops', () => {
  assert.equal(storyDestinationId('project-unaffi', 'project-unaffi'), 'work')
  assert.equal(storyDestinationId('project-fimo', 'project-unaffi'), 'project-fimo')
  assert.equal(storyDestinationId('work', 'project-unaffi'), 'work')
  assert.equal(storyDestinationId('skills', 'project-unaffi'), 'skills')
  assert.equal(storyDestinationId('project-new-first', 'project-new-first'), 'work')
  assert.equal(storyDestinationId('top'), 'top')
})

 test('project entrances share the remaining chapter scroll time', async () => {
  const { beginScrollTransition, remainingScrollTransition, finishScrollTransition, onScrollTransitionEnd } = await import('../src/lib/scroll-transition.ts')
  assert.equal(remainingScrollTransition(0), undefined)
  beginScrollTransition(1.15, 100)
  assert.equal(remainingScrollTransition(750), .5)
  assert.equal(remainingScrollTransition(1300), 0)
  let completed = 0
  const unsubscribe = onScrollTransitionEnd(() => completed++)
  finishScrollTransition()
  finishScrollTransition()
  assert.equal(completed, 1)
  assert.equal(remainingScrollTransition(1400), undefined)
  unsubscribe()
})

test('blueprint routes vary crossings while retaining section endpoints', async () => {
  const { blueprintRoutes } = await import('../src/lib/blueprint-story.ts')
  assert.deepEqual(blueprintRoutes([]), [])
  const routes = blueprintRoutes([{ x: 12, y: 100, kind: 'start' }, { x: 378, y: 500, turnY: 480, kind: 'work' }, { x: 12, y: 900, turnY: 880, kind: 'skills' }])
  assert.ok(routes[0].d.startsWith('M12 100'))
  assert.ok(routes[0].d.endsWith('L378 500'))
  assert.ok(routes[1].d.endsWith('L12 900'))
  assert.ok(routes[0].d.includes(' 474'))
  assert.ok(routes[1].d.includes(' 886'))
})

test('blueprint details fill long gutters and retain measured side changes', async () => {
  const { blueprintDetails, blueprintRevealRange } = await import('../src/lib/blueprint-story.ts')
  const stops = [{ x: 12, y: 100, kind: 'start' }, { x: 374, y: 1020, turnY: 1000, kind: 'work' }]
  const details = blueprintDetails(stops)
  assert.equal(details.length, 4)
  assert.deepEqual(details.slice(1, -1).map(s => s.kind), ['ticks', 'registration'])
  assert.ok(details.slice(1, -1).every(s => s.x === 12 && s.y > 100 && s.y < 1000))
  assert.equal(blueprintRevealRange(4800, 4968, 844, 4156)[1], 4156)
  for (const viewport of [600, 844, 1080]) {
    const [start, end] = blueprintRevealRange(1000, 1250, viewport)
    // Both drawing boundaries are on screen at their corresponding scroll positions.
    assert.ok(1000 - start > 0 && 1000 - start < viewport)
    assert.ok(1250 - end > 0 && 1250 - end < viewport)
    assert.ok(end > start)
  }
})

test('continuous blueprint has one move and a monotonic viewport-linked drawing head', async () => {
  const { blueprintContinuousRoute } = await import('../src/lib/blueprint-story.ts')
  const stops = [{ x: 12, y: 100, kind: 'start' }, { x: 378, y: 500, turnY: 480, kind: 'work' }, { x: 12, y: 900, kind: 'skills' }, { x: 378, y: 1400, kind: 'end' }]
  const route = blueprintContinuousRoute(stops, 600, 900)
  assert.equal(route.d.match(/M/g).length, 1)
  assert.equal(route.output[0], 0)
  assert.equal(route.output.at(-1), 1)
  assert.ok(route.input.every((n, i) => !i || n > route.input[i - 1]))
  assert.ok(route.output.every((n, i) => !i || n >= route.output[i - 1]))
  assert.equal(route.input[1], 140)
})

test('long project runs have varied motifs and spacing instead of a repeating three-item cycle', async () => {
  const { blueprintDetails } = await import('../src/lib/blueprint-story.ts')
  const details = blueprintDetails([{ x: 12, y: 0, kind: 'start' }, { x: 374, y: 4500, turnY: 4480, kind: 'work' }]).slice(1, -1)
  assert.equal(new Set(details.slice(0, 10).map(s => s.kind)).size, 10)
  const gaps = details.slice(1).map((s, i) => s.y - details[i].y)
  assert.ok(new Set(gaps).size >= 5)
  assert.ok(gaps.every(gap => gap >= 230))
})

test('blueprint guide retains shallow bevels without symbol-shaped excursions', async () => {
  const { blueprintContinuousRoute } = await import('../src/lib/blueprint-story.ts')
  const route = blueprintContinuousRoute([{ x: 20, y: 100, kind: 'start' }, { x: 20, y: 400, kind: 'isometric' }, { x: 20, y: 700, kind: 'end' }], 600, 400)
  assert.equal(route.d.match(/M/g).length, 1)
  const xs = [...route.d.matchAll(/[ML]([\d.-]+)/g)].map(match => Number(match[1]))
  assert.ok(xs.some(x => x !== 20))
  assert.ok(xs.every(x => Math.abs(x - 20) <= 6))
})

test('gutter bends vary without changing between identical renders', async () => {
  const { blueprintRoutes } = await import('../src/lib/blueprint-story.ts')
  const stops = Array.from({ length: 14 }, (_, i) => ({ x: 20, y: i * 310, kind: 'ticks' }))
  const routes = blueprintRoutes(stops)
  assert.deepEqual(routes, blueprintRoutes(stops))
  const signatures = routes.map(route => [...route.d.matchAll(/[ML]([\d.-]+) ([\d.-]+)/g)].map(match => [Number(match[1]), Math.round(Number(match[2]) - route.start)]))
  assert.ok(new Set(signatures.map(s => JSON.stringify(s))).size > 8)
  assert.ok(signatures.flat().every(([x]) => Math.abs(x - 20) <= 6))
})

test('desktop decorations are dense, rotated and bounded to the outskirts; mobile has none', async () => {
  const { desktopBlueprintDetails } = await import('../src/lib/blueprint-decoration.ts')
  assert.deepEqual(desktopBlueprintDetails(390, 100, 6000), [])
  for (const width of [1024, 1440, 1920]) {
    const details = desktopBlueprintDetails(width, 100, 5000)
    assert.ok(details.length >= 18 && details.length < 50)
    assert.deepEqual(details, desktopBlueprintDetails(width, 100, 5000))
    const edge = Math.max(0, (width - 1280) / 2) + 48
    assert.ok(details.every(d => Math.abs(d.angle) <= 38))
    assert.ok(new Set(details.map(d => d.angle)).size > 10)
    assert.ok(details.every(d => d.x + d.radius * d.scale < edge || d.x - d.radius * d.scale > width - edge))
  }
})

test('expanded symbol library keeps distinct shapes and keeps repeats far apart', async () => {
  const { blueprintSymbols } = await import('../src/lib/blueprint-symbols.ts')
  const { desktopBlueprintDetails } = await import('../src/lib/blueprint-decoration.ts')
  assert.equal(blueprintSymbols.length, 32)
  assert.equal(new Set(blueprintSymbols.map(s => s.id)).size, 32)
  assert.equal(new Set(blueprintSymbols.map(s => s.d)).size, 32)
  const details = desktopBlueprintDetails(1440, 100, 12000)
  const seen = new Map()
  details.forEach((detail, index) => {
    const previous = seen.get(detail.asset)
    if (previous) {
      assert.ok(detail.y - previous.y >= 1400)
      assert.ok(index - previous.index > 8)
    }
    seen.set(detail.asset, { y: detail.y, index })
  })
  assert.equal(seen.size, 32)
})

test('mobile separators are static straight rules with sparse ruler ticks', async () => {
  const { blueprintSeparators } = await import('../src/lib/blueprint-story.ts')
  const stops = [{ x: 12, y: 100, kind: 'start' }, { x: 359, y: 800, turnY: 784, kind: 'work' }, { x: 12, y: 1600, turnY: 1576, kind: 'skills' }]
  const separators = blueprintSeparators(stops, 375)
  assert.equal(separators.length, 2)
  assert.ok(separators[0].d.startsWith('M24 784 H351'))
  assert.ok((separators[0].d.match(/v/g) || []).length >= 6)
  assert.ok((separators[0].d.match(/v/g) || []).length <= 10)
  assert.notEqual(separators[0].d, separators[1].d)
  assert.deepEqual(separators, blueprintSeparators(stops, 375))
})

test('responsive scattering balances laptop density and size variation without collisions', async () => {
  const { desktopBlueprintDetails } = await import('../src/lib/blueprint-decoration.ts')
  const details = desktopBlueprintDetails(1440, 100, 5000)
  assert.ok(details.length >= 18 && details.length < 50)
  const sizes = details.map(d => d.radius * d.scale)
  assert.ok(Math.max(...sizes) / Math.min(...sizes) > 1.8)
  details.forEach((detail, index) => {
    for (const other of details.slice(index + 1)) {
      assert.ok(Math.hypot(detail.x - other.x, detail.y - other.y) >= detail.radius * detail.scale + other.radius * other.scale + 10)
    }
  })
})

test('hero symbols occupy whitespace and disappear when mobile has no safe space', async () => {
  const { heroBlueprintDetails } = await import('../src/lib/hero-blueprint.ts')
  const mobile = heroBlueprintDetails({ width: 342, height: 756, copyTop: 240, copyBottom: 600, desktop: false, columnLeft: 342 })
  assert.equal(mobile.length, 5)
  assert.ok(mobile.every(d => d.id !== 'survey-target'))
  assert.ok(mobile.every(d => d.y + d.size / 2 < 240 || d.y - d.size / 2 > 600))
  assert.ok(mobile.every(d => d.x - d.size / 2 >= 0 && d.x + d.size / 2 <= 342))
  assert.equal(heroBlueprintDetails({ width: 272, height: 620, copyTop: 64, copyBottom: 556, desktop: false, columnLeft: 272 }).length, 0)
  const desktop = heroBlueprintDetails({ width: 1184, height: 812, copyTop: 250, copyBottom: 600, desktop: true, columnLeft: 704 })
  assert.equal(desktop.length, 2)
  assert.ok(desktop.every(d => d.x - d.size / 2 >= 704))
})
