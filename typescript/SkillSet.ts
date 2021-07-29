import { List } from 'immutable'

import { Pair } from './data/Pair'
import { bissect } from './data/bissect'

import { Skill } from './Skill'
import { Value } from './Value'

/**
 * 
 */
function comparePair(left: Pair<Skill, Value>, right: Pair<Skill, Value>) {
  return Skill.compare(left.left, right.left)
}

/**
 * 
 */
function compareSkillWithPair(left: Skill, right: Pair<Skill, Value>) {
  return Skill.compare(left, right.left)
}

/**
 * 
 */
export class SkillSet {
  /**
   * 
   */
  public readonly entries: List<Pair<Skill, Value>>

  /**
   * 
   */
  public static EMPTY: SkillSet = new SkillSet(List())

  /**
   * 
   */
  public static empty(): SkillSet {
    return SkillSet.EMPTY
  }

  /**
   * 
   */
  public static create(entries: Iterable<Pair<Skill, Value>>): SkillSet {
    const result: List<Pair<Skill, Value>> = List<Pair<Skill, Value>>().asMutable()

    for (const entry of entries) {
      result.push(entry)
    }

    return result.size > 0 ? new SkillSet(result.sort(comparePair).asImmutable()) : SkillSet.EMPTY
  }

  /**
   * 
   */
  public static wrap(entries: List<Pair<Skill, Value>>): SkillSet {
    return new SkillSet(entries)
  }

  /**
   * 
   */
  private constructor(entries: List<Pair<Skill, Value>>) {
    this.entries = entries
  }

  /**
   * 
   */
  public indexOf(skill: Skill): number {
    return bissect.list(this.entries, skill, compareSkillWithPair)
  }

  /**
   * 
   */
  public has(skill: Skill): boolean {
    return this.indexOf(skill) > -1
  }

  /**
   * 
   */
  public get(skill: Skill): Value {
    const index: number = this.indexOf(skill)
    return index < 0 ? Value.zero() : this.entries.get(index).right
  }

  /**
   * 
   */
  public delete(skill: Skill): SkillSet {
    const index: number = this.indexOf(skill)

    if (index < 0) {
      return this
    } else {
      return new SkillSet(this.entries.delete(index))
    }
  }

  /**
   * 
   */
  public set(skill: Skill, value: Value): SkillSet {
    const index: number = this.indexOf(skill)

    if (index < 0) {
      return new SkillSet(this.entries.insert(-index - 1, Pair.create(skill, value)))
    } else {
      return new SkillSet(this.entries.set(index, Pair.create(skill, value)))
    }
  }

  /**
   * 
   */
  public minus(other: SkillSet): SkillSet {
    const result: List<Pair<Skill, Value>> = List<Pair<Skill, Value>>().asMutable()

    let ourCursor: number = 0
    let otherCursor: number = 0

    const ourEntries: List<Pair<Skill, Value>> = this.entries
    const otherEntries: List<Pair<Skill, Value>> = other.entries

    while (ourCursor < ourEntries.size) {
      const ourEntry: Pair<Skill, Value> = ourEntries.get(ourCursor)

      while (otherCursor < otherEntries.size && comparePair(otherEntries.get(otherCursor), ourEntry) < 0) {
        otherCursor += 1
      }

      if (otherCursor < otherEntries.size && comparePair(otherEntries.get(otherCursor), ourEntry) === 0) {
        otherCursor += 1
      } else {
        result.push(ourEntry)
      }

      ourCursor += 1
    }

    return new SkillSet(result.asImmutable())
  }

  /**
   * 
   */
  public assign(other: SkillSet): SkillSet {
    const result: List<Pair<Skill, Value>> = List<Pair<Skill, Value>>().asMutable()

    let ourCursor: number = 0
    let otherCursor: number = 0

    const ourEntries: List<Pair<Skill, Value>> = this.entries
    const otherEntries: List<Pair<Skill, Value>> = other.entries

    while (ourCursor < ourEntries.size) {
      const ourEntry: Pair<Skill, Value> = ourEntries.get(ourCursor)

      while (otherCursor < otherEntries.size && comparePair(otherEntries.get(otherCursor), ourEntry) < 0) {
        result.push(otherEntries.get(otherCursor))
        otherCursor += 1
      }

      if (otherCursor < otherEntries.size && comparePair(otherEntries.get(otherCursor), ourEntry) === 0) {
        result.push(otherEntries.get(otherCursor))
        otherCursor += 1
      } else {
        result.push(ourEntry)
      }

      ourCursor += 1
    }

    while (otherCursor < otherEntries.size) {
      result.push(otherEntries.get(otherCursor))
      otherCursor += 1
    }

    return new SkillSet(result.asImmutable())
  }

  /**
   * 
   */
  public inherit(other: SkillSet): SkillSet {
    const result: List<Pair<Skill, Value>> = List<Pair<Skill, Value>>().asMutable()

    let ourCursor: number = 0
    let otherCursor: number = 0

    const ourEntries: List<Pair<Skill, Value>> = this.entries
    const otherEntries: List<Pair<Skill, Value>> = other.entries

    while (ourCursor < ourEntries.size) {
      const ourEntry: Pair<Skill, Value> = ourEntries.get(ourCursor)

      while (otherCursor < otherEntries.size && comparePair(otherEntries.get(otherCursor), ourEntry) < 0) {
        otherCursor += 1
      }

      if (otherCursor < otherEntries.size && comparePair(otherEntries.get(otherCursor), ourEntry) === 0) {
        if (ourEntry.right.base == null) {
          result.push(Pair.create(
            ourEntry.left,
            Value.create({
              base: otherEntries.get(otherCursor).right.base,
              modifiers: ourEntry.right.modifiers
            })
          ))
        } else {
          result.push(ourEntry)
        }
        otherCursor += 1
      } else {
        result.push(ourEntry)
      }

      ourCursor += 1
    }

    return new SkillSet(result.asImmutable())
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof SkillSet) {
      return other.entries.equals(this.entries)
    }

    return false
  }
}