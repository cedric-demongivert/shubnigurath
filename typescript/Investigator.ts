import { Summary } from './Summary'
import { CharacteristicSet } from './CharacteristicSet'
import { SkillSet } from './SkillSet'
import { Value } from './Value'
import { Modifier } from './Modifier'
import { List } from 'immutable'
import { Pair } from './data'
import { Skill } from './Skill'
import { Empty } from './utils'
import { Mutables } from './Mutables'

/**
 * 
 */
export class Investigator {
  /**
  *
  */
  public readonly summary: Summary

  /**
  *
  */
  public readonly characteristics: CharacteristicSet

  /**
   * 
   */
  public readonly skills: SkillSet

  /**
   * 
   */
  public readonly mutables: Mutables

  /**
   * 
   */
  public get maximumHP(): number {
    const characteristics: CharacteristicSet = this.characteristics

    const size: number = characteristics.size.sum()
    const constitution: number = characteristics.constitution.sum()

    return ((size + constitution) / 10) << 0
  }

  /**
   * 
   */
  public get maximumMP(): number {
    return this.characteristics.power.fifth()
  }

  /**
   * 
   */
  public get movement(): Value {
    const characteristics: CharacteristicSet = this.characteristics

    const size: number = characteristics.size.sum()
    const strength: number = characteristics.strength.sum()
    const dexterity: number = characteristics.dexterity.sum()

    const age: number = this.summary.age

    let base: number = 0

    if (strength < size && dexterity < size) {
      base = 7
    } else if (strength > size && dexterity > size) {
      base = 9
    } else {
      base = 8
    }

    if (age > 39) {
      return Value.create({
        base,
        modifiers: List.of(
          Modifier.create({
            value: Math.max(((age / 10) << 0) - 3, 0),
            label: 'Âge supérieur à ' + ((age / 10) << 0).toString() + ' ans'
          })
        )
      })
    } else {
      return Value.create(base)
    }
  }

  /**
   * 
   */
  public get impact(): string {
    const characteristics: CharacteristicSet = this.characteristics

    const size: number = characteristics.size.sum()
    const strength: number = characteristics.strength.sum()

    const score: number = size + strength

    if (score < 65) {
      return '-2'
    } else if (score < 85) {
      return '-1'
    } else if (score < 125) {
      return '0'
    } else if (score < 165) {
      return '+1D4'
    } else if (score < 205) {
      return '+1D6'
    } else {
      return '+' + (2 + ((score - 205) / 80) << 0) + 'D6'
    }
  }

  /**
   * 
   */
  public get carrure(): number {
    const characteristics: CharacteristicSet = this.characteristics

    const size: number = characteristics.size.sum()
    const strength: number = characteristics.strength.sum()

    const score: number = size + strength

    if (score < 65) {
      return -2
    } else if (score < 85) {
      return -1
    } else if (score < 125) {
      return 0
    } else if (score < 165) {
      return +1
    } else if (score < 205) {
      return +2
    } else {
      return (2 + ((score - 205) / 80) << 0)
    }
  }

  /**
   * 
   */
  public static readonly EMPTY: Investigator = new Investigator()

  /**
   * 
   */
  public static empty(): Investigator {
    return Investigator.EMPTY
  }

  /**
   * 
   */
  public static create(properties: Investigator.Properties = Empty.OBJECT): Investigator {
    return properties === Empty.OBJECT ? Investigator.EMPTY : new Investigator(properties)
  }

  /**
   * 
   */
  private constructor(properties: Investigator.Properties = Empty.OBJECT) {
    this.summary = properties.summary || Summary.empty()
    this.characteristics = properties.characteristics || CharacteristicSet.empty()
    this.skills = properties.skills || SkillSet.empty()
    this.mutables = properties.mutables || Mutables.fromInvestigator(this)
  }

  /**
   * 
   */
  public computeDefaultSkills(): SkillSet {
    return SkillSet.create([
      Pair.create(Skill.ACCOUNTING, Value.create(5)),
      Pair.create(Skill.ANTHROPOLOGY, Value.create(1)),
      Pair.create(Skill.APPRAISE, Value.create(5)),
      Pair.create(Skill.ARCHAEOLOGY, Value.create(1)),
      Pair.create(Skill.CRAFT, Value.create(5)),
      Pair.create(Skill.CHARM, Value.create(15)),
      Pair.create(Skill.CLIMB, Value.create(20)),
      Pair.create(Skill.CREDIT_RATING, Value.create(0)),
      Pair.create(Skill.CTHULHU_MYTHOS, Value.create(0)),
      Pair.create(Skill.DISGUISE, Value.create(5)),
      Pair.create(Skill.DODGE, Value.create(this.characteristics.dexterity.half())),
      Pair.create(Skill.DRIVE_AUTO, Value.create(20)),
      Pair.create(Skill.ELECTRIC_REPAIR, Value.create(10)),
      Pair.create(Skill.FAST_TALK, Value.create(5)),
      Pair.create(Skill.FIGHTING, Value.create(25)),
      Pair.create(Skill.HANDGUNS, Value.create(20)),
      Pair.create(Skill.GUNS, Value.create(25)),
      Pair.create(Skill.SUBMACHINE_GUNS, Value.create(15)),
      Pair.create(Skill.FIRST_AID, Value.create(30)),
      Pair.create(Skill.HISTORY, Value.create(5)),
      Pair.create(Skill.INTIMIDATE, Value.create(15)),
      Pair.create(Skill.JUMP, Value.create(20)),
      Pair.create(Skill.NATIVE_LANGUAGE, Value.create(this.characteristics.education.sum())),
      Pair.create(Skill.OTHER_LANGUAGE, Value.create(1)),
      Pair.create(Skill.LAW, Value.create(5)),
      Pair.create(Skill.LIBRARY_USE, Value.create(20)),
      Pair.create(Skill.LISTEN, Value.create(20)),
      Pair.create(Skill.LOCKSMITH, Value.create(1)),
      Pair.create(Skill.MECHANICAL_REPAIR, Value.create(10)),
      Pair.create(Skill.MEDICINE, Value.create(1)),
      Pair.create(Skill.NATURAL_WORLD, Value.create(10)),
      Pair.create(Skill.NAVIGATE, Value.create(10)),
      Pair.create(Skill.OCCULT, Value.create(5)),
      Pair.create(Skill.OPERATE_HEAVY_MACHINERY, Value.create(1)),
      Pair.create(Skill.PERSUADE, Value.create(10)),
      Pair.create(Skill.PILOT, Value.create(1)),
      Pair.create(Skill.PSYCHOLOGY, Value.create(10)),
      Pair.create(Skill.PSYCHOANALYSIS, Value.create(1)),
      Pair.create(Skill.RIDE, Value.create(5)),
      Pair.create(Skill.SCIENCE, Value.create(1)),
      Pair.create(Skill.SLEIGHT_OF_HAND, Value.create(10)),
      Pair.create(Skill.SPOT_HIDDEN, Value.create(25)),
      Pair.create(Skill.STEALTH, Value.create(20)),
      Pair.create(Skill.SURVIVAL, Value.create(10)),
      Pair.create(Skill.SWIM, Value.create(20)),
      Pair.create(Skill.THROW, Value.create(20)),
      Pair.create(Skill.TRACK, Value.create(10))
    ])
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Investigator) {
      return (
        other.summary.equals(this.summary) &&
        other.characteristics.equals(this.characteristics) &&
        other.skills.equals(this.skills)
      )
    }

    return false
  }
}

export namespace Investigator {
  /**
   * 
   */
  export type Properties = {
    /**
     *
     */
    summary?: Summary | undefined,

    /**
     *
     */
    characteristics?: CharacteristicSet | undefined,

    /**
     *
     */
    skills?: SkillSet | undefined,

    /**
     *
     */
    mutables?: Mutables | undefined
  }
}