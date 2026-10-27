import { useSyncExternalStore } from 'react'
import { Icon } from '../Icon'

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(window.portfolioTheme.subscribe, window.portfolioTheme.getResolvedSnapshot, () => 'light')
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button type="button" aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`} onClick={() => window.portfolioTheme.setPreference(next)} className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-primary">
      <Icon name={theme === 'dark' ? 'moon' : 'sun'} className="size-6" />
    </button>
  )
}
