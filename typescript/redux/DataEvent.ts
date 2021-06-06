import { DataAction } from './DataAction'
import { ApplicationEvent } from './ApplicationEvent'

/**
 * 
 */
export type DataEvent<Value = any> = (
  DataEvent.Change<Value> |
  DataEvent.Toggle |
  DataEvent.Increment |
  DataEvent.Decrement
)

/**
 *
 */
export namespace DataEvent {
  /**
   * 
   */
  export type Change<Value = any> = ApplicationEvent<
    DataAction.CHANGE, {
      /**
       * 
       */
      readonly previous: Value | undefined,

      /**
       * 
       */
      readonly next: Value | undefined
    }
  >

  /**
   * 
   */
  export type Toggle = RequiredToggle | OptionalToggle

  /**
   * 
   */
  export type RequiredToggle = ApplicationEvent<DataAction.TOGGLE, { required: true }>

  /**
   * 
   */
  export type OptionalToggle = ApplicationEvent<DataAction.TOGGLE, { required: false }>

  /**
   * 
   */
  export type Increment = RequiredIncrement | OptionalIncrement

  /**
   * 
   */
  export type RequiredIncrement = ApplicationEvent<DataAction.INCREMENT, { required: true }>

  /**
   * 
   */
  export type OptionalIncrement = ApplicationEvent<DataAction.INCREMENT, { required: false }>

  /**
   * 
   */
  export type Decrement = RequiredDecrement | OptionalDecrement

  /**
   * 
   */
  export type RequiredDecrement = ApplicationEvent<DataAction.DECREMENT, { required: true }>

  /**
   * 
   */
  export type OptionalDecrement = ApplicationEvent<DataAction.DECREMENT, { required: false }>

  /**
   * 
   */
  const TOGGLE: RequiredToggle = Object.seal(ApplicationEvent.create(DataAction.TOGGLE, { required: true }))

  /**
   * 
   */
  const TOGGLE_IF_ALLOWED: OptionalToggle = Object.seal(ApplicationEvent.create(DataAction.TOGGLE, { required: false }))

  /**
   * 
   */
  const INCREMENT: RequiredIncrement = Object.seal(ApplicationEvent.create(DataAction.INCREMENT, { required: true }))

  /**
   * 
   */
  const INCREMENT_IF_ALLOWED: OptionalIncrement = Object.seal(ApplicationEvent.create(DataAction.INCREMENT, { required: false }))

  /**
   * 
   */
  const DECREMENT: RequiredDecrement = Object.seal(ApplicationEvent.create(DataAction.DECREMENT, { required: true }))

  /**
   * 
   */
  const DECREMENT_IF_ALLOWED: OptionalDecrement = Object.seal(ApplicationEvent.create(DataAction.DECREMENT, { required: false }))

  /**
   * 
   */
  export function change<Value = any>(previous: Value | undefined, next: Value | undefined): Change {
    return ApplicationEvent.create(DataAction.CHANGE, { previous, next })
  }

  /**
   * 
   */
  export function toggle(): RequiredToggle {
    return TOGGLE
  }

  /**
   * 
   */
  export function toggleIfAllowed(): OptionalToggle {
    return TOGGLE_IF_ALLOWED
  }

  /**
   * 
   */
  export function increment(): RequiredIncrement {
    return INCREMENT
  }

  /**
   * 
   */
  export function incrementIfAllowed(): OptionalIncrement {
    return INCREMENT_IF_ALLOWED
  }

  /**
   * 
   */
  export function decrement(): RequiredDecrement {
    return DECREMENT
  }

  /**
   * 
   */
  export function decrementIfAllowed(): OptionalDecrement {
    return DECREMENT_IF_ALLOWED
  }
}