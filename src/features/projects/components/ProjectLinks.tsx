import { ExternalLink } from '../../../components/ExternalLink'
import type { Project } from '../schema'

export function ProjectLinks({ links }: { links: Project['links'] }) {
  if (links.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Project links">
      {links.map(({ href, label }, index) => <li key={href}><ExternalLink href={href} appearance={index === 0 ? 'primary' : 'outline'}>{label}</ExternalLink></li>)}
    </ul>
  )
}
