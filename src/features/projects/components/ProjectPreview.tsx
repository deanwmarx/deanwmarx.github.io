import type { Project } from '../schema'
import { ProjectMedia } from './ProjectMedia'

export function ProjectPreview({ project }: { project: Project }) {
  return <ProjectMedia media={project.media[0]} label={project.title} />
}
