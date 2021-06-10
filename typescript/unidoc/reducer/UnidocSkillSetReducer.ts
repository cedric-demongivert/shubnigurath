import { SkillSet } from "../../SkillSet"

/**
 * 
 */
export namespace UnidocSkillSetReducer {
  /**
   * 
   */
  export function reduce(set: SkillSet, base: SkillSet = SkillSet.empty(), indent: string = ''): string {
    const elements: string[] = []

    for (const entry of set.entries) {
      let element: string = (
        indent + '\\skill {\r\n' +
        indent + '  \\family { ' + entry.left.family + ' }'
      )

      if (entry.left.specialization != null) {
        element += '\r\n'
        element += indent + '  \\specialization { ' + entry.left.specialization + ' }'
      }

      if (!base.has(entry.left)) {
        element += '\r\n'
        element += indent + '  \\base { ' + entry.right.base + ' }'
      }

      for (const modifier of entry.right.modifiers) {
        element += '\r\n'
        element += indent + '  \\modifier { ' + modifier.value + ' ' + modifier.label + ' }'
      }

      element += '\r\n'
      element += indent + '}'

      elements.push(element)
    }

    return elements.join('\r\n\r\n')
  }
}