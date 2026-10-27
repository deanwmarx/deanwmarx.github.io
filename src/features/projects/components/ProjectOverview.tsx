import { ProjectStatus } from './ProjectStatus'
import { ProjectTitle } from './ProjectReveal'
import type { Project } from '../schema'

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      {project.contextLabel && <p className="eyebrow text-xs font-medium text-muted-foreground">{project.contextLabel}</p>}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2"><ProjectTitle id={`${project.id}-title`}>
        {project.title}
      </ProjectTitle>
      {project.status && <ProjectStatus status={project.status} />}
      </div>
      <p className="text-lg font-semibold leading-snug tracking-tight text-primary">{project.headline}</p>
      <p className="text-sm leading-7 text-secondary-foreground sm:text-base">{project.summary}</p>
      {project.role && <p className="text-sm text-muted-foreground"><span className="font-medium">My role:</span> {project.role}</p>}
    </div>
  )
}
