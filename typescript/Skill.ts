/**
 * 
 */
export class Skill {
  /**
  *
  */
  public readonly family: string

  /**
  *
  */
  public readonly specialization: string | undefined

  /**
   * 
   */
  public static create(properties: Skill.Properties): Skill {
    return new Skill(properties)
  }

  /**
   * 
   */
  private constructor(properties: Skill.Properties) {
    this.family = properties.family
    this.specialization = properties.specialization
  }

  /**
   * 
   */
  public toString(): string {
    return this.family + (this.specialization ? ' (' + this.specialization + ')' : '')
  }

  /**
  *
  */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Skill) {
      return (
        other.family === this.family &&
        other.specialization === this.specialization
      )
    }

    return false
  }
}

/**
 * 
 */
export namespace Skill {
  /**
   * 
   */
  export function compare(left: Skill, right: Skill): number {
    const family: number = left.family.localeCompare(right.family)

    if (family === 0) {
      if (left.specialization === undefined) {
        return right.specialization === undefined ? 0 : 1
      } else if (right.specialization === undefined) {
        return -1
      } else {
        return left.specialization.localeCompare(right.specialization)
      }
    } else {
      return family
    }
  }

  /**
   * 
   */
  export type Properties = {
    /**
    *
    */
    readonly family: string,

    /**
    *
    */
    readonly specialization?: string | undefined
  }

  /**
   * 
   */
  export const ACCOUNTING: Skill = Skill.create({ family: 'Comptabilité' })

  /**
   * 
   */
  export const ANTHROPOLOGY: Skill = Skill.create({ family: 'Anthropologie' })

  /**
   * 
   */
  export const APPRAISE: Skill = Skill.create({ family: 'Estimation' })

  /**
   * 
   */
  export const ARCHAEOLOGY: Skill = Skill.create({ family: 'Archéologie' })

  /**
   * 
   */
  export const CRAFT: Skill = Skill.create({ family: 'Arts et métiers' })

  /**
   * 
   */
  export const CHARM: Skill = Skill.create({ family: 'Charme' })

  /**
   * 
   */
  export const CLIMB: Skill = Skill.create({ family: 'Grimper' })

  /**
   * 
   */
  export const CREDIT_RATING: Skill = Skill.create({ family: 'Crédit' })

  /**
   * 
   */
  export const CTHULHU_MYTHOS: Skill = Skill.create({ family: 'Mythe de Cthulhu' })

  /**
   * 
   */
  export const DISGUISE: Skill = Skill.create({ family: 'Imposture' })

  /**
   * 
   */
  export const DODGE: Skill = Skill.create({ family: 'Esquive' })

  /**
   * 
   */
  export const DRIVE_AUTO: Skill = Skill.create({ family: 'Conduite' })

  /**
   * 
   */
  export const ELECTRIC_REPAIR: Skill = Skill.create({ family: 'Électricité' })

  /**
   * 
   */
  export const FAST_TALK: Skill = Skill.create({ family: 'Baratin' })

  /**
   * 
   */
  export const FIGHTING: Skill = Skill.create({ family: 'Corps à corps' })

  /**
   * 
   */
  export const HANDGUNS: Skill = Skill.create({ family: 'Armes de poing' })

  /**
   * 
   */
  export const GUNS: Skill = Skill.create({ family: 'Fusils' })

  /**
   * 
   */
  export const SUBMACHINE_GUNS: Skill = Skill.create({ family: 'Mitraillettes' })

  /**
   * 
   */
  export const FIRST_AID: Skill = Skill.create({ family: 'Premiers soins' })

  /**
   * 
   */
  export const HISTORY: Skill = Skill.create({ family: 'Histoire' })

  /**
   * 
   */
  export const INTIMIDATE: Skill = Skill.create({ family: 'Intimidation' })

  /**
   * 
   */
  export const JUMP: Skill = Skill.create({ family: 'Sauter' })

  /**
   * 
   */
  export const NATIVE_LANGUAGE: Skill = Skill.create({ family: 'Langues', specialization: 'Maternelle' })

  /**
   * 
   */
  export const OTHER_LANGUAGE: Skill = Skill.create({ family: 'Langues', specialization: 'Autre' })

  /**
   * 
   */
  export const LAW: Skill = Skill.create({ family: 'Droit' })

  /**
   * 
   */
  export const LIBRARY_USE: Skill = Skill.create({ family: 'Bibliothèque' })

  /**
   * 
   */
  export const LISTEN: Skill = Skill.create({ family: 'Écouter' })

  /**
   * 
   */
  export const LOCKSMITH: Skill = Skill.create({ family: 'Crochetage' })

  /**
   * 
   */
  export const MECHANICAL_REPAIR: Skill = Skill.create({ family: 'Méchanique' })

  /**
   * 
   */
  export const MEDICINE: Skill = Skill.create({ family: 'Médecine' })

  /**
   * 
   */
  export const NATURAL_WORLD: Skill = Skill.create({ family: 'Naturalisme' })

  /**
   * 
   */
  export const NAVIGATE: Skill = Skill.create({ family: 'Orientation' })

  /**
   * 
   */
  export const OCCULT: Skill = Skill.create({ family: 'Occultisme' })

  /**
   * 
   */
  export const OPERATE_HEAVY_MACHINERY: Skill = Skill.create({ family: 'Conduite engin lourd' })

  /**
   * 
   */
  export const PERSUADE: Skill = Skill.create({ family: 'Persuasion' })

  /**
   * 
   */
  export const PILOT: Skill = Skill.create({ family: 'Pilotage' })

  /**
   * 
   */
  export const PSYCHOLOGY: Skill = Skill.create({ family: 'Psychologie' })

  /**
   * 
   */
  export const PSYCHOANALYSIS: Skill = Skill.create({ family: 'Psychanalyse' })

  /**
   * 
   */
  export const RIDE: Skill = Skill.create({ family: 'Équitation' })

  /**
   * 
   */
  export const SCIENCE: Skill = Skill.create({ family: 'Sciences' })

  /**
   * 
   */
  export const SLEIGHT_OF_HAND: Skill = Skill.create({ family: 'Pickpocket' })

  /**
   * 
   */
  export const SPOT_HIDDEN: Skill = Skill.create({ family: 'Trouver objet caché' })

  /**
   * 
   */
  export const STEALTH: Skill = Skill.create({ family: 'Discrétion' })

  /**
   * 
   */
  export const SURVIVAL: Skill = Skill.create({ family: 'Survie' })

  /**
   * 
   */
  export const SWIM: Skill = Skill.create({ family: 'Nager' })

  /**
   * 
   */
  export const THROW: Skill = Skill.create({ family: 'Lancer' })

  /**
   * 
   */
  export const TRACK: Skill = Skill.create({ family: 'Pister' })
}
