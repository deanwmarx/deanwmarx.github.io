import type { IconName } from '../components/Icon'

type SkillGroup = {
  id: string
  title: string
  description: string
  icon: IconName
  accent?: boolean
  skills: { name: string; level: number }[]
}

// CV self-assessments. Public descriptive labels remain subject to final review.
export const skillGroups: SkillGroup[] = [
  { id: 'frontend', title: 'Frontend', description: 'Build thoughtful interfaces.', icon: 'frontend', skills: [
    { name: 'HTML / CSS', level: 90 }, { name: 'Tailwind CSS', level: 85 }, { name: 'JavaScript', level: 80 },
    { name: 'Svelte / SvelteKit', level: 80 }, { name: 'TypeScript', level: 75 }, { name: 'React / Next.js', level: 70 },
  ] },
  { id: 'design', title: 'UX Design', description: 'Shape the experience.', icon: 'design', skills: [
    { name: 'Figma', level: 85 }, { name: 'Prototyping', level: 85 }, { name: 'User Research', level: 80 },
  ] },
  { id: 'ai', title: 'AI-assisted development', description: 'Specifications, tools, and considered execution.', icon: 'sparkle', accent: true, skills: [
    { name: 'Claude Code', level: 75 }, { name: 'GitHub Copilot', level: 75 },
    { name: 'Specification-Driven Development', level: 70 }, { name: 'OpenAPI Contracts', level: 60 },
  ] },
  { id: 'backend', title: 'Backend', description: 'Connect the interface to the services behind it.', icon: 'backend', skills: [
    { name: 'Node.js / Express', level: 65 }, { name: 'PHP', level: 55 }, { name: 'MySQL', level: 70 },
    { name: 'MongoDB', level: 50 }, { name: 'Laravel', level: 60 }, { name: 'CodeIgniter', level: 50 },
  ] },
  { id: 'qa', title: 'QA Testing', description: 'Keep the experience reliable.', icon: 'testing', skills: [
    { name: 'Manual Testing', level: 80 }, { name: 'Jest', level: 60 },
    { name: 'React Testing Library', level: 50 }, { name: 'Test-Driven Development', level: 60 },
  ] },
]

export function experienceLabel(level: number) {
  if (level >= 80) return 'Core'
  if (level >= 65) return 'Confident'
  return 'Working knowledge'
}
