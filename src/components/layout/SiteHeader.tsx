import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { MenuIcon } from './MenuIcon'
import { ThemeSwitcher } from './ThemeSwitcher'
import { site } from '../../content/site'
import { ExternalLink } from '../ExternalLink'
import { Container } from './Container'
import { useActiveSection } from '../../hooks/useActiveSection'

export function SiteHeader() {
  const [isOpen, setOpen] = useState(false)
  const panelId = useId()
  const toggle = useRef<HTMLButtonElement>(null)
  const active = useActiveSection()
  const header = useRef<HTMLElement>(null)
  const desktop = useMediaQuery('(min-width: 768px)')
  const reduced = useReducedMotion()

  const closeMenu = useCallback((returnFocus = false) => {
    setOpen(false)
    if (returnFocus) toggle.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) closeMenu()
    }
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu(true)
    }
    const viewport = window.matchMedia('(min-width: 768px)')
    const dismissDesktop = () => { if (viewport.matches) closeMenu() }
    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('keydown', dismissEscape)
    viewport.addEventListener('change', dismissDesktop)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('keydown', dismissEscape)
      viewport.removeEventListener('change', dismissDesktop)
    }
  }, [isOpen, closeMenu])

  return (
    <header ref={header} className="site-header" onBlur={(event) => { if (isOpen && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) closeMenu() }}>
      <Container>
        <div className="relative flex min-h-22 flex-wrap items-center justify-between gap-4 border-b border-border py-4">
          <a href="#top" onClick={() => closeMenu()} className="group space-y-0.5">
            <span className="block text-xl font-bold tracking-tight text-foreground sm:text-2xl">{site.name}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{site.role}</span>
          </a>
          <div className="ml-auto flex items-center gap-2 md:order-last md:ml-0"><ThemeSwitcher />
          <button ref={toggle} type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(!isOpen)} className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-primary md:hidden">
            <MenuIcon open={isOpen} />
          </button></div>
          <m.nav id={panelId} aria-label="Main" aria-hidden={!desktop && !isOpen ? true : undefined} inert={!desktop && !isOpen} initial={false} animate={{ opacity: desktop || isOpen ? 1 : 0, y: desktop || isOpen ? 0 : -8 }} transition={{ duration: reduced ? 0 : .2, ease: [.2, .8, .2, 1] }} onClick={(event) => { if (event.target instanceof Element && event.target.closest('a')) closeMenu() }} className={`${isOpen ? 'visible' : 'invisible'} absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 shadow-xl shadow-foreground/10 md:visible md:static md:basis-auto md:flex-row md:items-center md:gap-6 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <div className="flex flex-col gap-1 rounded-lg bg-muted p-1 md:flex-row">
              {site.navigation.map(({ label, href }) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined} onClick={() => closeMenu()} className={`nav-link transition-colors duration-200 motion-reduce:transition-none rounded-md px-6 py-3 text-sm font-medium hover:bg-background hover:text-primary ${active === href ? 'bg-background text-primary shadow-[inset_0_-2px_0_var(--color-primary)]' : 'text-secondary-foreground'}`}>{label}</a>)}
            </div>
            <ExternalLink href={site.github} appearance="primary">GitHub</ExternalLink>
          </m.nav>
        </div>
      </Container>
    </header>
  )
}
