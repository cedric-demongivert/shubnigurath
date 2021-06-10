import { Investigator } from './Investigator'

/**
 * 
 */
export class Mutables {
  /**
   * 
   */
  public readonly temporaryInsane: boolean

  /**
   * 
   */
  public readonly indefinitelyInsane: boolean

  /**
   * 
   */
  public readonly majorWound: boolean

  /**
   * 
   */
  public readonly health: number

  /**
   * 
   */
  public readonly mentalHealth: number

  /**
   * 
   */
  public readonly magic: number

  /**
   * 
   */
  public readonly luck: number

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
      health: investigator.maximumHP,
      mentalHealth: investigator.characteristics.power.sum(),
      magic: investigator.maximumMP,
      luck: investigator.characteristics.luck.sum()
    })
  }

  /**
   * 
   */
  private constructor(properties: Mutables.Properties) {
    this.temporaryInsane = properties.temporaryInsane || false
    this.indefinitelyInsane = properties.indefinitelyInsane || false
    this.majorWound = properties.majorWound || false
    this.health = properties.health || 0
    this.mentalHealth = properties.mentalHealth || 0
    this.magic = properties.magic || 0
    this.luck = properties.luck || 0
  }

  /**
   * 
   */
  public equals(other: any) {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Mutables) {
      return (
        other.temporaryInsane === this.temporaryInsane &&
        other.indefinitelyInsane === this.indefinitelyInsane &&
        other.majorWound === this.majorWound &&
        other.health === this.health &&
        other.mentalHealth === this.mentalHealth &&
        other.magic === this.magic &&
        other.luck === this.luck
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
    readonly temporaryInsane?: boolean | undefined,

    /**
     * 
     */
    readonly indefinitelyInsane?: boolean | undefined,

    /**
     * 
     */
    readonly majorWound?: boolean | undefined,

    /**
     * 
     */
    readonly health?: number | undefined,

    /**
     * 
     */
    readonly mentalHealth?: number | undefined,

    /**
     * 
     */
    readonly magic?: number | undefined,

    /**
     * 
     */
    readonly luck?: number | undefined
  }
}