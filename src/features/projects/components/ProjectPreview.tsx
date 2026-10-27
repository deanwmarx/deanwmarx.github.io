import type { Project } from '../schema'
import { ProjectPreviewReveal } from './ProjectReveal'
import { DevicePairPreview } from './DevicePairPreview'
import { PhoneShowcase } from './PhoneShowcase'
import { ProjectMedia } from './ProjectMedia'

export function ProjectPreview({ project }: { project: Project }) {
  let preview
  if (project.showcase) {
    preview = <PhoneShowcase showcase={project.showcase} label={project.title} />
  } else if (project.mobileMedia) {
    preview = <DevicePairPreview project={{ ...project, mobileMedia: project.mobileMedia }} />
  } else {
    preview = <ProjectMedia media={project.media[0]} label={project.title} address={project.browserAddress} browserTitle={project.browserTitle} />
  }
  return <ProjectPreviewReveal>{preview}</ProjectPreviewReveal>
}
