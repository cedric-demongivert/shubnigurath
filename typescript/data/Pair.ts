import { equals } from '../utils/equals'

/**
 * 
 */
export class Pair<Left, Right> {
  /**
   * 
   */
  public readonly left: Left

  /**
   * 
   */
  public readonly right: Right

  /**
   * 
   */
  public static create<Left, Right>(left: Left, right: Right): Pair<Left, Right> {
    return new Pair(left, right)
  }

  /**
   * 
   */
  private constructor(left: Left, right: Right) {
    this.left = left
    this.right = right
  }

  /**
   * 
   */
  public equals(other: any) {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Pair) {
      return (
        equals(other.left, this.left) &&
        equals(other.right, this.right)
      )
    }

    return false
  }
}