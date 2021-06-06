/**
 * 
 */
export type Characteristic = number

/**
 * 
 */
export namespace Characteristic {
  /**
  *
  */
  export const APPEARANCE: Characteristic = 0

  /**
  *
  */
  export const CONSTITUTION: Characteristic = 1

  /**
  *
  */
  export const DEXTERITY: Characteristic = 2

  /**
  *
  */
  export const EDUCATION: Characteristic = 3

  /**
  *
  */
  export const INTELLIGENCE: Characteristic = 4

  /**
  *
  */
  export const POWER: Characteristic = 5

  /**
  *
  */
  export const SIZE: Characteristic = 6

  /**
  *
  */
  export const STRENGTH: Characteristic = 7

  /**
  *
  */
  export const LUCK: Characteristic = 8

  /**
  *
  */
  export const DEFAULT: Characteristic = 0

  /**
  *
  */
  export const ALL: Characteristic[] = [
    APPEARANCE,
    CONSTITUTION,
    DEXTERITY,
    EDUCATION,
    INTELLIGENCE,
    POWER,
    SIZE,
    STRENGTH,
    LUCK
  ]

  /***
  *
  */
  export function toString(characteristic: Characteristic): string | undefined {
    switch (characteristic) {
      case APPEARANCE: return 'APPEARANCE'
      case CONSTITUTION: return 'CONSTITUTION'
      case DEXTERITY: return 'DEXTERITY'
      case EDUCATION: return 'EDUCATION'
      case INTELLIGENCE: return 'INTELLIGENCE'
      case POWER: return 'POWER'
      case SIZE: return 'SIZE'
      case STRENGTH: return 'STRENGTH'
      case LUCK: return 'LUCK'
      default: return undefined
    }
  }

  /**
  *
  */
  export function toDebugString(characteristic: Characteristic): string {
    return 'Characteristic ' + characteristic + ' (' + (toString(characteristic) || 'undefined') + ')'
  }
}
