import type { PropsWithChildren } from 'react'
import type { Project } from '../schema'
import { projectAnchor } from '../navigation'

type ProjectFrameProps = PropsWithChildren<{ project: Project; className: string }>

export function ProjectFrame({ project, className, children }: ProjectFrameProps) {
  return (
    <article id={projectAnchor(project.id)} aria-labelledby={`${project.id}-title`} data-template={project.template} className={`project-anchor min-w-0 py-5 sm:py-8 lg:py-[var(--project-content-inset)] ${className}`}>
      {children}
    </article>
  )
}
