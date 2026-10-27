import projectContent from '../../content/projects.json'
import type { Project } from './schema'

// The build validates this JSON against the same schema that derives Project.
// Validation tooling stays out of the browser bundle.
export const projects: readonly Project[] = projectContent as Project[]
export type { Project } from './schema'
