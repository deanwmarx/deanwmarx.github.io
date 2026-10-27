import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { Icon } from './Icon'

type ActionLinkProps = {
  href: string
  children: ReactNode
  direction: 'down' | 'up' | 'external'
  appearance?: 'text' | 'primary' | 'outline'
}

const appearances = {
  text: 'text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary',
  primary: 'rounded-md border border-primary bg-primary px-5 text-primary-foreground hover:border-primary-hover hover:bg-primary-hover',
  outline: 'rounded-md border border-accent-border bg-background px-5 text-primary hover:border-primary hover:bg-accent',
}

export function ActionLink({ href, children, direction, appearance = 'text' }: ActionLinkProps) {
  const newTab = direction === 'external'
  const reduced = useReducedMotion()
  const distance = reduced === false ? 1 : 0
  const x = direction === 'external' ? distance : 0
  const y = (direction === 'down' ? 1 : -1) * distance
  return (
    <m.a href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined} initial="rest" animate="rest" whileHover="hover" whileFocus="hover" whileTap="press" variants={{ rest: { scale: 1 }, hover: { scale: 1 }, press: { scale: distance ? .98 : 1 } }} transition={{ duration: reduced ? 0 : .16 }} className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 text-sm font-medium leading-5 transition-colors duration-200 motion-reduce:transition-none ${appearances[appearance]}`}>
      <span>{children}</span>
      <m.span aria-hidden="true" className="inline-flex shrink-0" variants={{ rest: { x: 0, y: 0 }, hover: { x: x * 3, y: y * 3 }, press: { x: x * 6, y: y * 6 } }} transition={{ duration: reduced ? 0 : .2, ease: [.2, .8, .2, 1] }}>
        <Icon name={direction === 'external' ? 'arrow' : direction === 'down' ? 'arrow-down' : 'arrow-up'} className="size-4" />
      </m.span>
      {newTab && <span className="sr-only">(opens in a new tab)</span>}
    </m.a>
  )
}
