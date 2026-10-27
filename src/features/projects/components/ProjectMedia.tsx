import type { Project } from '../schema'

type ProjectMediaProps = {
  media?: Project['media'][number]
  label: string
}

export function ProjectMedia({ media, label }: ProjectMediaProps) {
  return (
    <figure aria-label={label} className="min-w-0 space-y-3">
      {media ? (
        <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" className="h-auto w-full rounded-lg bg-muted" />
      ) : (
        <div className="relative flex aspect-[4/3] min-w-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-accent-border bg-accent px-5 text-center">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-8 items-center gap-1.5 border-b border-accent-border bg-background/60 px-3">{[0, 1, 2].map((dot) => <span key={dot} className="size-1.5 rounded-full bg-accent-border" />)}</div>
          <svg aria-hidden="true" className="size-9 text-primary/60" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="24" height="24" rx="3" />
            <circle cx="21" cy="11" r="2" />
            <path d="m4 23 8-9 7 8 4-4 5 6" />
          </svg>
          <p className="text-xs text-muted-foreground">Project imagery to be selected</p>
        </div>
      )}
      {media?.caption && <figcaption className="text-sm leading-relaxed text-muted-foreground">{media.caption}</figcaption>}
    </figure>
  )
}
