import React from 'react'

import classnames from 'classnames'

import { Empty } from '../../typescript/utils/Empty'

import { DataEvent } from '../../typescript/redux'

/**
 * 
 */
export class DecrementButton extends React.PureComponent<DecrementButton.Properties> {
  /**
   * 
   */
  public static readonly defaultProps : DecrementButton.OptionalProperties = Object.seal({
    /**
     * 
     */
    onChange: Empty.callback
  })

  /**
   * 
   */
  private _from: number

  /**
   * 
   */
  private _interval: number

  /**
  * @see React/Component#constructor
  */
  public constructor (properties : DecrementButton.Properties) {
    super(properties)

    this._from = 0
    this._interval = 0

    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleSilentEvent = this.handleSilentEvent.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  /**
  * Start the incrementation process.
  */
  private handleStart (event: React.MouseEvent<HTMLButtonElement>) : void {
    event.stopPropagation()

    this._from = event.timeStamp
    this._interval = window.setInterval(this.handleDecrement, this.props.interval)
  }

  /**
   * Stop the incrementation process.
   */
  private handleSilentEvent (event: React.SyntheticEvent<HTMLButtonElement>) : void {
    event.stopPropagation()
  }

  /**
   * Stop the incrementation process.
   */
  private handleStop (event: React.MouseEvent<HTMLButtonElement>) : void {
    event.stopPropagation()

    if (this._interval > 0) {
      window.clearInterval(this._interval)
      this._interval = 0
  
      if (event.timeStamp - this._from < this.props.interval) {
        this.handleDecrement()
      }
  
      this._from = 0
    }
  }

  /**
   * 
   */
  private handleDecrement (): void {
    this.props.onChange(DataEvent.decrement())
  }

  /**
   * @see React.Component.componentWillUnmount
   */
  public componentWillUnmount (): void {
    if (this._interval > 0) {
      window.clearInterval(this._interval)
      this._interval = 0
    }
  }

  /**
  * @see React.Component.render
  */
  public render () : React.ReactElement {
    return (
      <button 
        className={classnames('btn btn-decrement', this.props.className)}
        onMouseDown={this.handleStart}
        onMouseUp={this.handleStop}
        onMouseOut={this.handleStop}
        onClick={this.handleSilentEvent} 
      />
    )
  }
}

/**
 * 
 */
export namespace DecrementButton {
  /**
   * 
   */
  export type ChangeCallback = (event: DataEvent<number>) => void

  /**
   * 
   */
  export type OptionalProperties = {
    /**
     * 
     */
    onChange?: ChangeCallback | undefined,

    /**
     * 
     */
    className?: string | undefined
  }

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * Duration between two increment ticks.
     */
    interval: number
  }
  
  /**
   * 
   */
  export type Properties = RequiredProperties & OptionalProperties
}
