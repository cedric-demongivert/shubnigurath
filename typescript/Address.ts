/**
 * 
 */
export class Address {
  /**
  *
  */
  public readonly country: string

  /**
  *
  */
  public readonly state: string | undefined

  /**
  *
  */
  public readonly county: string | undefined

  /**
  *
  */
  public readonly city: string | undefined

  /**
  *
  */
  public readonly district: string | undefined

  /**
  *
  */
  public readonly street: string | undefined

  /**
   * 
   */
  public static create(properties: Address.Properties): Address {
    return new Address(properties)
  }

  /**
  *
  */
  private constructor(properties: Address.Properties) {
    this.country = properties.country
    this.state = properties.state
    this.county = properties.county
    this.city = properties.city
    this.district = properties.district
    this.street = properties.street
  }

  /**
   * 
   */
  public toString(): string {
    let result: string = this.country

    if (this.state != null) { result = this.state + ', ' + result }
    if (this.county != null) { result = this.county + ', ' + result }
    if (this.city != null) { result = this.city + ', ' + result }
    if (this.district != null) { result = this.district + ', ' + result }
    if (this.street != null) { result = this.street + ', ' + result }

    return result
  }

  /**
  *
  */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Address) {
      return (
        other.state === this.state &&
        other.country === this.country &&
        other.county === this.county &&
        other.city === this.city &&
        other.district === this.district &&
        other.street === this.street
      )
    }

    return false
  }
}

/**
*
*/
export namespace Address {
  /**
  *
  */
  export type Properties = {
    /**
    *
    */
    country: string,

    /**
    *
    */
    state?: string | undefined

    /**
    *
    */
    county?: string | undefined

    /**
    *
    */
    city?: string | undefined

    /**
    *
    */
    district?: string | undefined

    /**
    *
    */
    street?: string | undefined
  }
}
