import { Investigator } from './Investigator'
import { Field } from './redux/Field'
import { Value } from './Value'

/**
 * 
 */
export class Mutables {
  /**
   * 
   */
  public readonly temporaryInsane: Field<boolean>

  /**
   * 
   */
  public readonly indefinitelyInsane: Field<boolean>

  /**
   * 
   */
  public readonly majorWound: Field<boolean>

  /**
   * 
   */
  public readonly health: Field<number>

  /**
   * 
   */
  public readonly mentalHealth: Field<number>

  /**
   * 
   */
  public readonly magic: Field<number>

  /**
   * 
   */
  public readonly luck: Field<Value>

  /**
   * 
   */
  public static create(properties: Mutables.Properties): Mutables {
    return new Mutables(properties)
  }

  /**
   * 
   */
  public static fromInvestigator(investigator: Investigator): Mutables {
    return new Mutables({
      health: Field.create({ value: investigator.maximumHP }),
      mentalHealth: Field.create({ value: investigator.characteristics.power.sum() }),
      magic: Field.create({ value: investigator.maximumMP }),
      luck: Field.create({ value: investigator.characteristics.luck })
    })
  }

  /**
   * 
   */
  private constructor(properties: Mutables.Properties) {
    this.temporaryInsane = properties.temporaryInsane || Field.create({ value: false })
    this.indefinitelyInsane = properties.indefinitelyInsane || Field.create({ value: false })
    this.majorWound = properties.majorWound || Field.create({ value: false })
    this.health = properties.health || Field.create({ value: 0 })
    this.mentalHealth = properties.mentalHealth || Field.create({ value: 0 })
    this.magic = properties.magic || Field.create({ value: 0 })
    this.luck = properties.luck || Field.create({ value: Value.zero() })
  }

  /**
   * 
   */
  public equals(other: any) {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Mutables) {
      return (
        other.temporaryInsane.equals(this.temporaryInsane) &&
        other.indefinitelyInsane.equals(this.indefinitelyInsane) &&
        other.majorWound.equals(this.majorWound) &&
        other.health.equals(this.health) &&
        other.mentalHealth.equals(this.mentalHealth) &&
        other.magic.equals(this.magic)
      )
    }

    return false
  }

}

/**
 * 
 */
export namespace Mutables {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    readonly temporaryInsane?: Field<boolean> | undefined,

    /**
     * 
     */
    readonly indefinitelyInsane?: Field<boolean> | undefined,

    /**
     * 
     */
    readonly majorWound?: Field<boolean> | undefined,

    /**
     * 
     */
    readonly health?: Field<number> | undefined,

    /**
     * 
     */
    readonly mentalHealth?: Field<number> | undefined,

    /**
     * 
     */
    readonly magic?: Field<number> | undefined,

    /**
     * 
     */
    readonly luck?: Field<Value> | undefined
  }
}