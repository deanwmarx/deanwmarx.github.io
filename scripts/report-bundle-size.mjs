import { readdir, readFile } from 'node:fs/promises'
import { extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync, brotliCompressSync } from 'node:zlib'

const directory = new URL('../dist/', import.meta.url)
const files = (await readdir(directory, { recursive: true })).filter((file) => ['.js', '.css'].includes(extname(file)))
const kib = (bytes) => `${(bytes / 1024).toFixed(2)} KiB`
const totals = { raw: 0, gzip: 0, brotli: 0 }

for (const file of files) {
  const content = await readFile(new URL(file, directory))
  const sizes = { raw: content.length, gzip: gzipSync(content).length, brotli: brotliCompressSync(content).length }
  for (const key of Object.keys(totals)) totals[key] += sizes[key]
  console.log(`${file}: ${kib(sizes.raw)} raw | ${kib(sizes.gzip)} gzip | ${kib(sizes.brotli)} Brotli`)
}

console.log(`Total JS/CSS: ${kib(totals.raw)} raw | ${kib(totals.gzip)} gzip | ${kib(totals.brotli)} Brotli`)
console.log(`Measured build: ${fileURLToPath(directory)} (excludes HTML, fonts and images).`)
