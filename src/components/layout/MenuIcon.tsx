import { m, useReducedMotion } from 'motion/react'
import { IconFrame } from '../Icon'

const strokes = [
  { closed: 'M5 9L27 9', open: 'M8 8L24 24' },
  { closed: 'M5 16L27 16', open: 'M16 16L16 16' },
  { closed: 'M5 23L27 23', open: 'M8 24L24 8' },
]

export function MenuIcon({ open }: { open: boolean }) {
  const reduced = useReducedMotion()
  return (
    <IconFrame className="size-6">
      {strokes.map((stroke, index) => <m.path key={stroke.closed} initial={false} animate={{ d: open ? stroke.open : stroke.closed, opacity: open && index === 1 ? 0 : 1 }} transition={{ duration: reduced ? 0 : .28, ease: [.4, 0, .2, 1] }} />)}
    </IconFrame>
  )
}
