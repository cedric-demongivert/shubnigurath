/**
 * 
 */
export class Modifier {
  /**
   * 
   */
  public readonly label: string

  /**
   * 
   */
  public readonly value: number

  /**
   * 
   */
  public static create(properties: Modifier.Properties): Modifier {
    return new Modifier(properties)
  }

  /**
   * 
   */
  private constructor(properties: Modifier.Properties) {
    this.label = properties.label
    this.value = properties.value
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Modifier) {
      return (
        other.label === this.label &&
        other.value === this.value
      )
    }

    return false
  }
}

export namespace Modifier {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    label: string,

    /**
     * 
     */
    value: number
  }
}