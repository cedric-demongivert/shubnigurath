import { Value } from "../../Value"

/**
 * 
 */
export namespace UnidocValueReducer {
  /**
   * 
   */
  export function reduce(value: Value, indent: string = ''): string {
    let result: string = indent + '\\base { ' + value.base + ' }'

    for (const modifier of value.modifiers) {
      result += '\r\n'
      result += indent + '\\modifier { ' + modifier.value + ' ' + modifier.label + ' }'
    }

    return result
  }
}