import assert from 'node:assert/strict'
import { before, after, test } from 'node:test'
import { readFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { getProjectNavigation, projectsAheadLabel } from '../src/features/projects/navigation.ts'

const original = JSON.parse(await readFile(new URL('../src/content/projects.json', import.meta.url), 'utf8'))
let server
let ProjectsSection

before(async () => {
  server = await createServer({ server: { middlewareMode: true, watch: null, hmr: false, ws: false }, appType: 'custom' })
  ;({ ProjectsSection } = await server.ssrLoadModule('/src/features/projects/components/ProjectsSection.tsx'))
})
after(async () => { await server?.close() })

const render = (projects) => renderToStaticMarkup(createElement(ProjectsSection, { projects }))

for (const template of ['generic', 'featured']) {
  test(`a fourth ${template} JSON entry renders with its own anchor, content and navigation`, () => {
    const added = {
      id: 'fourth-project', template, title: 'Fourth project', headline: 'A useful product.',
      summary: 'A distinct product overview.', stack: ['React'],
      links: [{ label: 'Code', href: 'https://github.com/example/fourth' }],
      highlights: [], media: [],
    }
    const html = render([...original, added])
    assert.equal((html.match(/<article /g) || []).length, 4)
    assert.match(html, /id="project-fourth-project"/)
    assert.match(html, /href="#project-fourth-project"/)
    assert.match(html, /A distinct product overview/)
    assert.match(html, /1 of 4/)
    assert.match(html, /3 projects ahead/)
    assert.match(html, /https:\/\/github.com\/example\/fourth/)
    assert.equal(getProjectNavigation([...original, added], added.id).remaining, 0)
  })
}

test('real media retains dimensions, alternative text and lazy loading; optional content can be empty', () => {
  const project = { ...original[1], role: undefined, status: undefined, supportingText: undefined, links: [], highlights: [], media: [{ id: 'preview', src: '/images/example.webp', alt: 'Example recipe output', width: 800, height: 600 }] }
  const html = render([project])
  assert.match(html, /alt="Example recipe output"/)
  assert.match(html, /width="800" height="600" loading="lazy"/)
  assert.doesNotMatch(html, /Project imagery to be selected|My role:|aria-label="Project links"/)
})

test('featured capabilities retain both discovery and business management without process chapters', () => {
  const html = render([original[0]])
  assert.match(html, /Discover &amp; play/)
  assert.match(html, /Manage your business/)
  assert.match(html, /Figma designs/)
  assert.doesNotMatch(html, /Understand the complexity|Simplify the journey|Build and improve/)
})

test('counts and anchors remain correct when reordered, removed, or given an unknown selection', () => {
  const reversed = [...original].reverse()
  const state = getProjectNavigation(reversed, original[0].id)
  assert.equal(state.index, 2)
  assert.equal(state.remaining, 0)
  assert.equal(state.items[2].href, `#project-${original[0].id}`)
  assert.equal(getProjectNavigation(original, 'unknown').index, 0)
  assert.equal(getProjectNavigation([], 'unknown'), null)
  assert.equal(projectsAheadLabel(1), '1 project ahead')
  assert.equal(projectsAheadLabel(0), 'Skills & tools next')
  assert.equal(render([]), '')
})

test('every template renders exactly one project preview across static fallbacks', () => {
  for (const project of original) {
    const html = render([project])
    assert.equal((html.match(/<figure /g) || []).length, 1)
    assert.equal((html.match(/Project imagery to be selected/g) || []).length, 1)
  }
})

test('project external links open in new tabs with safe relationships and a readable hint', () => {
  for (const project of original) {
    const html = render([project])
    assert.equal((html.match(/target="_blank"/g) || []).length, project.links.length)
    assert.equal((html.match(/rel="noopener noreferrer"/g) || []).length, project.links.length)
    assert.equal((html.match(/opens in a new tab/g) || []).length, project.links.length)
    assert.doesNotMatch(html, /href="#project-[^"]+" target="_blank"/)
  }
})
