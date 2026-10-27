import type { FromSchema } from 'json-schema-to-ts'

const text = { type: 'string', minLength: 1 } as const
const identifier = { ...text, pattern: '^[a-z][a-z0-9-]*$' } as const

// One contract for both build-time validation and compile-time content types.
export const projectSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'template', 'title', 'headline', 'summary', 'stack', 'links', 'highlights', 'media'],
  properties: {
    id: identifier,
    template: { enum: ['generic', 'featured'] },
    title: text,
    navigationLabel: text,
    headline: text,
    summary: text,
    role: text,
    contextLabel: text,
    status: { enum: ['live', 'ready-to-run', 'in-development', 'prototype', 'personal-use', 'archived'] },
    supportingText: text,
    stack: { type: 'array', minItems: 1, uniqueItems: true, items: text },
    links: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['label', 'href'],
        properties: { label: text, href: { ...text, pattern: '^https://' } },
      },
    },
    highlights: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['title', 'description'],
        properties: { title: text, description: text },
      },
    },
    media: {
      type: 'array', maxItems: 1,
      items: {
        type: 'object', additionalProperties: false,
        required: ['id', 'src', 'alt', 'width', 'height'],
        properties: {
          id: identifier,
          src: { ...text, pattern: '^/images/' },
          alt: text,
          width: { type: 'integer', minimum: 1 },
          height: { type: 'integer', minimum: 1 },
          caption: text,
        },
      },
    },

  },
} as const

export const projectsSchema = {
  type: 'array', minItems: 1, items: projectSchema,
} as const

export type Project = FromSchema<typeof projectSchema>
