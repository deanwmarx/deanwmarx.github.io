import type { Project } from '../schema'
import { ProjectPreviewReveal } from './ProjectReveal'
import { DevicePairPreview } from './DevicePairPreview'
import { PhoneShowcase } from './PhoneShowcase'
import { ProjectMedia } from './ProjectMedia'

export function ProjectPreview({ project }: { project: Project }) {
  return <ProjectPreviewReveal>{project.showcase ? <PhoneShowcase showcase={project.showcase} label={project.title} /> : project.mobileMedia ? <DevicePairPreview project={{ ...project, mobileMedia: project.mobileMedia }} /> : <ProjectMedia media={project.media[0]} label={project.title} address={project.browserAddress} browserTitle={project.browserTitle} />}</ProjectPreviewReveal>
}
