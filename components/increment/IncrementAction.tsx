/**
 * 
 */
export type IncrementAction = (
  IncrementAction.FIRST |
  IncrementAction.NEXT |
  IncrementAction.LAST
)

/**
 * 
 */
export namespace IncrementAction {
  /**
   * 
   */
  export type FIRST = 'increment:first'

  /**
   * 
   */
  export const FIRST : FIRST = 'increment:first'

  /**
   * 
   */
  export type NEXT = 'increment:next'

  /**
   * 
   */
  export const NEXT : NEXT = 'increment:next'

  /**
   * 
   */
  export type LAST = 'increment:last'

  /**
   * 
   */
  export const LAST : LAST = 'increment:last'

  /**
   * 
   */
  export const ALL: IncrementAction[] = [
    FIRST, 
    NEXT, 
    LAST
  ]
}