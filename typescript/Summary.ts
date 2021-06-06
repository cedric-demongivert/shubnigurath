import { Gender } from './Gender'
import { Address } from './Address'
import { Name } from './Name'

export class Summary {
  /**
  *
  */
  public readonly name: Name

  /**
  *
  */
  public readonly alias: string

  /**
  *
  */
  public readonly job: string

  /**
  *
  */
  public readonly matricule: string

  /**
  *
  */
  public readonly gender: Gender

  /**
  *
  */
  public readonly age: number

  /**
  *
  */
  public readonly birthdate: Date

  /**
  *
  */
  public readonly hiringdate: Date

  /**
  *
  */
  public readonly birthplace: Address

  /**
  *
  */
  public readonly home: Address

  /**
   * 
   */
  public static create(properties: Summary.Properties): Summary {
    return new Summary(properties)
  }

  /**
   * 
   */
  private constructor(properties: Summary.Properties) {
    this.name = properties.name
    this.alias = properties.alias
    this.job = properties.job
    this.matricule = properties.matricule
    this.gender = properties.gender
    this.age = properties.age
    this.birthdate = properties.birthdate
    this.hiringdate = properties.hiringdate
    this.birthplace = properties.birthplace
    this.home = properties.home
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Summary) {
      return (
        other.name === this.name &&
        other.alias === this.alias &&
        other.job === this.job &&
        other.matricule === this.matricule &&
        other.gender === this.gender &&
        other.age === this.age &&
        other.birthdate.valueOf() === this.birthdate.valueOf() &&
        other.hiringdate.valueOf() === this.hiringdate.valueOf() &&
        other.birthplace.equals(this.birthplace) &&
        other.home.equals(this.home)
      )
    }

    return false
  }
}

export namespace Summary {
  /**
   * 
   */
  export type Properties = {
    /**
    *
    */
    readonly name: Name

    /**
    *
    */
    readonly alias: string

    /**
    *
    */
    readonly job: string

    /**
    *
    */
    readonly matricule: string

    /**
    *
    */
    readonly gender: Gender

    /**
    *
    */
    readonly age: number

    /**
    *
    */
    readonly birthdate: Date

    /**
    *
    */
    readonly hiringdate: Date

    /**
    *
    */
    readonly birthplace: Address

    /**
    *
    */
    readonly home: Address
  }
}