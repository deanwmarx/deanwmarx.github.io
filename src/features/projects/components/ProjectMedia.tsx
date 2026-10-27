import { PreviewViewer } from './PreviewViewer'
import { BrowserChrome } from './BrowserChrome'
import type { Project } from '../schema'

type ProjectMediaProps = {
  media?: Project['media'][number]
  label: string
  address?: string
  browserTitle?: string
}

export function ProjectMedia({ media, label, address, browserTitle }: ProjectMediaProps) {
  return (
    <figure aria-label={label} className="min-w-0 space-y-3">
      <div className={`flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#b8bcc3] bg-[#f1f2f4] ${media ? '' : 'aspect-[4/3]'}`}>
        <BrowserChrome address={address} title={browserTitle} />
        {media ? (
          <PreviewViewer {...media}><img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" className="block h-auto w-full bg-muted" /></PreviewViewer>
        ) : (
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 px-5 py-4 text-center">
          <svg aria-hidden="true" className="size-9 text-primary/60" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="24" height="24" rx="3" />
            <circle cx="21" cy="11" r="2" />
            <path d="m4 23 8-9 7 8 4-4 5 6" />
          </svg>
          <p className="text-xs text-muted-foreground">Project imagery to be selected</p>
        </div>
        )}
      </div>
      {media?.caption && <figcaption className="text-sm leading-relaxed text-muted-foreground">{media.caption}</figcaption>}
    </figure>
  )
}
