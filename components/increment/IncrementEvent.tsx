import { IncrementAction } from './IncrementAction'

/**
 * 
 */
export type IncrementEvent = { 
  /**
   * 
   */
  readonly type: IncrementAction, 

  /**
   * 
   */
  readonly payload: number 
}

/**
 * 
 */
export namespace IncrementEvent {
  /**
   * 
   */
  export type First = {
    /**
     * 
     */
    readonly type: IncrementAction.FIRST, 
  
    /**
     * 
     */
    readonly payload: number 
  }

  /**
   * 
   */
  export type Next = {
    /**
     * 
     */
    readonly type: IncrementAction.NEXT, 
  
    /**
     * 
     */
    readonly payload: number 
  }

  /**
   * 
   */
  export type Last = {
    /**
     * 
     */
    readonly type: IncrementAction.LAST, 
  
    /**
     * 
     */
    readonly payload: number 
  }

  /**
   * 
   */
  export function first(payload: number): IncrementEvent.First {
    return Object.seal({ type: IncrementAction.FIRST, payload })
  }

  /**
   * 
   */
  export function next(payload: number): IncrementEvent.Next {
    return Object.seal({ type: IncrementAction.NEXT, payload })
  }

  /**
   * 
   */
  export function last(payload: number): IncrementEvent.Last {
    return Object.seal({ type: IncrementAction.LAST, payload })
  }
}