import React from 'react'

import Hammer from 'react-hammerjs'

import { Empty } from '../../typescript/utils/Empty'
import { IncrementEvent } from './IncrementEvent'

/**
 * 
 */
const BLOCK_SCROLL_STYLE: object = { touchAction: 'none' }

/**
 * 
 */
export class Pancrement extends React.PureComponent<Pancrement.Properties> {
  /**
   * 
   */
  public static readonly defaultProps : Pancrement.OptionalProperties = Object.seal({
    /**
     * 
     */
    onChange: Empty.callback,

    /**
     * 
     */
    value: 0
  })

  /**
   * 
   */
  private _previous: number | undefined

  /**
  * @see React/Component#constructor
  */
  public constructor (properties : Pancrement.Properties) {
    super(properties)

    this._previous = undefined

    this.handlePan = this.handlePan.bind(this)
  }

  /**
   * 
   */
   private handlePan (event: any): void {
    const delta: number = (-event.deltaY * this.props.speed) << 0

    if (event.isFinal) {
      this.props.onChange(IncrementEvent.last(delta))
      this._previous = undefined
    } else if (this._previous == null) {
      this.props.onChange(IncrementEvent.first(delta))
      this._previous = delta
    } else if (this._previous !== delta) {
      this.props.onChange(IncrementEvent.next(delta))
      this._previous = delta
    }
  }

  /**
   * 
   */
  private getChildrenStyle (): object {
    return Object.assign({}, this.props.children.props.style, BLOCK_SCROLL_STYLE)
  }

  /**
  * @see React.Component.render
  */
  public render () : React.ReactElement {
    return (
      <Hammer onPan={this.handlePan} direction={'DIRECTION_VERTICAL'} options={{ domEvents: true }}>
        { this.props.children }
      </Hammer>
    )
  }
}

/**
 * 
 */
export namespace Pancrement {
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
    readonly onChange?: ChangeCallback | undefined
  }

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * Increment per pixel.
     */
    readonly speed: number,

    /**
     * 
     */
    readonly children: React.ReactElement
  }
  
  /**
   * 
   */
  export type Properties = RequiredProperties & OptionalProperties
}
