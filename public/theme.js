/* Runs before the app to apply the saved/system theme without a light flash. */
(() => {
  const key = 'portfolio-theme'
  const system = window.matchMedia('(prefers-color-scheme: dark)')
  const listeners = new Set()
  const normalise = (value) => value === 'light' || value === 'dark' ? value : 'system'
  let preference = 'system'
  try { preference = normalise(localStorage.getItem(key)) } catch { /* Storage may be blocked. */ }
  const isDark = () => preference === 'dark' || (preference === 'system' && system.matches)
  const apply = () => {
    document.documentElement.classList.toggle('dark', isDark())
    listeners.forEach((listener) => listener())
  }
  window.portfolioTheme = {
    getSnapshot: () => preference,
    getResolvedSnapshot: () => isDark() ? 'dark' : 'light',
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener) },
    setPreference: (value) => {
      preference = normalise(value)
      try {
        if (preference === 'system') localStorage.removeItem(key)
        else localStorage.setItem(key, preference)
      } catch { /* The current tab can still switch themes. */ }
      apply()
    },
  }
  system.addEventListener('change', apply)
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) { preference = normalise(event.newValue); apply() }
  })
  apply()
})()
