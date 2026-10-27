import type { Project } from '../schema'
import { ProjectFrame } from './ProjectFrame'
import { ProjectOverview } from './ProjectOverview'
import { ProjectDetails } from './ProjectDetails'
import { ProjectPreview } from './ProjectPreview'
import { ProjectLinks } from './ProjectLinks'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <ProjectFrame project={project} className="grid gap-7 md:grid-cols-2 md:gap-x-10">
      <div className="md:col-start-1"><ProjectOverview project={project} /></div>
      <div className="min-w-0 md:col-start-2 md:row-span-2 md:row-start-1"><ProjectPreview project={project} /></div>
      <div className="space-y-6 md:col-start-1"><ProjectDetails project={project} /><ProjectLinks links={project.links} /></div>
    </ProjectFrame>
  )
}
