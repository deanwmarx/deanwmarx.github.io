import { ActionLink } from '../ActionLink'
import { site } from '../../content/site'
import { ExternalLink } from '../ExternalLink'
import { Container } from './Container'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="pb-6 sm:pb-8">
      <Container>
        <div className="flex flex-col gap-5 pb-6 pt-10 sm:gap-8 sm:pb-8 sm:pt-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5 sm:space-y-2"><p className="text-xl font-bold tracking-tight text-foreground">{site.name}</p><p className="text-sm text-muted-foreground">{site.description}</p></div>
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-start sm:gap-6"><ExternalLink href={site.github}>GitHub</ExternalLink><ActionLink href="#top" direction="up">Back to top</ActionLink></div>
        </div>
        <div className="flex flex-col gap-1.5 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} {site.name}</p><p className="max-w-sm text-[0.6875rem] leading-relaxed sm:max-w-none sm:text-xs">Built with {site.builtWith.slice(0, -1).join(', ')} &amp; {site.builtWith.at(-1)}.</p>
        </div>
      </Container>
    </footer>
  )
}
