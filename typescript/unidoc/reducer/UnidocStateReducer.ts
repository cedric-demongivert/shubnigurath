import { Mutables } from "../../Mutables"

/**
 * 
 */
export namespace UnidocStateReducer {
  /**
   * 
   */
  export function reduce(summary: Mutables, indent: string = ''): string {
    const elements: string[] = []

    elements.push(indent + '\\health { ' + summary.health + ' }')
    elements.push(indent + '\\mentalHealth { ' + summary.mentalHealth + ' }')
    elements.push(indent + '\\magic { ' + summary.magic + ' }')
    elements.push(indent + '\\luck { ' + summary.luck + ' }')

    if (summary.indefinitelyInsane) {
      elements.push(indent + '\\indefinitelyInsane')
    }

    if (summary.majorWound) {
      elements.push(indent + '\\majorWound')
    }

    if (summary.temporaryInsane) {
      elements.push(indent + '\\temporaryInsane')
    }

    return elements.join('\r\n\r\n')
  }
}