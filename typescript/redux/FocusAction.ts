/**
 * 
 */
export type FocusAction = (
  FocusAction.FOCUS |
  FocusAction.BLUR
)

/**
 *
 */
export namespace FocusAction {
  /**
   * 
   */
  export type FOCUS = 'focus:focus'

  /**
   * 
   */
  export const FOCUS: FOCUS = 'focus:focus'

  /**
   * 
   */
  export type BLUR = 'focus:blur'

  /**
   * 
   */
  export const BLUR: BLUR = 'focus:blur'

  /**
   * 
   */
  export const ALL: FocusAction[] = [
    FOCUS,
    BLUR
  ]
}