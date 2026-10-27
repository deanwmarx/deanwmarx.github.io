import { readFile, access } from 'node:fs/promises'
import { resolve, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'
import { projectsSchema } from '../src/features/projects/schema.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const contentPath = resolve(root, process.argv[2] ?? 'src/content/projects.json')
const projects = JSON.parse(await readFile(contentPath, 'utf8'))
const validate = new Ajv({ allErrors: true }).compile(projectsSchema)

if (!validate(projects)) {
  throw new Error(`Invalid project content:\n${JSON.stringify(validate.errors, null, 2)}`)
}

function assertUnique(values, label) {
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}.`)
}

assertUnique(projects.map(({ id }) => id), 'project IDs')

for (const project of projects) {
  assertUnique(project.media.map(({ id }) => id), `${project.id} media IDs`)

  for (const { href } of project.links) {
    const url = new URL(href)
    if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) {
      throw new Error(`Invalid public project URL: ${project.id}`)
    }
  }

  for (const media of project.media) {
    const imagesRoot = resolve(root, 'public/images')
    const asset = resolve(root, `public${media.src}`)
    const pathFromImages = relative(imagesRoot, asset)
    if (pathFromImages.startsWith(`..${sep}`) || pathFromImages === '..' || !pathFromImages) {
      throw new Error(`Media must stay within public/images: ${media.src}`)
    }
    await access(asset)
  }


}

console.log(`Validated ${projects.length} projects: ${projects.map(({ id }) => id).join(', ')}.`)
