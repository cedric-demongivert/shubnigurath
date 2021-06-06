import { ApplicationEvent } from './ApplicationEvent'
import { ControlAction } from './ControlAction'

import { DataEvent } from './DataEvent'
import { FocusEvent } from './FocusEvent'

/**
 * 
 */
export type ControlEvent<Value = any> = (
  DataEvent |
  FocusEvent
)

/**
 *
 */
export namespace ControlEvent {
  /**
   * 
   */
  export const Focus: typeof FocusEvent = FocusEvent

  /**
   * 
   */
  export const Data: typeof DataEvent = DataEvent
}