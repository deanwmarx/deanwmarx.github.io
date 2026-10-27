import type { Project } from '../schema'
import { ProjectPreviewReveal } from './ProjectReveal'
import { ProjectMedia } from './ProjectMedia'

export function ProjectPreview({ project }: { project: Project }) {
  return <ProjectPreviewReveal><ProjectMedia media={project.media[0]} label={project.title} /></ProjectPreviewReveal>
}
