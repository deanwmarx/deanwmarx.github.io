export type ThemePreference = 'system' | 'light' | 'dark'

declare global {
  interface Window {
    portfolioTheme: {
      getResolvedSnapshot: () => 'light' | 'dark'
      getSnapshot: () => ThemePreference
      subscribe: (listener: () => void) => () => void
      setPreference: (value: ThemePreference) => void
    }
  }
}
