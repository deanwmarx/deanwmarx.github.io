import assert from 'node:assert/strict'
import { test } from 'node:test'
import { nextSectionEntry } from '../src/lib/section-entry.ts'

test('section entrances require meaningful visibility and only replay after a full exit', () => {
  let state = { armed: true, count: 0 }
  state = nextSectionEntry(state, true, .02)
  assert.equal(state.count, 0)
  state = nextSectionEntry(state, true, .2)
  assert.equal(state.count, 1)
  state = nextSectionEntry(state, true, .01)
  state = nextSectionEntry(state, true, .8)
  assert.equal(state.count, 1)
  assert.equal(state.armed, false, 'partial scrolling must not prepare visible content again')
  state = nextSectionEntry(state, false, 0)
  assert.equal(state.armed, true, 'preparation is allowed only after the full exit')
  assert.equal(state.count, 1)
  state = nextSectionEntry(state, true, .3)
  assert.equal(state.count, 2)
  assert.equal(nextSectionEntry(state, true, .5).count, 2)
})
