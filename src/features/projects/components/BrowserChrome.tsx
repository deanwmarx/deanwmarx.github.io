type BrowserChromeProps = { address?: string; title?: string; mobile?: boolean }

/** Decorative browser UI, deliberately independent of the portfolio theme. */
export function BrowserChrome({ address = 'Preview', title = address, mobile = false }: BrowserChromeProps) {
  return <div aria-hidden="true" className={`select-none shrink-0 border-b border-[#c8ccd2] bg-[#e8eaed] font-sans text-[#454950] ${mobile ? 'px-1 py-0.5' : 'pt-0.5'}`}>
    {!mobile && <div className="flex h-3.5 items-center gap-1 px-2">
      <div className="mr-2 flex gap-1"><span className="size-1.5 rounded-full bg-[#ed6a5e]" /><span className="size-1.5 rounded-full bg-[#f4bf50]" /><span className="size-1.5 rounded-full bg-[#61c454]" /></div>
      <div className="flex h-full min-w-0 max-w-[60%] items-center gap-1 rounded-t-sm bg-[#f8f9fa] px-2 text-[7px]"><span className="size-1.5 shrink-0 rounded-full bg-[#9aa0a6]" /><span className="truncate">{title}</span><span className="ml-3">×</span></div><span className="text-xs">+</span>
    </div>}
    <div className={`flex min-w-0 items-center gap-1.5 ${mobile ? '' : 'bg-[#f8f9fa] px-2 py-0.5'}`}>
      {!mobile && <svg className="h-3 w-12 shrink-0" viewBox="0 0 48 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 6H2m0 0 3-3M2 6l3 3M18 6h8m0 0-3-3m3 3-3 3M43 4a4 4 0 1 0 0 5M43 1v3h-3" /></svg>}
      <div className={`flex min-w-0 flex-1 items-center gap-1 rounded-full bg-[#e9ebee] ${mobile ? 'h-4 bg-white px-1.5 text-[6px]' : 'h-4 px-2 text-[7px]'}`}>
        <svg className="size-2 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="5" width="6" height="5" rx="1" /><path d="M4 5V3a2 2 0 0 1 4 0v2" /></svg><span className="truncate">{address}</span>
      </div>
      {mobile && <span className="rounded-sm border border-[#777d86] px-0.5 text-[6px]">1</span>}
      <span className="shrink-0 px-0.5 text-xs leading-none">⋮</span>
    </div>
  </div>
}
