import { DataAction } from "./DataAction"
import { FocusAction } from "./FocusAction"

/**
 * 
 */
export type ControlAction = (
  DataAction |
  FocusAction
)

/**
 *
 */
export namespace ControlAction {
  /**
   * 
   */
  export const Focus: typeof FocusAction = FocusAction

  /**
   * 
   */
  export const Data: typeof DataAction = DataAction

  /**
   * 
   */
  export const ALL: ControlAction[] = [
    ...DataAction.ALL,
    ...FocusAction.ALL
  ]
}