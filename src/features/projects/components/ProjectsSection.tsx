import { useProjectScroll } from '../useProjectScroll'
import { projects as content } from '../index'
import type { Project } from '../schema'
import { ProjectList } from './ProjectList'
import { ProjectNavigator } from './ProjectNavigator'

export function ProjectsSection({ projects = content }: { projects?: readonly Project[] }) {
  const { section, progress, index, scrollable, visible } = useProjectScroll(projects)
  if (projects.length === 0) return null

  return (
    <section ref={section} id="work" aria-labelledby="work-title" className="story-work section-anchor relative">
      <div className="story-work-heading flex flex-wrap items-baseline justify-between gap-3"><h2 id="work-title" className="section-title">Selected work</h2><p className="text-xs text-muted-foreground">Products, tools, and personal projects.</p></div>
      <div className="relative flex min-w-0 flex-col gap-0 lg:grid lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-8">
        <div className={`project-nav-slot w-full min-w-0 ${scrollable ? '' : 'project-nav-static'}`}><ProjectNavigator projects={projects} selectedId={projects[index]?.id} progress={progress} showProgress={scrollable && visible} /></div>
        <ProjectList projects={projects} />
      </div>
    </section>
  )
}
