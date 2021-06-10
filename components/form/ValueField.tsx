import React from 'react'
import classnames from 'classnames'

import { Value } from '../../typescript/Value'
import { DataEvent } from '../../typescript/redux/DataEvent'
import { DataReducer } from '../../typescript/redux/DataReducer'

import { Triplet } from '../layout/Triplet'
import { Field } from '../Field'

import { IncrementButton } from '../increment/IncrementButton'
import { DecrementButton } from '../increment/DecrementButton'
import { IncrementAction } from '../increment/IncrementAction'
import { IncrementEvent } from '../increment/IncrementEvent'
import { Pancrement } from '../increment/Pancrement'

import { IntegerInput } from './IntegerInput'

/**
 * 
 */
function clamp (value: number, minimum: number, maximum: number): number {
  return Math.max(Math.min(value, maximum), minimum)
}

/**
 * 
 */
export class ValueField extends React.PureComponent<ValueField.Properties> {
  /**
   * 
   */
  private readonly _input: React.RefObject<HTMLInputElement>

  /**
   * 
   */
  private _origin: number

  /**
   * 
   */
  public constructor(properties: ValueField.Properties) {
    super(properties)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePancrement = this.handlePancrement.bind(this)
    this.handleFieldClick = this.handleFieldClick.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)

    this._input = React.createRef()
    this._origin = 0
  }

  /**
   * 
   */
  public handleInputChange (event: DataEvent): void {
    this.props.onChange(DataEvent.change(
      this.props.value,
      DataReducer.reduce(this.props.value, event)
    ))
  }

  /**
   * 
   */
  public handleFieldClick (): void {
    this._input.current.focus()
  }

  /**
   * 
   */
  public handlePancrement (event: IncrementEvent): void {
    if (event.type === IncrementAction.FIRST) {
      this._origin = this.props.value
    }

    const nextValue: number = clamp(this._origin + event.payload, this.props.minimum, this.props.maximum)

    if (nextValue !== this.props.value) {
      this.props.onChange(DataEvent.change(this.props.value, nextValue))
    }
  }

  /**
   * 
   */
  public handleIncrement (event: DataEvent<number>): void {
    const previousValue: number = this.props.value
    const nextValue: number = clamp(DataReducer.reduce(previousValue, event), this.props.minimum, this.props.maximum)

    if (nextValue !== previousValue) {
      this.props.onChange(DataEvent.change(this.props.value, nextValue))
    }
  }

  /**
   * 
   */
  public render () : React.ReactElement {
    return (
      <Pancrement speed={1/40} onChange={this.handlePancrement}>
        <Field onClick={this.handleFieldClick} className='is-clickable'>
          { this.props.children }

          <div className={classnames('control control-value', this.props.className)}>
            <Triplet subscript={ (this.props.value / 5) << 0 } superscript={ this.props.value >> 1 }>
              <div className='control-value-input'>
                <IntegerInput 
                  ref={this._input}
                  minimum={this.props.minimum}
                  maximum={this.props.maximum}
                  value={ this.props.value } 
                  onChange={this.handleInputChange}
                />

                <IncrementButton onChange={this.handleIncrement} interval={200} />
                <DecrementButton onChange={this.handleIncrement} interval={200} />
              </div>
            </Triplet>
          </div>
        </Field>
      </Pancrement>
    )
  }
}

/**
 * 
 */
export namespace ValueField {
  /**
   * 
   */
  export type ChangeCallback = (event: DataEvent<number>) => void

  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    minimum?: number | undefined,

    /**
     * 
     */
    maximum?: number | undefined,

    /**
     * 
     */
    className?: string | undefined,

    /**
     * 
     */
    children?: React.ReactNode | undefined

    /**
     * 
     */
    value: number,

    /**
     * 
     */
    onChange?: ChangeCallback | undefined
  }
}