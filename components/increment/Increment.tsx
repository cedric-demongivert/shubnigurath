import React from 'react'

import { Empty } from '../../typescript/utils/Empty'

import { IncrementState } from './IncrementState'
import { IncrementEvent } from './IncrementEvent'

const TICK_DURATION: number = 250

/**
 * 
 */
export class Increment extends React.PureComponent<Increment.Properties> {
  /**
   * 
   */
  public static readonly defaultProps : Increment.OptionalProperties = Object.seal({
    /**
     * 
     */
    onChange: Empty.callback,

    /**
     * 
     */
    acceleration: 0
  })

  /**
   * 
   */
  private _currentFrame: number

  /**
   * 
   */
  private _lastTick: number | undefined

  /**
  * @see React/Component#constructor
  */
  public constructor (properties : Increment.Properties) {
    super(properties)

    this._currentFrame = 0
    this._lastTick = undefined

    this.handleAnimationFrame = this.handleAnimationFrame.bind(this)
  }

  /**
  * Perform an incrementation.
  *
  * @param current - The number of milliseconds elapsed since the first animation call.
  */
  private handleAnimationFrame (timestamp: number) : void {
    if (this._lastTick == null) {
      this._lastTick = timestamp
    }

    while (timestamp - this._lastTick > TICK_DURATION) {
      this._lastTick += TICK_DURATION
      this.props.onChange(IncrementEvent.next(this.increment(timestamp / 1000)))
    }

    this._currentFrame = window.requestAnimationFrame(this.handleAnimationFrame)
  }

  /**
  * Compute an incrementation value.
  * 
  * @param delta - Elapsed time in seconds.
  */
  private increment (delta: number) : number {
    const acceleration: number = this.props.acceleration
    const speed : number = this.props.speed
    const result = speed * delta + 0.5 * acceleration * delta * delta

    return result < 0 ? Math.floor(result) : Math.ceil(result)
  }

  /**
  * Start the incrementation process.
  */
  private start () : void {
    this.props.onChange(IncrementEvent.first(0))
    this._lastTick = undefined
    this._currentFrame = window.requestAnimationFrame(this.handleAnimationFrame)
  }


  /**
   * Stop the incrementation process.
   */
  private stop (delta: number) : void {
    window.cancelAnimationFrame(this._currentFrame)
    this._currentFrame = 0
    
    this.props.onChange(IncrementEvent.last(this.increment(delta)))
  }

  /**
   * 
   */
  private commit(delta: number) : void {
    const onChange: Increment.ChangeCallback = this.props.onChange

    onChange(IncrementEvent.first(0))
    onChange(IncrementEvent.last(this.increment(delta)))
  }

  /**
   * @see React.Component.componentDidMount
   */
  public componentDidMount (): void {
    const since: number | undefined = this.props.since
    const until: number | undefined = this.props.until

    const state: IncrementState = IncrementState.fromRange(since, until)

    switch (state) {
      case IncrementState.SLEEPING:
        return
      case IncrementState.RESOLVED:
        return this.commit((until - since) / 1000)
      case IncrementState.RUNNING:
        return this.start()
      default:
        throw new Error(
          'Unable to handle increment state ' + IncrementState.toDebugString(state) + 
          ' as no procedure was defined for that.'
        )
    }
  }

  /**
   * @see React.Component.componentDidUpdate
   */
  public componentDidUpdate (oldProperties: Increment.Properties): void {
    const since: number | undefined = this.props.since
    const until: number | undefined = this.props.until
    const oldSince: number | undefined = oldProperties.since
    const oldUntil: number | undefined = oldProperties.until

    const state: IncrementState = IncrementState.fromRange(since, until)
    const oldState: IncrementState = IncrementState.fromRange(oldSince, oldUntil)

    switch (oldState) {
      case IncrementState.SLEEPING:
        switch (state) {
          case IncrementState.SLEEPING:
            return
          case IncrementState.RESOLVED:
            return this.commit((until - since) / 1000)
          case IncrementState.RUNNING:
            return this.start()
          default:
            throw new Error(
              'Unable to handle increment state ' + IncrementState.toDebugString(oldState) + 
              ' as no procedure was defined for that.'
            )
        }
      case IncrementState.RESOLVED:
        switch (state) {
          case IncrementState.SLEEPING:
            return
          case IncrementState.RESOLVED:
            if (oldSince !== since || oldUntil !== until) {
              this.commit((until - since) / 1000)
            }
            return
          case IncrementState.RUNNING:
            return this.start()
          default:
            throw new Error(
              'Unable to handle increment state ' + IncrementState.toDebugString(oldState) + 
              ' as no procedure was defined for that.'
            )
        }
      case IncrementState.RUNNING:
        switch (state) {
          case IncrementState.SLEEPING:
            return this.stop((Date.now() - oldSince) / 1000)
          case IncrementState.RESOLVED:
            return this.stop((until - since) / 1000)
          case IncrementState.RUNNING:
            return
          default:
            throw new Error(
              'Unable to handle increment state ' + IncrementState.toDebugString(oldState) + 
              ' as no procedure was defined for that.'
            )
        }
      default:
        throw new Error(
          'Unable to handle increment state ' + IncrementState.toDebugString(oldState) + 
          ' as no procedure was defined for that.'
        )
    }
  }

  /**
   * @see React.Component.componentWillUnmount
   */
  public componentWillUnmount (): void {
    if (this._currentFrame > 0) {
      window.cancelAnimationFrame(this._currentFrame)
      this._currentFrame = 0
    }
  }

  /**
  * @see React.Component.render
  */
  public render () : null {
    return null
  }
}

/**
 * 
 */
export namespace Increment {
  /**
   * 
   */
  export type ChangeCallback = (event: IncrementEvent) => void

  /**
   * 
   */
  export type OptionalProperties = {
    /**
     * 
     */
    readonly onChange?: ChangeCallback | undefined,

    /**
     * Speed gain per second.
     */
    readonly acceleration: number
  }

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * Increment value per second.
     */
    readonly speed: number,

    /**
     * Starting timestamp of the incrementation process.
     */
    readonly since: number | undefined,

    /**
     * Ending timestamp of the incrementation process. 
     */
    readonly until: number | undefined
  }
  
  /**
   * 
   */
  export type Properties = RequiredProperties & OptionalProperties
}
