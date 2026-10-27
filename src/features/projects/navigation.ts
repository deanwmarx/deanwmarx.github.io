import type { Project } from './schema'

export const projectAnchor = (id: string) => `project-${id}`

export function getProjectNavigation(projects: readonly Project[], selectedId?: string) {
  if (projects.length === 0) return null

  const index = Math.max(0, projects.findIndex(({ id }) => id === selectedId))
  const current = projects[index]!

  return {
    current,
    index,
    total: projects.length,
    remaining: projects.length - index - 1,
    items: projects.map((project, itemIndex) => ({
      id: project.id,
      title: project.navigationLabel ?? project.title,
      href: `#${projectAnchor(project.id)}`,
      isCurrent: itemIndex === index,
      isComplete: itemIndex < index,
    })),
  }
}

export function projectsAheadLabel(count: number) {
  if (count === 0) return 'Skills & tools next'
  return `${count} ${count === 1 ? 'project' : 'projects'} ahead`
}
