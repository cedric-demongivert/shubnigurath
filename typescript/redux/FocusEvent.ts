import { FocusAction } from './FocusAction'
import { ApplicationEvent } from './ApplicationEvent'

/**
 * 
 */
export type FocusEvent = (
  FocusEvent.Focus |
  FocusEvent.Blur
)

/**
 *
 */
export namespace FocusEvent {
  /**
   * 
   */
  export type Focus = ApplicationEvent<FocusAction.FOCUS>

  /**
   * 
   */
  export type Blur = ApplicationEvent<FocusAction.BLUR>

  /**
   * 
   */
  const FOCUS: Focus = Object.seal(ApplicationEvent.create(FocusAction.FOCUS))

  /**
   * 
   */
  const BLUR: Blur = Object.seal(ApplicationEvent.create(FocusAction.BLUR))

  /**
   * 
   */
  export function focus(): Focus {
    return FOCUS
  }

  /**
   * 
   */
  export function blur(): Blur {
    return BLUR
  }
}