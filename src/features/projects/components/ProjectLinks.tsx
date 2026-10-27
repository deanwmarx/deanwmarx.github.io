import { ExternalLink } from '../../../components/ExternalLink'
import type { Project } from '../schema'

export function ProjectLinks({ links }: { links: Project['links'] }) {
  if (links.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Project links">
      {links.map(({ href, label, note }, index) => <li key={href} className="max-w-full space-y-2"><ExternalLink href={href} appearance={index === 0 ? 'primary' : 'outline'}>{label}</ExternalLink>{note && <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">{note}</p>}</li>)}
    </ul>
  )
}
