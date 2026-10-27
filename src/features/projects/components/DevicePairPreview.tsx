import { PreviewViewer } from './PreviewViewer'
import { BrowserChrome } from './BrowserChrome'
import type { Project } from '../schema'
import { PhoneFrame } from './PhoneFrame'
import { ProjectMedia } from './ProjectMedia'

export function DevicePairPreview({ project }: { project: Project & { mobileMedia: NonNullable<Project['mobileMedia']> } }) {
  const mobile = project.mobileMedia
  return <div role="group" aria-label={`${project.title} desktop and mobile previews`} className="relative isolate aspect-[4/3] min-w-0">
    <div className="w-[90%]"><ProjectMedia media={project.media[0]} label={`${project.title} desktop`} address={project.browserAddress} browserTitle={project.browserTitle} /></div>
    <figure aria-label={`${project.title} mobile`} className="absolute bottom-0 right-0 w-[34%] max-w-40">
      <PhoneFrame compact>
        {project.mobileBrowser && <BrowserChrome mobile address={project.browserAddress} />}
        <PreviewViewer {...mobile}><img src={mobile.src} alt={mobile.alt} width={mobile.width} height={mobile.height} loading="lazy" decoding="async" className="block h-auto w-full" /></PreviewViewer>
      </PhoneFrame>
    </figure>
  </div>
}
