import assert from 'node:assert/strict'
import { test } from 'node:test'
import { clampPreviewPan, clampPreviewZoom } from '../src/features/projects/preview-geometry.ts'

test('zoom stays within the supported fit and magnification limits', () => {
  assert.equal(clampPreviewZoom(.2), 1)
  assert.equal(clampPreviewZoom(2.5), 2.5)
  assert.equal(clampPreviewZoom(20), 5)
})

test('fit resets pan and zoomed landscape images stop at screenshot edges', () => {
  const viewport = { width: 800, height: 600 }
  const image = { width: 1600, height: 800 }
  assert.deepEqual(clampPreviewPan({ scale: 1, x: 100, y: -100 }, viewport, image), { x: 0, y: -0 })
  assert.deepEqual(clampPreviewPan({ scale: 2, x: 900, y: -900 }, viewport, image), { x: 400, y: -100 })
})

test('large viewports do not assume intrinsic screenshots were stretched', () => {
  assert.deepEqual(clampPreviewPan({ scale: 2, x: 900, y: 900 }, { width: 2000, height: 1200 }, { width: 800, height: 600 }), { x: 0, y: 0 })
})

test('portrait screenshots retain vertical panning without horizontal overshoot', () => {
  assert.deepEqual(clampPreviewPan({ scale: 2, x: 100, y: -900 }, { width: 1000, height: 800 }, { width: 640, height: 1280 }), { x: 0, y: -400 })
})
