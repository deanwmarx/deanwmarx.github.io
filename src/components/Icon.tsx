import type { ReactNode } from 'react'

type IconName = 'frontend' | 'design' | 'sparkle' | 'backend' | 'testing' | 'arrow' | 'github' | 'sun' | 'moon' | 'arrow-down' | 'arrow-up'

const paths: Record<IconName, ReactNode> = {
  sun: <><circle cx="16" cy="16" r="6" /><path d="M16 3v3m0 20v3M3 16h3m20 0h3M6.8 6.8l2.1 2.1m14.2 14.2 2.1 2.1M6.8 25.2l2.1-2.1M23.1 8.9l2.1-2.1" /></>,
  moon: <path d="M27 18.4A11.5 11.5 0 0 1 13.6 5a11.5 11.5 0 1 0 13.4 13.4Z" />,
  frontend: <><rect x="3" y="4" width="26" height="24" rx="3" /><path d="M3 11h26M8 7.5h.01M12 7.5h.01m0 8-4 4 4 4m8-8 4 4-4 4m-3-10-3 12" /></>,
  design: <><rect x="3" y="4" width="25" height="22" rx="2" /><path d="M3 10h25M8 7h.01M12 7h.01" /><rect x="7" y="14" width="6" height="7" rx="1" /><path d="M17 15h6m-6 4h3m0 1 1 10 3-4 5 3 1-2-5-4 4-1-9-2Z" fill="var(--background)" /></>,
  sparkle: <path d="M16 2c1.8 9.2 4.8 12.2 14 14-9.2 1.8-12.2 4.8-14 14C14.2 20.8 11.2 17.8 2 16 11.2 14.2 14.2 11.2 16 2Z" />,
  backend: <><rect x="4" y="3" width="24" height="8" rx="2" /><rect x="4" y="12" width="24" height="8" rx="2" /><rect x="4" y="21" width="24" height="8" rx="2" /><path d="M9 7h.01M13 7h.01M9 16h.01M13 16h.01M9 25h.01M13 25h.01m9-18h2m-2 9h2m-2 9h2" /></>,
  testing: <><path d="M11 6H7a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4" /><rect x="11" y="2" width="10" height="7" rx="2" /><path d="m10 19 4 4 8-9" /></>,
  'arrow-down': <path d="M16 5v22M7 18l9 9 9-9" />,
  'arrow-up': <path d="M16 27V5M7 14l9-9 9 9" />,
  arrow: <path d="M8 24 24 8M8 8h16v16" />,
  github: <><path d="M16 3a13 13 0 0 0-4 25v-5c-3 1-4-1-5-3m13 8v-6c0-2-1-3-1-3 4-.5 6-2 6-6 0-2-.5-3-2-4 .5-1 .5-3 0-4-2 0-4 2-4 2a13 13 0 0 0-7 0s-2-2-4-2c-.5 1-.5 3 0 4-1.5 1-2 2-2 4 0 4 2 5.5 6 6 0 0-1 1-1 3v6" /></>,
}

export function IconFrame({ children, className = 'size-5' }: { children: ReactNode; className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <IconFrame className={className}>{paths[name]}</IconFrame>
}

export type { IconName }
