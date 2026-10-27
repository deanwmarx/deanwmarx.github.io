import type { Project } from '../schema'
import { m } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { getProjectNavigation, projectsAheadLabel } from '../navigation'

type ProjectNavigatorProps = {
  projects: readonly Project[]
  selectedId?: string
  progress: MotionValue<number>
  showProgress: boolean
}

export function ProjectNavigator({ projects, selectedId, progress, showProgress }: ProjectNavigatorProps) {
  const state = getProjectNavigation(projects, selectedId)
  if (!state) return null

  return (
    <nav aria-label="Projects" className="project-navigator min-w-0 bg-background py-3 lg:py-0">
      <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1 lg:block lg:space-y-2">
        <p aria-live="polite" aria-atomic="true" className="min-w-0 break-words text-sm font-semibold text-foreground">
          <span className="lg:hidden">{state.current.navigationLabel ?? state.current.title}</span><span className="hidden lg:inline">Project</span> <span className="font-normal text-muted-foreground">· {state.index + 1} of {state.total}</span>
        </p>
        <p className="text-xs text-muted-foreground lg:hidden">{projectsAheadLabel(state.remaining)}</p>
      </div>
      <div className="relative mt-6 hidden lg:block">
        {state.total > 1 && <div role={showProgress ? 'img' : undefined} aria-label={showProgress ? 'Scrolling progress through selected work' : undefined} aria-hidden={!showProgress} className={`pointer-events-none absolute bottom-[22px] left-[7px] top-[22px] w-0.5 overflow-hidden rounded bg-border ${showProgress ? '' : 'invisible'}`}><m.div className="h-full w-full origin-top bg-primary" style={{ scaleY: progress }} /></div>}
        <ol className="relative space-y-1">
          {state.items.map((item) => (
            <li key={item.id}>
              <a href={item.href} aria-current={item.isCurrent ? 'location' : undefined} className={`flex min-h-11 max-w-full transition-colors duration-200 motion-reduce:transition-none items-start gap-2.5 break-words py-3.5 text-xs leading-4 underline-offset-4 hover:underline ${item.isCurrent ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center rounded-full bg-background">
                  {item.isComplete ? <span className="text-primary">✓</span> : <span className={`size-1.5 rounded-full ${item.isCurrent ? 'bg-primary ring-4 ring-accent' : 'bg-muted-foreground'}`} />}
                </span>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div role={showProgress ? 'img' : undefined} aria-label={showProgress ? 'Scrolling progress through selected work' : undefined} aria-hidden={!showProgress} className={`mt-3 h-0.5 overflow-hidden rounded bg-border lg:hidden ${showProgress ? '' : 'invisible'}`}><m.div className="h-full w-full origin-left bg-primary" style={{ scaleX: progress }} /></div>
    </nav>
  )
}
