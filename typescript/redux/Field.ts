/**
 * 
 */
export class Field<Value> {
  /**
   * 
   */
  public readonly focus: boolean

  /**
   * 
   */
  public readonly value: Value

  /**
   * 
   */
  public static create<Value = any>(properties: Field.Properties<Value>): Field<Value> {
    return new Field(properties)
  }

  /**
   * 
   */
  private constructor(properties: Field.Properties<Value>) {
    this.focus = properties.focus || false
    this.value = properties.value
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Field) {
      return (
        other.focus === this.focus &&
        other.value === this.value
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace Field {
  /**
   * 
   */
  export type Properties<Value> = {
    /**
     * 
     */
    readonly focus?: boolean | undefined,

    /**
     * 
     */
    readonly value: Value
  }
}