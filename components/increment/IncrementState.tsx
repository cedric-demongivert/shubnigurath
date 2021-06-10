/**
 * 
 */
export type IncrementState = (
  IncrementState.SLEEPING |
  IncrementState.RUNNING |
  IncrementState.RESOLVED
)

/**
 * 
 */
export namespace IncrementState {
  /**
   * 
   */
  export type SLEEPING = 0

  /**
   * 
   */
  export const SLEEPING: SLEEPING = 0

  /**
   * 
   */
  export type RUNNING = 1

  /**
   * 
   */
  export const RUNNING: RUNNING = 1

  /**
   * 
   */
  export type RESOLVED = 2

  /**
   * 
   */
  export const RESOLVED: RESOLVED = 2

  /**
   * 
   */
  export const ALL: IncrementState[] = [
    SLEEPING,
    RUNNING,
    RESOLVED
  ]

  /**
   * 
   */
  const FROM_RANGE_LOOKUP: Uint8Array = new Uint8Array([
    SLEEPING, //0b0
    RUNNING, //0b1
    SLEEPING, //0b10
    RESOLVED //0b11
  ])

  /**
   * 
   */
  export function fromRange(since: number | undefined, until: number | undefined) : IncrementState {
    return FROM_RANGE_LOOKUP[(since == null ? 0 : 0b1) | (until == null ? 0 : 0b10)] as IncrementState
  }

  /**
   * 
   */
  export function toString (state: IncrementState): string | undefined {
    switch(state) {
      case SLEEPING: return 'SLEEPING'
      case RUNNING: return 'RUNNING'
      case RESOLVED: return 'RESOLVED'
      default: return undefined
    }
  }

  /**
   * 
   */
  export function toDebugString (state: IncrementState): string | undefined {
    return 'IncrementState #' + state + ' (' + (toString(state) || 'undefined') + ')'
  }
}