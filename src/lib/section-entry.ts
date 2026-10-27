export type SectionEntry = { armed: boolean; count: number }

export function nextSectionEntry(state: SectionEntry, visible: boolean, ratio: number): SectionEntry {
  if (!visible) return state.armed ? state : { ...state, armed: true }
  if (state.armed && ratio >= .08) return { armed: false, count: state.count + 1 }
  return state
}
