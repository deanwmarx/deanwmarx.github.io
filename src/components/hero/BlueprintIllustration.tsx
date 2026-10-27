import { m, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function BlueprintPanel({ x, y, width, height, emphasis = false }: { x: number; y: number; width: number; height: number; emphasis?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height={height} rx="9" fill="var(--card)" fillOpacity=".96" stroke="currentColor" strokeOpacity=".5" />
      <path d={`M0 32h${width}`} stroke="currentColor" strokeOpacity=".25" />
      {[12, 22, 32].map((cx) => <circle key={cx} cx={cx} cy="16" r="2.5" fill="currentColor" opacity=".4" />)}
      <rect x="14" y="47" width={emphasis ? 54 : 34} height={height - 62} rx="4" fill="currentColor" opacity={emphasis ? .9 : .09} />
      {[0, 1, 2, 3].map((row) => <rect key={row} x="22" y={60 + row * 25} width={emphasis ? 36 : 18} height="4" rx="2" fill={emphasis ? 'var(--primary-foreground)' : 'currentColor'} opacity=".55" />)}
      <rect x={emphasis ? 82 : 64} y="49" width={width - (emphasis ? 100 : 80)} height="16" rx="4" fill="currentColor" opacity=".1" />
      <rect x={emphasis ? 82 : 64} y="80" width={width - (emphasis ? 100 : 80)} height={height * .32} rx="5" fill="currentColor" opacity=".06" />
      {[0, 1, 2].map((column) => <rect key={column} x={(emphasis ? 82 : 64) + column * (width - 100) / 3} y={height - 55} width={(width - 120) / 3} height="27" rx="4" fill="currentColor" opacity=".11" />)}
    </g>
  )
}

export function BlueprintIllustration({ progress, entry }: { progress: MotionValue<number>; entry: number }) {
  const motion = useMediaQuery('(prefers-reduced-motion: no-preference)')
  const interactive = useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const separation = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 22 })
  const spread = useSpring(separation, { stiffness: 120, damping: 22 })
  const backX = useTransform(() => interactive ? progress.get() * 24 + spread.get() * 22 : 0)
  const frontX = useTransform(() => interactive ? progress.get() * -20 - spread.get() * 12 : 0)
  const replay = entry > 1
  const duration = replay ? .42 : .9
  const travel = motion && entry > 0 ? (replay ? 18 : 64) : 0
  const resetPointer = () => { tiltX.set(0); tiltY.set(0); separation.set(0) }
  return (
    <m.div className="blueprint-interaction" style={{ rotateX: interactive ? rotateX : 0, rotateY: interactive ? rotateY : 0, transformPerspective: 900 }} onPointerMove={(event) => {
      if (!interactive || event.pointerType === 'touch') return
      const bounds = event.currentTarget.getBoundingClientRect()
      tiltX.set(-((event.clientY - bounds.top) / bounds.height - .5) * 9)
      tiltY.set(((event.clientX - bounds.left) / bounds.width - .5) * 9)
      separation.set(1)
    }} onPointerLeave={resetPointer}>
    <svg aria-hidden="true" viewBox="0 0 640 460" fill="none" className="h-auto w-full overflow-visible text-primary">
      <defs><pattern id="blueprint-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0v36" stroke="currentColor" strokeWidth=".6" opacity=".14" /></pattern></defs>
      <g transform="translate(0 55) skewY(-9)">
        <rect width="640" height="370" fill="url(#blueprint-grid)" />
        <m.g style={{ x: backX }}><m.g key={`back-${entry}`} initial={false} animate={{ y: [-travel, 0], opacity: motion && entry ? [.15, .65] : .65 }} transition={{ duration: motion ? duration : 0 }}><BlueprintPanel x={235} y={10} width={310} height={225} /></m.g></m.g>
        <m.g style={{ x: frontX }}><m.g key={`front-${entry}`} initial={false} animate={{ y: [travel * .8, 0], opacity: motion && entry ? [.2, 1] : 1 }} transition={{ duration: motion ? duration : 0, delay: motion ? (replay ? .04 : .12) : 0 }}><BlueprintPanel x={85} y={65} width={390} height={270} emphasis /></m.g></m.g>
        <g transform="translate(460 195)"><m.g key={`phone-${entry}`} initial={false} animate={{ y: [travel * 1.2, 0], opacity: motion && entry ? [.1, 1] : 1 }} transition={{ duration: motion ? duration : 0, delay: motion ? (replay ? .08 : .24) : 0 }}><rect width="120" height="215" rx="17" fill="var(--card)" stroke="currentColor" strokeOpacity=".6" /><rect x="10" y="12" width="100" height="190" rx="10" fill="currentColor" opacity=".05" /><rect x="43" y="18" width="35" height="4" rx="2" fill="currentColor" opacity=".3" /><rect x="21" y="49" width="77" height="53" rx="5" fill="currentColor" opacity=".14" />{[0, 1, 2].map((row) => <rect key={row} x="21" y={118 + row * 17} width={row === 2 ? 42 : 77} height="6" rx="3" fill="currentColor" opacity=".18" />)}<rect x="21" y="177" width="77" height="12" rx="4" fill="currentColor" opacity=".85" /></m.g></g>
        <path d="M30 100h35m-15-15v30m515-65h35m-17-17v34" stroke="currentColor" opacity=".35" />
      </g>
    </svg></m.div>
  )
}
