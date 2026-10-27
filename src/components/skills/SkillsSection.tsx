import { useSectionEntry } from '../../hooks/useSectionEntry'
import { experienceLabel, skillGroups } from '../../content/skills'
import { Icon } from '../Icon'
import { Reveal } from '../motion/Reveal'

export function SkillsSection() {
  const { target, entry, armed } = useSectionEntry()
  return (
    <section ref={target} data-entry={entry} id="skills" aria-labelledby="skills-title" className="section-anchor border-t border-border py-14 sm:py-20">
      <Reveal armed={armed} entry={entry} className="mb-10 space-y-3"><p className="section-label">Skills &amp; tools</p><h2 id="skills-title" className="section-title max-w-3xl">The craft behind the interface.</h2></Reveal>
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal armed={armed} entry={entry} delay={index < 2 ? .1 + index * .07 : index === 4 ? .07 : 0} key={group.id} className={group.accent ? 'md:col-span-2' : ''}><section aria-labelledby={`skill-${group.id}`} className={`skills-group min-w-0 border-t border-border pt-6 ${group.accent ? 'rounded-lg border-0 bg-accent p-6' : ''}`}>
            <div className="mb-6 flex items-start justify-between gap-5">
              <div className="min-w-0 space-y-1"><h3 id={`skill-${group.id}`} className="text-xl font-bold tracking-tight text-foreground">{group.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{group.description}</p></div>
              <Icon name={group.icon} className="skills-icon size-9 shrink-0 text-primary sm:size-10" />
            </div>
            <ul className={`grid gap-x-6 gap-y-3 ${group.accent ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2'}`}>
              {group.skills.map((skill) => <li key={skill.name} className="skill-row flex min-w-0 items-start justify-between gap-3 pb-3 sm:flex-col sm:justify-start sm:gap-2"><span className="skill-name min-w-0 text-sm leading-relaxed text-foreground">{skill.name}</span><span className={`shrink-0 rounded px-2 py-1 text-[0.6875rem] font-medium leading-normal text-accent-foreground ${group.accent ? 'bg-card ring-1 ring-inset ring-accent-border' : 'bg-accent'}`}>{experienceLabel(skill.level)}</span></li>)}
            </ul>
          </section></Reveal>
        ))}
      </div>
      <p className="mt-8 text-xs text-muted-foreground">Experience labels are self-assessed.</p>
    </section>
  )
}
