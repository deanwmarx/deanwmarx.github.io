import { ActionLink } from '../ActionLink'
import { site } from '../../content/site'
import { ExternalLink } from '../ExternalLink'
import { Container } from './Container'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="mt-8 pb-8">
      <Container>
        <div className="flex flex-col gap-8 py-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2"><p className="text-xl font-bold tracking-tight text-foreground">{site.name}</p><p className="text-sm text-muted-foreground">{site.description}</p></div>
          <div className="flex flex-wrap items-center gap-6"><ExternalLink href={site.github}>GitHub</ExternalLink><ActionLink href="#top" direction="up">Back to top</ActionLink></div>
        </div>
        <div className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} {site.name}</p><p>Built with {site.builtWith.slice(0, -1).join(', ')} &amp; {site.builtWith.at(-1)}.</p>
        </div>
      </Container>
    </footer>
  )
}
