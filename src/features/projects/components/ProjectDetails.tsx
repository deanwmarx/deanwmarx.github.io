import type { Project } from '../schema'
import { ProjectHighlights } from './ProjectHighlights'
import { TechnologyList } from './TechnologyList'

export function ProjectDetails({ project, showHighlights = true }: { project: Project; showHighlights?: boolean }) {
  return (
    <div className="space-y-5">
      {showHighlights && <ProjectHighlights highlights={project.highlights} />}
      {project.supportingText && <p className="text-sm leading-relaxed text-muted-foreground">{project.supportingText}</p>}
      <TechnologyList technologies={project.stack} />
    </div>
  )
}
