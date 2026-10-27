import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const root = fileURLToPath(new URL('../', import.meta.url))
const original = JSON.parse(await readFile(new URL('../src/content/projects.json', import.meta.url), 'utf8'))

async function checkContent(change, expectedExit) {
  const folder = await mkdtemp(join(tmpdir(), 'portfolio-content-'))
  try {
    const fixture = structuredClone(original)
    change(fixture)
    const path = join(folder, 'projects.json')
    await writeFile(path, JSON.stringify(fixture))
    const result = spawnSync(process.execPath, ['scripts/validate-content.mjs', path], { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, expectedExit, result.stderr || result.stdout)
  } finally {
    await rm(folder, { recursive: true, force: true })
  }
}

test('an additional JSON project validates without renderer or schema edits', () => checkContent((projects) => {
  projects.push({ ...structuredClone(projects[0]), id: 'additional-project', template: 'generic' })
}, 0))

test('duplicate anchors cannot enter the project navigator', () => checkContent((projects) => {
  projects.push(structuredClone(projects[0]))
}, 1))

test('unknown presentation templates fail before deployment', () => checkContent((projects) => {
  projects[0].template = 'unsupported'
}, 1))

test('credential-bearing project URLs are rejected', () => checkContent((projects) => {
  projects[0].links[0].href = 'https://user:password@example.com'
}, 1))

test('multiple project images are rejected', () => checkContent((projects) => {
  const media = { id: 'preview', src: '/images/example.webp', alt: 'Example', width: 800, height: 600 }
  projects[0].media = [media, { ...media, id: 'second' }]
}, 1))

test('media paths cannot escape public/images', () => checkContent((projects) => {
  projects[0].media.push({ id: 'unsafe', src: '/images/../../package.json', alt: 'Example', width: 100, height: 100 })
}, 1))
