/**
 * 
 */
export type HomePageState = (
  HomePageState.LOADING |
  HomePageState.INVESTIGATOR
)

/**
 * 
 */
export namespace HomePageState {
  /**
   * 
   */
  export type LOADING = 0

  /**
   * 
   */
  export const LOADING : LOADING = 0

  /**
   * 
   */
  export type INVESTIGATOR = 1

  /**
   * 
   */
  export const INVESTIGATOR : INVESTIGATOR = 1

  /**
   * 
   */
  export const ALL: HomePageState[] = [
    LOADING,
    INVESTIGATOR
  ]

  /**
   * 
   */
  export function toString(state: HomePageState): string | undefined {
    switch (state) {
      case LOADING: return 'LOADING'
      case INVESTIGATOR: return 'INVESTIGATOR'
      default: return undefined
    }
  }
  /**
   * 
   */
  export function toDebugString(state: HomePageState): string | undefined {
    return 'HomePageState #' + state + '(' + (toString(state) || 'undefined') + ')'
  }
}