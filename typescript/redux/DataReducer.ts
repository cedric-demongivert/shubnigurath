import { ApplicationEvent } from "./ApplicationEvent"
import { DataAction } from "./DataAction"
import { DataEvent } from "./DataEvent"

/**
 * 
 */
export namespace DataReducer {
  /**
   * 
   */
  export function reduceChange<Data>(state: Data, event: DataEvent.Change<Data>): Data {
    return event.payload.next
  }

  /**
   * 
   */
  export function reduceIncrement(state: null | undefined, event: DataEvent.Increment): 1

  /**
   * 
   */
  export function reduceIncrement(state: number, event: DataEvent.Increment): number

  /**
   * 
   */
  export function reduceIncrement<Data>(state: Data, event: DataEvent.RequiredIncrement): never

  /**
   * 
   */
  export function reduceIncrement<Data>(state: Data, event: DataEvent.OptionalIncrement): Data

  /**
   * 
   */
  export function reduceIncrement(state: any, event: DataEvent.Increment): any {
    if (state == null) {
      return 1
    } else if (typeof state === 'number') {
      return state + 1
    } else if (event.payload.required) {
      if (typeof state === 'object') {
        throw new Error('Trying to increment a non-incrementable data type : ' + typeof state + ' ' + state.constructor.name + '.')
      } else {
        throw new Error('Trying to increment a non-incrementable data type : ' + typeof state + '.')
      }
    } else {
      return state
    }
  }

  /**
   * 
   */
  export function reduceDecrement(state: null | undefined, event: DataEvent.Decrement): -1

  /**
   * 
   */
  export function reduceDecrement(state: number, event: DataEvent.Decrement): number

  /**
   * 
   */
  export function reduceDecrement<Data>(state: Data, event: DataEvent.RequiredDecrement): never

  /**
   * 
   */
  export function reduceDecrement<Data>(state: Data, event: DataEvent.OptionalDecrement): any

  /**
   * 
   */
  export function reduceDecrement(state: any, event: DataEvent.Decrement): number {
    if (state == null) {
      return -1
    } else if (typeof state === 'number') {
      return state - 1
    } else if (event.payload.required) {
      if (typeof state === 'object') {
        throw new Error('Trying to increment a non-decrementable data type : ' + typeof state + ' ' + state.constructor.name + '.')
      } else {
        throw new Error('Trying to increment a non-decrementable data type : ' + typeof state + '.')
      }
    } else {
      return state
    }
  }

  /**
   * 
   */
  export function reduceToggle(state: number, event: DataEvent.Toggle): number

  /**
   * 
   */
  export function reduceToggle(state: boolean, event: DataEvent.Toggle): boolean

  /**
   * 
   */
  export function reduceToggle(state: null | undefined, event: DataEvent.Toggle): true

  /**
   * 
   */
  export function reduceToggle<Data>(state: Data, event: DataEvent.RequiredToggle): never

  /**
   * 
   */
  export function reduceToggle<Data>(state: Data, event: DataEvent.OptionalToggle): Data

  /**
   * 
   */
  export function reduceToggle(state: any, event: DataEvent.Toggle): any {
    if (state == null) {
      return true
    } else if (typeof state === 'number') {
      return state > 0 ? 0 : 1
    } else if (typeof state === 'boolean') {
      return !state
    } else if (event.payload.required) {
      if (typeof state === 'object') {
        throw new Error('Trying to increment a non-togglable data type : ' + typeof state + ' ' + state.constructor.name + '.')
      } else {
        throw new Error('Trying to increment a non-togglable data type : ' + typeof state + '.')
      }
    } else {
      return state
    }
  }

  /**
   * 
   */
  export function reduce<Data>(state: Data, event: ApplicationEvent): Data {
    switch (event.type) {
      case DataAction.CHANGE:
        return reduceChange(state, event)
      case DataAction.DECREMENT:
        return reduceDecrement(state, event)
      case DataAction.INCREMENT:
        return reduceIncrement(state, event)
      case DataAction.TOGGLE:
        return reduceToggle(state, event)
      default:
        return state
    }
  }
}