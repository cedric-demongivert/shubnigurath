/**
 * 
 */
export class Name {
  /**
  *
  */
  public readonly first: string

  /**
  *
  */
  public readonly last: string

  /**
  *
  */
  public readonly short: string | undefined

  /**
  *
  */
  public static create(properties: Name.Properties): Name {
    return new Name(properties)
  }

  /**
  *
  */
  private constructor(properties: Name.Properties) {
    this.first = properties.first
    this.last = properties.last
    this.short = properties.short
  }

  /**
   * 
   */
  public toString(): string {
    let result: string = this.first + ' ' + this.last

    return this.short == null ? result : result + ' (' + this.short + ')'
  }

  /**
  *
  */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Name) {
      return (
        this.first === other.first &&
        this.last === other.last &&
        this.short === other.short
      )
    }

    return false
  }
}

export namespace Name {
  /**
  *
  */
  export type Properties = {
    /**
    *
    */
    first: string,

    /**
    *
    */
    last: string,

    /**
    *
    */
    short?: string | undefined
  }
}
