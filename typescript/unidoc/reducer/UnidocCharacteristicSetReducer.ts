import { CharacteristicSet } from "../../CharacteristicSet"
import { UnidocValueReducer } from "./UnidocValueReducer"

/**
 * 
 */
export namespace UnidocCharacteristicSetReducer {
  /**
   * 
   */
  const KEYS: string[] = [
    'appearance',
    'constitution',
    'dexterity',
    'education',
    'intelligence',
    'power',
    'size',
    'strength',
    'luck'
  ]

  /**
   * 
   */
  export function reduce(set: CharacteristicSet, indent: string = ''): string {
    const elements: string[] = []

    for (const key of KEYS) {
      elements.push(
        indent + '  \\' + key + '{\r\n' +
        UnidocValueReducer.reduce(set[key], indent + '    ') + '\r\n' +
        indent + '  }'
      )
    }

    return elements.join('\r\n\r\n')
  }
}