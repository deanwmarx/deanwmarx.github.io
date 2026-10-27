import { useStorySnap } from '../hooks/useStorySnap'
import { Container } from '../components/layout/Container'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/layout/SiteFooter'
import { Hero } from '../components/hero/Hero'
import { SkillsSection } from '../components/skills/SkillsSection'
import { ProjectsSection } from '../features/projects/components/ProjectsSection'

export function App() {
  useStorySnap()
  return (
    <div className="min-h-svh">
      <div id="top" tabIndex={-1} className="h-px" />
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}><Container><Hero /><ProjectsSection /><SkillsSection /></Container></main>
      <SiteFooter />
    </div>
  )
}
