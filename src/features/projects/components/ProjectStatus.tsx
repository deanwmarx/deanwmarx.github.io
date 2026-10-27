import type { Project } from '../schema'

const labels = {
  live: 'Live',
  'ready-to-run': 'Ready to run',
  'in-development': 'In development',
  prototype: 'Prototype',
  'personal-use': 'Personal use',
  archived: 'Archived',
} satisfies Record<NonNullable<Project['status']>, string>

export function ProjectStatus({ status }: { status: NonNullable<Project['status']> }) {
  const live = status === 'live'
  return <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 text-[0.6875rem] font-medium leading-4 ${live ? 'border-accent-border bg-accent text-accent-foreground' : 'border-border bg-muted text-secondary-foreground'}`}>
    <span aria-hidden="true" className={`size-1.5 rounded-full ${live ? 'bg-primary' : 'bg-muted-foreground'}`} />
    <span className="sr-only">Project status: </span>{labels[status]}
  </span>
}
