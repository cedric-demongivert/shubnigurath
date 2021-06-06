import { ApplicationEvent } from "./ApplicationEvent"
import { ControlAction } from "./ControlAction"
import { DataEvent } from "./DataEvent"
import { DataReducer } from "./DataReducer"
import { Field } from "./Field"
import { FocusAction } from "./FocusAction"
import { FocusEvent } from "./FocusEvent"

/**
 * 
 */
export namespace FieldReducer {
  /**
   * 
   */
  export function reduceData<Data>(state: Field<Data>, event: DataEvent): Field<Data> {
    const nextValue: Data = DataReducer.reduce<Data>(state.value, event)
    return nextValue === state.value ? state : Field.create({ ...state, value: nextValue })
  }

  /**
   * 
   */
  export function reduceFocus<Data>(state: Field<Data>, event: FocusEvent): Field<Data> {
    const nextFocus: boolean = event.type === FocusAction.FOCUS
    return nextFocus === state.focus ? state : Field.create({ ...state, focus: nextFocus })
  }

  /**
   * 
   */
  export function reduce<Data>(state: Field<Data>, event: ApplicationEvent): Field<Data> {
    switch (event.type) {
      case ControlAction.Data.CHANGE:
      case ControlAction.Data.DECREMENT:
      case ControlAction.Data.INCREMENT:
      case ControlAction.Data.TOGGLE:
        return reduceData(state, event)
      case ControlAction.Focus.FOCUS:
      case ControlAction.Focus.BLUR:
        return reduceFocus(state, event)
      default:
        return state
    }
  }
}