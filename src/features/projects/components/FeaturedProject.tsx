import type { Project } from '../schema'
import { ProjectFrame } from './ProjectFrame'
import { ProjectOverview } from './ProjectOverview'
import { ProjectDetails } from './ProjectDetails'
import { ProjectPreview } from './ProjectPreview'
import { ProjectHighlights } from './ProjectHighlights'
import { ProjectLinks } from './ProjectLinks'

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <ProjectFrame project={project} className="space-y-8">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="space-y-6"><p className="section-label">Featured project</p><ProjectOverview project={project} /><ProjectLinks links={project.links} /></div>
        <div className="featured-scene min-w-0 space-y-6"><ProjectHighlights highlights={project.highlights} /><ProjectPreview project={project} /></div>
      </div>
      <ProjectDetails project={project} showHighlights={false} />
    </ProjectFrame>
  )
}
