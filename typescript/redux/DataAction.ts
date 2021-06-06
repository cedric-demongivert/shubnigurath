/**
 * 
 */
export type DataAction = (
  DataAction.CHANGE |
  DataAction.TOGGLE |
  DataAction.INCREMENT |
  DataAction.DECREMENT
)

/**
 *
 */
export namespace DataAction {
  /**
   * 
   */
  export type CHANGE = 'data:change'

  /**
   * 
   */
  export const CHANGE: CHANGE = 'data:change'

  /**
   * 
   */
  export type TOGGLE = 'data:toggle'

  /**
   * 
   */
  export const TOGGLE: TOGGLE = 'data:toggle'

  /**
   * 
   */
  export type INCREMENT = 'data:increment'

  /**
   * 
   */
  export const INCREMENT: INCREMENT = 'data:increment'

  /**
   * 
   */
  export type DECREMENT = 'data:decrement'

  /**
   * 
   */
  export const DECREMENT: DECREMENT = 'data:decrement'

  /**
   * 
   */
  export const ALL: DataAction[] = [
    CHANGE,
    TOGGLE,
    INCREMENT,
    DECREMENT
  ]
}