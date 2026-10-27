import type { PropsWithChildren } from 'react'

export function PhoneFrame({ children, id, busy = false, compact = false }: PropsWithChildren<{ id?: string; busy?: boolean; compact?: boolean }>) {
  return <div id={id} aria-busy={busy} className={`mx-auto w-full border border-border bg-muted shadow-lg ${compact ? 'rounded-[1rem] p-1' : 'max-w-[16rem] rounded-[1.75rem] p-1.5 md:max-w-[14rem] xl:max-w-[16rem]'}`}>
    <div className={`overflow-hidden bg-device-screen ${compact ? 'rounded-[.75rem]' : 'rounded-[1.3rem]'}`}>
      <div aria-hidden="true" className={`flex items-center justify-between font-medium leading-none text-device-screen-foreground ${compact ? 'h-5 px-1.5 text-[.45rem]' : 'h-7 px-3 text-[.6rem]'}`}>
        <span>9:41</span>
        <svg width="52" height="12" viewBox="0 0 52 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 10V8M4 10V6M7 10V3M10 10V1" />
          <path d="M17 4a8 8 0 0 1 10 0M19 6a5 5 0 0 1 6 0M21 8a2 2 0 0 1 2 0" /><circle cx="22" cy="10" r=".6" fill="currentColor" stroke="none" />
          <rect x="34" y="2" width="14" height="8" rx="1.5" /><path d="M50 4v4" /><rect x="36" y="4" width="9" height="4" rx=".5" fill="currentColor" stroke="none" />
        </svg>
      </div>
      {children}
      <div aria-hidden="true" className={`flex items-center justify-evenly text-device-screen-foreground ${compact ? 'h-5' : 'h-8'}`}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"><path d="M11 2L3 8L11 14Z" /></svg>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="8" cy="8" r="5.5" /></svg>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="10" height="10" rx="1" /></svg>
      </div>
    </div>
  </div>
}
