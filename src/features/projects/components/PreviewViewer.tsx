import { useCallback, useEffect, useRef, useState, type RefObject, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { clampPreviewPan, clampPreviewZoom, MIN_PREVIEW_ZOOM, MAX_PREVIEW_ZOOM } from '../preview-geometry'

type Props = PropsWithChildren<{ src: string; alt: string; width: number; height: number; className?: string }>

export function PreviewViewer({ children, src, alt, width, height, className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  return <>
    <button ref={trigger} type="button" className={`preview-trigger select-none ${className}`} aria-label={`Enlarge preview: ${alt}`} onClick={() => setOpen(true)}>
      {children}
      <span aria-hidden="true" className="preview-trigger-overlay">
        <span className="preview-trigger-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" /></svg></span>
      </span>
    </button>
    {open && <ImageDialog src={src} alt={alt} width={width} height={height} returnFocus={trigger} onClose={() => setOpen(false)} />}
  </>
}

function ImageDialog({ src, alt, width, height, returnFocus, onClose }: Omit<Props, 'children' | 'className'> & { returnFocus: RefObject<HTMLButtonElement | null>; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const transform = useRef({ scale: 1, x: 0, y: 0 })
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const paint = useCallback(() => {
    const t = transform.current
    const bounds = stage.current?.getBoundingClientRect()
    if (bounds) {
      Object.assign(t, clampPreviewPan(t, bounds, { width, height }))
    }
    if (image.current) image.current.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.scale})`
  }, [width, height])
  const changeZoom = (value: number, updateLabel = true) => {
    transform.current.scale = clampPreviewZoom(value)
    if (updateLabel) setZoom(transform.current.scale)
    paint()
  }
  useEffect(() => {
    const previous = returnFocus.current
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    const resize = () => paint()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      document.body.style.overflow = overflow
      previous?.focus({ preventScroll: true })
    }
  }, [paint, returnFocus])
  return createPortal(<dialog ref={dialog} aria-label="Fullscreen screenshot preview" onCancel={onClose} onClose={onClose}
    className="preview-dialog select-none fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-background p-0 text-foreground backdrop:bg-black/80"
    onKeyDown={event => {
      if (event.key === '+' || event.key === '=') changeZoom(transform.current.scale + .25)
      else if (event.key === '-') changeZoom(transform.current.scale - .25)
      else if (event.key === '0') changeZoom(1)
      else if (event.key.startsWith('Arrow')) {
        event.preventDefault()
        transform.current.x += event.key === 'ArrowLeft' ? 60 : event.key === 'ArrowRight' ? -60 : 0
        transform.current.y += event.key === 'ArrowUp' ? 60 : event.key === 'ArrowDown' ? -60 : 0
        paint()
      }
    }}>
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border p-3">
        <p className="text-xs text-muted-foreground">Scroll or pinch to zoom · Drag to pan</p>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Zoom out" disabled={zoom <= MIN_PREVIEW_ZOOM} onClick={() => changeZoom(transform.current.scale - .5)} className="size-11 rounded border border-border disabled:opacity-40">−</button>
          <button type="button" aria-label="Reset zoom to fit" onClick={() => changeZoom(1)} className="h-11 rounded border border-border px-3 text-xs">{Math.round(zoom * 100)}% · Fit</button>
          <button type="button" aria-label="Zoom in" disabled={zoom >= MAX_PREVIEW_ZOOM} onClick={() => changeZoom(transform.current.scale + .5)} className="size-11 rounded border border-border disabled:opacity-40">+</button>
          <button type="button" autoFocus onClick={onClose} className="h-11 rounded border border-border px-3 text-xs">Close</button>
        </div>
      </div>
      <div ref={stage} className="relative flex min-h-0 flex-1 touch-none items-center justify-center overflow-hidden overscroll-contain cursor-grab active:cursor-grabbing"
        onWheel={event => { event.stopPropagation(); changeZoom(transform.current.scale * Math.exp(-event.deltaY * .002)) }}
        onDoubleClick={() => changeZoom(transform.current.scale > 1 ? 1 : 2)}
        onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY }) }}
        onPointerUp={event => { pointers.current.delete(event.pointerId); setZoom(transform.current.scale) }}
        onPointerCancel={event => { pointers.current.delete(event.pointerId); setZoom(transform.current.scale) }}
        onLostPointerCapture={event => pointers.current.delete(event.pointerId)}
        onPointerMove={event => {
          const old = pointers.current.get(event.pointerId)
          if (!old) return
          const other = [...pointers.current.entries()].find(([id]) => id !== event.pointerId)?.[1]
          if (other) {
            const before = Math.hypot(old.x - other.x, old.y - other.y)
            const after = Math.hypot(event.clientX - other.x, event.clientY - other.y)
            if (before > 0) changeZoom(transform.current.scale * after / before, false)
          } else {
            transform.current.x += event.clientX - old.x
            transform.current.y += event.clientY - old.y
            paint()
          }
          pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
        }}>
        <img ref={image} src={src} alt={alt} width={width} height={height} draggable={false} className="pointer-events-none block max-h-full max-w-full select-none object-contain" />
      </div>
    </div>
  </dialog>, document.body)
}
