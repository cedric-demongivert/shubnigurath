import { List } from 'immutable'

import { Modifier } from './Modifier'
import { Empty } from './utils'

/**
 * 
 */
const VANILLA_PROPERTIES = { base: 0 }

function vanilla(value: number): Value.Properties {
  VANILLA_PROPERTIES.base = value
  return VANILLA_PROPERTIES
}

/**
 * 
 */
export class Value {
  /**
   * 
   */
  public readonly base: number | undefined

  /**
   * 
   */
  public readonly modifiers: List<Modifier>

  /**
   * 
   */
  private static ZERO: Value = new Value(vanilla(0))

  /**
   * 
   */
  private static EMPTY: Value = new Value()

  /**
   * 
   */
  public static create(properties?: Value.Properties | number | undefined): Value {
    if (properties == null) {
      return Value.EMPTY
    } else if (typeof properties === 'number') {
      return properties === 0 ? Value.ZERO : new Value(vanilla(properties))
    } else {
      return new Value(properties)
    }
  }

  /**
   * 
   */
  public static zero(): Value {
    return Value.ZERO
  }

  /**
   * 
   */
  public static empty(): Value {
    return Value.EMPTY
  }

  /**
   * 
   */
  private constructor(properties: Value.Properties = Empty.OBJECT) {
    this.base = properties.base
    this.modifiers = properties.modifiers || List()
  }

  /**
   * 
   */
  public sum(): number {
    let result: number = this.base || 0

    for (const modifier of this.modifiers) {
      result += modifier.value
    }

    return result
  }

  /**
   * 
   */
  public half(): number {
    return this.sum() >> 1
  }

  /**
   * 
   */
  public fifth(): number {
    return (this.sum() / 5) << 0
  }

  /**
   * 
   */
  public toString() {
    return this.sum() + ' / ' + this.half() + ' / ' + this.fifth()
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Value) {
      return (
        other.base === this.base &&
        other.modifiers.equals(this.modifiers)
      )
    }
  }

  /**
   * 
   */
  public [Symbol.toPrimitive](): number {
    return this.sum()
  }
}

/**
 * 
 */
export namespace Value {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    readonly base?: number | undefined,

    /**
     * 
     */
    readonly modifiers?: List<Modifier> | undefined
  }
}