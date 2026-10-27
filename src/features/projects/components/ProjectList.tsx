import type { Project } from '../schema'
import { FeaturedProject } from './FeaturedProject'
import { ProjectCard } from './ProjectCard'

const templates = { generic: ProjectCard, featured: FeaturedProject }

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="min-w-0 divide-y divide-border lg:divide-y-0">
      {projects.map((project) => {
        const Template = templates[project.template]
        return <Template key={project.id} project={project} />
      })}
    </div>
  )
}
