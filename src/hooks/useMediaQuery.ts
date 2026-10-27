import { useCallback, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const match = window.matchMedia(query)
    match.addEventListener('change', notify)
    return () => match.removeEventListener('change', notify)
  }, [query])
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query])
  return useSyncExternalStore(subscribe, snapshot, () => false)
}
