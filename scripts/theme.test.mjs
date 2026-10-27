import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'
import { test } from 'node:test'

const source = await readFile(new URL('../public/theme.js', import.meta.url), 'utf8')
function setup({ saved = null, dark = false, blocked = false } = {}) {
  const handlers = {}
  let value = saved
  let applied = false
  const system = { matches: dark, addEventListener: (_, listener) => { handlers.system = listener } }
  const window = { matchMedia: () => system, addEventListener: (_, listener) => { handlers.storage = listener } }
  runInNewContext(source, {
    window,
    document: { documentElement: { classList: { toggle: (_, active) => { applied = active } } } },
    localStorage: {
      getItem: () => { if (blocked) throw Error('blocked'); return value },
      setItem: (_, next) => { if (blocked) throw Error('blocked'); value = next },
      removeItem: () => { if (blocked) throw Error('blocked'); value = null },
    },
  })
  return { api: window.portfolioTheme, system, handlers, applied: () => applied, saved: () => value }
}

test('default follows the system and responds to live system changes', () => {
  const theme = setup({ dark: true })
  assert.equal(theme.api.getSnapshot(), 'system')
  assert.equal(theme.applied(), true)
  assert.equal(theme.api.getResolvedSnapshot(), 'dark')
  theme.system.matches = false
  theme.handlers.system()
  assert.equal(theme.applied(), false)
  assert.equal(theme.api.getResolvedSnapshot(), 'light')
})
test('explicit choice persists, overrides system, and can return to system', () => {
  const theme = setup({ saved: 'light', dark: true })
  assert.equal(theme.applied(), false)
  theme.api.setPreference('dark')
  assert.equal(theme.saved(), 'dark')
  assert.equal(theme.applied(), true)
  theme.api.setPreference('system')
  assert.equal(theme.saved(), null)
  assert.equal(theme.api.getSnapshot(), 'system')
})
test('storage events synchronise tabs and subscriptions clean up', () => {
  const theme = setup()
  let updates = 0
  const unsubscribe = theme.api.subscribe(() => updates++)
  theme.handlers.storage({ key: 'portfolio-theme', newValue: 'dark' })
  assert.equal(theme.applied(), true)
  assert.equal(updates, 1)
  unsubscribe()
  theme.api.setPreference('light')
  assert.equal(updates, 1)
})
test('invalid saved values and blocked storage retain usable switching', () => {
  assert.equal(setup({ saved: 'invalid' }).api.getSnapshot(), 'system')
  const theme = setup({ blocked: true })
  theme.api.setPreference('dark')
  assert.equal(theme.applied(), true)
})
