import React, { PureComponent, ReactElement } from 'react'
import Hammer from 'react-hammerjs'
import classnames from 'classnames'

import { Triplet } from '../layout/Triplet'
import { Value } from '../../typescript/Value'
import { ControlEvent } from '../../typescript/redux'

/**
 * 
 */
const INTEGER_REGEXP: RegExp = /^\s*\d*\s*$/i

/**
 * 
 */
export class ValueControl extends PureComponent<ValueControl.Properties, ValueControl.State> {
  /**
   * 
   */
  private readonly _hidden: React.RefObject<HTMLSpanElement>

  /**
   * 
   */
  private readonly _input: React.RefObject<HTMLInputElement>

  /**
   * 
   */
  private _maxLength: number

  /**
   * 
   */
  private _origin: number

  /**
   * 
   */
  public constructor(properties: ValueControl.Properties) {
    super(properties)

    this.state = { content: properties.value.sum().toString() }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this)
    this.updateInputSize = this.updateInputSize.bind(this)
    this.handlePan = this.handlePan.bind(this)

    this._hidden = React.createRef()
    this._input = React.createRef()

    this._maxLength = properties.maximum == null ? Number.POSITIVE_INFINITY : properties.maximum.toString().length
  }
  
  /**
   * 
   */
  public handlePan (event: any): void {
    const delta: number = (event.deltaX / 40) << 0

    if (event.isFinal) {
      this.setState({ content: this.props.value.sum().toString() }, this.updateInputSize)
      this.increment(delta)
    } else {
      this.setState({ content: (this.props.value.sum() + delta).toString() }, this.updateInputSize)
    }
  }

  /**
   * 
   */
  private clamp (value: number): number {
    return Math.max(
      Math.min(
        value,
        this.props.maximum == null ? Number.POSITIVE_INFINITY : this.props.maximum 
      ),
      this.props.minimum == null ? Number.NEGATIVE_INFINITY : this.props.minimum
    )
  }

  /**
   * 
   */
  public commit () : void {
    const content: string = this.state.content

    this.setState({ content: this.props.value.sum().toString() }, this.updateInputSize)

    if (this.props.onChange && INTEGER_REGEXP.test(content)) {
      const trimedContent: string = content.trim()
      const contentValue: number = trimedContent === '' ? 0 : parseInt(trimedContent)

      this.props.onChange(
        ControlEvent.Data.change(
          this.props.value, Value.create({
            ...this.props.value,
            base: this.clamp(contentValue)
          })
        )
      )
    }
  }
  
  /**
   * 
   */
  public decrement (value: number = 1) : void {
    if (this.props.onChange) {
      this.props.onChange(
        ControlEvent.Data.change(
          this.props.value, Value.create({
            ...this.props.value,
            base: this.clamp(this.props.value.base - value)
          })
        )
      )
    }
  }

  /**
   * 
   */
   public increment (value: number = 1) : void {
    if (this.props.onChange) {
      this.props.onChange(
        ControlEvent.Data.change(
          this.props.value, Value.create({
            ...this.props.value,
            base: this.clamp(this.props.value.base + value)
          })
        )
      )
    }
  }

  /**
   * 
   */
  public updateInputSize (): void {
    this._input.current.style.width = this._hidden.current.offsetWidth + 'px'
    this._input.current.style.height = this._hidden.current.offsetHeight + 'px'
  }

  /**
   * 
   */
  public handleInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const targetValue: string = event.target.value
    const nextContent: string = targetValue.length > this._maxLength ? targetValue.substr(targetValue.length - this._maxLength) : targetValue

    this.setState({ content: nextContent }, this.updateInputSize)
  }

  /**
   * 
   */
  public handleInputBlur (event: React.FocusEvent): void {
    this.commit()
  }

  /**
   * 
   */
  public handleInputKeyPress (event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.commit()
    }
  }

  /**
   * 
   */
  public componentDidMount (): void {
    this.updateInputSize()
  }

  /**
   * 
   */
  public componentDidUpdate (oldProperties: ValueControl.Properties): void {
    if (oldProperties.value !== this.props.value) {
      this.setState({ content: this.props.value.sum().toString() }, this.updateInputSize)
    }

    if (this.props.maximum !== oldProperties.maximum) {
      this._maxLength = this.props.maximum.toString().length
    }
  }

  /**
   * 
   */
  public render () : ReactElement {
    return (
      <Hammer onPan={this.handlePan} direction={'DIRECTION_HORIZONTAL'}>
        <div className={classnames('control control-value', this.props.className)}>
          <Triplet subscript={ this.props.value.fifth() } superscript={ this.props.value.half() }>
            <div className='control-value-input'>
              <span className='hidden' ref={this._hidden}>{ this.state.content }</span>
              <input 
                ref={this._input}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
                onKeyPress={this.handleInputKeyPress} 
                type='text' 
                value={ this.state.content } 
              />
            </div>
          </Triplet>
        </div>
      </Hammer>
    )
  }
}

/**
 * 
 */
export namespace ValueControl {
  /**
   * 
   */
  export type ChangeCallback = (event: ControlEvent) => void

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
    value: Value,

    /**
     * 
     */
    onChange?: ChangeCallback | undefined
  }

  /**
   * 
   */
  export type State = {
    /**
     * 
     */
    content: string
  }
}