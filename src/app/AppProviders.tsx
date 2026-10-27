import type { PropsWithChildren } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'

export function AppProviders({ children }: PropsWithChildren) {
  // Entrances can run immediately on a hash/deep-link load. Features must be ready
  // before the children mount, otherwise their first controls.start is lost.
  return <MotionConfig reducedMotion="user"><LazyMotion features={domAnimation} strict>{children}</LazyMotion></MotionConfig>
}
