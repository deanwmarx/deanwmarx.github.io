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
