/**
 * 
 */
export type LoadingPageState = (
  LoadingPageState.INITIAL |
  LoadingPageState.LOADING |
  LoadingPageState.FAILURE |
  LoadingPageState.RESOLVED
)

/**
 * 
 */
export namespace LoadingPageState {
  /**
   * 
   */
  export type INITIAL = 0

  /**
   * 
   */
  export const INITIAL : INITIAL = 0

  /**
   * 
   */
  export type LOADING = 1

  /**
   * 
   */
  export const LOADING : LOADING = 1

  /**
   * 
   */
  export type FAILURE = 2

  /**
   * 
   */
  export const FAILURE : FAILURE = 2

  /**
   * 
   */
  export type RESOLVED = 3

  /**
   * 
   */
  export const RESOLVED : RESOLVED = 3

  /**
   * 
   */
  export const ALL: LoadingPageState[] = [
    INITIAL,
    LOADING,
    FAILURE,
    RESOLVED
  ]

  /**
   * 
   */
  export function toString(state: LoadingPageState): string | undefined {
    switch (state) {
      case INITIAL: return 'INITIAL'
      case LOADING: return 'LOADING'
      case FAILURE: return 'FAILURE'
      case RESOLVED: return 'RESOLVED'
      default: return undefined
    }
  }
  /**
   * 
   */
  export function toDebugString(state: LoadingPageState): string | undefined {
    return 'LoadingPageState #' + state + '(' + (toString(state) || 'undefined') + ')'
  }
}