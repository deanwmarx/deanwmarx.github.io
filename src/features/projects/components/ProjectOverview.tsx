import type { Project } from '../schema'

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      {project.status && <p className="text-xs font-medium text-muted-foreground">{project.status}</p>}
      <h3 id={`${project.id}-title`} className="text-2xl font-bold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl">
        {project.title}
      </h3>
      <p className="text-lg font-semibold leading-snug tracking-tight text-primary">{project.headline}</p>
      <p className="text-sm leading-7 text-secondary-foreground sm:text-base">{project.summary}</p>
      {project.role && <p className="text-sm text-muted-foreground"><span className="font-medium">My role:</span> {project.role}</p>}
    </div>
  )
}
