import { List } from 'immutable'

import { Characteristic } from './Characteristic'

import { Value } from './Value'

/**
 * 
 */
export class CharacteristicSet {
  /**
  *
  */
  public readonly values: List<Value>

  /**
   * 
   */
  public static readonly EMPTY: CharacteristicSet = new CharacteristicSet(
    List.of(
      Value.zero(),
      Value.zero(),
      Value.zero(),
      Value.zero(),
      Value.zero(),
      Value.zero(),
      Value.zero(),
      Value.zero(),
      Value.zero()
    )
  )

  /**
   * 
   */
  public static empty(): CharacteristicSet {
    return CharacteristicSet.EMPTY
  }

  /**
   * 
   */
  public static create(properties?: CharacteristicSet.Properties | undefined): CharacteristicSet {
    if (properties) {
      return new CharacteristicSet(List.of(
        properties.appearance || Value.zero(),
        properties.constitution || Value.zero(),
        properties.dexterity || Value.zero(),
        properties.education || Value.zero(),
        properties.intelligence || Value.zero(),
        properties.power || Value.zero(),
        properties.size || Value.zero(),
        properties.strength || Value.zero(),
        properties.luck || Value.zero()
      ))
    } else {
      return CharacteristicSet.EMPTY
    }
  }

  /**
   * 
   */
  public get appearance(): Value {
    return this.values.get(Characteristic.APPEARANCE)
  }

  /**
   * 
   */
  public get constitution(): Value {
    return this.values.get(Characteristic.CONSTITUTION)
  }

  /**
   * 
   */
  public get dexterity(): Value {
    return this.values.get(Characteristic.DEXTERITY)
  }

  /**
   * 
   */
  public get education(): Value {
    return this.values.get(Characteristic.EDUCATION)
  }

  /**
   * 
   */
  public get intelligence(): Value {
    return this.values.get(Characteristic.INTELLIGENCE)
  }

  /**
   * 
   */
  public get power(): Value {
    return this.values.get(Characteristic.POWER)
  }

  /**
   * 
   */
  public get size(): Value {
    return this.values.get(Characteristic.SIZE)
  }

  /**
   * 
   */
  public get strength(): Value {
    return this.values.get(Characteristic.STRENGTH)
  }

  /**
   * 
   */
  public get luck(): Value {
    return this.values.get(Characteristic.LUCK)
  }

  /**
  *
  */
  private constructor(values: List<Value>) {
    this.values = values
  }

  /**
  *
  */
  public get(characteristic: Characteristic): Value {
    return this.values.get(characteristic)
  }

  /**
  *
  */
  public set(characteristic: Characteristic, value: Value): CharacteristicSet {
    return new CharacteristicSet(this.values.set(characteristic, value))
  }

  /**
  *
  */
  public setAll(properties: CharacteristicSet.Properties): CharacteristicSet {
    const values: List<Value> = this.values

    return new CharacteristicSet(List.of(
      properties.appearance || values.get(0),
      properties.constitution || values.get(1),
      properties.dexterity || values.get(2),
      properties.education || values.get(3),
      properties.intelligence || values.get(4),
      properties.power || values.get(5),
      properties.size || values.get(6),
      properties.strength || values.get(7),
      properties.luck || values.get(8)
    ))
  }

  /**
  *
  */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof CharacteristicSet) {
      return other.values.equals(this.values)
    }

    return false
  }
}

/**
*
*/
export namespace CharacteristicSet {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    appearance?: Value | undefined,

    /**
     * 
     */
    constitution?: Value | undefined,

    /**
     * 
     */
    dexterity?: Value | undefined,

    /**
     * 
     */
    education?: Value | undefined,

    /**
     * 
     */
    intelligence?: Value | undefined,

    /**
     * 
     */
    power?: Value | undefined,

    /**
     * 
     */
    size?: Value | undefined,

    /**
     * 
     */
    strength?: Value | undefined,

    /**
     * 
     */
    luck?: Value | undefined
  }
}
