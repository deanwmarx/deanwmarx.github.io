import type { Project } from '../schema'

export function ProjectHighlights({ highlights }: { highlights: Project['highlights'] }) {
  if (highlights.length === 0) return null

  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {highlights.map(({ title, description }) => (
        <div key={title} className="space-y-1">
          <dt className="font-semibold text-foreground">{title}</dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">{description}</dd>
        </div>
      ))}
    </dl>
  )
}
