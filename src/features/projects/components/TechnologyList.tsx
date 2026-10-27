export function TechnologyList({ technologies }: { technologies: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Project technologies">
      {technologies.map((technology) => (
        <li key={technology} className="rounded bg-accent px-3 py-1.5 text-xs text-accent-foreground">{technology}</li>
      ))}
    </ul>
  )
}
