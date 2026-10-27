import type { ComponentProps } from 'react'
import { ActionLink } from './ActionLink'

type ExternalLinkProps = Pick<ComponentProps<typeof ActionLink>, 'href' | 'children' | 'appearance'>

export function ExternalLink(props: ExternalLinkProps) {
  return <ActionLink {...props} direction="external" />
}
