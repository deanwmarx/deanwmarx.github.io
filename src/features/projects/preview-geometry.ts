export const MIN_PREVIEW_ZOOM = 1
export const MAX_PREVIEW_ZOOM = 5

export function clampPreviewZoom(value: number) {
  return Math.max(MIN_PREVIEW_ZOOM, Math.min(MAX_PREVIEW_ZOOM, value))
}

export function clampPreviewPan(
  position: { x: number; y: number; scale: number },
  viewport: { width: number; height: number },
  image: { width: number; height: number },
) {
  // The image fits down to the stage, but never stretches beyond its intrinsic size.
  const fit = Math.min(1, viewport.width / image.width, viewport.height / image.height)
  const limitX = Math.max(0, (image.width * fit * position.scale - viewport.width) / 2)
  const limitY = Math.max(0, (image.height * fit * position.scale - viewport.height) / 2)
  return {
    x: Math.max(-limitX, Math.min(limitX, position.x)),
    y: Math.max(-limitY, Math.min(limitY, position.y)),
  }
}
