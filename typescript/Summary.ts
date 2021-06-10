import { Gender } from './Gender'
import { Address } from './Address'
import { Name } from './Name'
import { Empty } from './utils'

export class Summary {
  /**
  *
  */
  public readonly name: Name | undefined

  /**
  *
  */
  public readonly alias: string | undefined

  /**
  *
  */
  public readonly job: string | undefined

  /**
  *
  */
  public readonly matricule: string | undefined

  /**
  *
  */
  public readonly gender: Gender | undefined

  /**
  *
  */
  public readonly age: number

  /**
  *
  */
  public readonly birthdate: string | undefined

  /**
  *
  */
  public readonly hiringdate: string | undefined

  /**
  *
  */
  public readonly birthplace: Address | undefined

  /**
  *
  */
  public readonly home: Address | undefined

  /**
   * 
   */
  public static readonly EMPTY: Summary = new Summary()

  /**
   * 
   */
  public static empty(): Summary {
    return Summary.EMPTY
  }

  /**
   * 
   */
  public static create(properties: Summary.Properties = Empty.OBJECT): Summary {
    return properties === Empty.OBJECT ? Summary.EMPTY : new Summary(properties)
  }

  /**
   * 
   */
  private constructor(properties: Summary.Properties = Empty.OBJECT) {
    this.name = properties.name
    this.alias = properties.alias
    this.job = properties.job
    this.matricule = properties.matricule
    this.gender = properties.gender
    this.age = properties.age || 0
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
    name?: Name | undefined

    /**
    *
    */
    alias?: string | undefined

    /**
    *
    */
    job?: string | undefined

    /**
    *
    */
    matricule?: string | undefined

    /**
    *
    */
    gender?: Gender | undefined

    /**
    *
    */
    age?: number | undefined

    /**
    *
    */
    birthdate?: string | undefined

    /**
    *
    */
    hiringdate?: string | undefined

    /**
    *
    */
    birthplace?: Address | undefined

    /**
    *
    */
    home?: Address | undefined
  }
}