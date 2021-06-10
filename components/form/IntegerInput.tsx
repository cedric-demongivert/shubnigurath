/**
 * 
 */
import React, { HTMLAttributes, ReactElement } from 'react'
import classnames from 'classnames'

import { DataEvent } from '../../typescript/redux'
import { Empty } from '../../typescript/utils'

function clamp (value: number, minimum: number, maximum: number): number {
  return Math.max(Math.min(value, maximum), minimum)
}

/**
* 
*/
class RawIntegerInput extends React.Component<IntegerInput.Properties, IntegerInput.State> {
  /**
   * 
   */
  public static readonly defaultProps: IntegerInput.OptionalProperties & IntegerInput.InheritedProperties = {
    /**
     * 
     */
    minimum: Number.NEGATIVE_INFINITY,

    /**
     * 
     */
    maximum: Number.POSITIVE_INFINITY,

    /**
     * 
     */
    onChange: Empty.callback,

    /**
     * 
     */
    onBlur: Empty.callback,

    /**
     * 
     */
    onKeyUp: Empty.callback,

    /**
     * 
     */
    onInput: Empty.callback
  }

  /**
   * 
   */
  private _shadow: React.RefObject<HTMLDivElement>

  /**
   * 
   */
  private _input: React.RefObject<HTMLInputElement>

  /**
   * 
   */
  private readonly _defaultInput: React.RefObject<HTMLInputElement>

  /**
  * 
  */
  public constructor(properties: IntegerInput.Properties) {
    super(properties)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this)
    this.handleShadowUpdate = this.handleShadowUpdate.bind(this)

    this._defaultInput = React.createRef()
    this._shadow = React.createRef()

    this.state = { content: this.props.value.toString() }
  }

  /**
  * 
  */
  public commit () : void {
    const content: number = this._input.current.valueAsNumber << 0

    this._input.current.value = this.props.value.toString()
    this.setState({ content: this.props.value.toString() }, this.handleShadowUpdate)

    this.props.onChange(
      DataEvent.change(
        this.props.value, 
        clamp(content, this.props.minimum, this.props.maximum)
      )
    )
  }

  /**
   * 
   */
  private handleShadowUpdate (): void {
    const input: HTMLInputElement = this._input.current
    const shadow: HTMLDivElement = this._shadow.current

    input.style.width = shadow.scrollWidth + 'px'
    input.style.height = shadow.scrollHeight + 'px'
  }

  /**
  * 
  */
  public handleInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
    let clamped: number = clamp(event.target.valueAsNumber, this.props.minimum, this.props.maximum)

    if (isNaN(clamped)) {
      clamped = this.props.minimum === Number.NEGATIVE_INFINITY ? 0 : this.props.minimum
    }

    this._input.current.valueAsNumber = clamped

    this.setState({ content: this._input.current.valueAsNumber.toString() }, this.handleShadowUpdate)
    this.props.onInput(event)
  }
  
  /**
  * 
  */
  public handleInputBlur (event: React.FocusEvent<HTMLInputElement>): void {
    this.commit()
    this.props.onBlur(event)
  }

  /**
  * 
  */
  public handleInputKeyUp (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      this.commit()
    }

    this.props.onKeyUp(event)
  }

  /**
  * 
  */
  public componentDidMount (): void {
    const input: HTMLInputElement = this._input.current

    input.valueAsNumber = this.props.value
    this.handleShadowUpdate()
  }

  /**
  * 
  */
  public componentDidUpdate (oldProperties: IntegerInput.Properties): void {
    if (oldProperties.value !== this.props.value) {
      this._input.current.valueAsNumber = this.props.value
      this.setState({ content: this.props.value.toString() }, this.handleShadowUpdate)
    }
  }

  /**
  * 
  */
  public render () : React.ReactElement {
    const { 
      onChange,
      onBlur,
      onKeyUp,
      onInput,
      minimum,
      maximum,
      value,
      reference,
      className,
      ...properties
    } = this.props
    
    this._input = reference || this._defaultInput

    return (
      <div className='layout layout-shadowed'>
        <div className='layout-shadowed-shadow' ref={this._shadow}>{ this.state.content }</div>
        <input 
          { ...properties }
          onBlur={this.handleInputBlur}
          onKeyUp={this.handleInputKeyUp}
          onInput={this.handleInputChange}
          className={classnames(className, 'layout-shadowed-projection')}
          ref={this._input}
          type='number' 
        />
      </div>
      
    )
  }
}

function renderIntegerInput (properties: IntegerInput.Properties, ref: React.RefObject<HTMLInputElement>): ReactElement {
  return <RawIntegerInput {...properties} reference={ref} />
}

/**
 * 
 */
export const IntegerInput = React.forwardRef(renderIntegerInput)

/**
* 
*/
export namespace IntegerInput {
  /**
  * 
  */
  export type ChangeCallback = (event: DataEvent.Change) => void

  /**
   * 
   */
  export type OptionalProperties = {
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
    onChange?: ChangeCallback | undefined,

    /**
     * 
     */
    reference?: React.RefObject<HTMLInputElement> | undefined
  }

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * 
     */
    value: number
  }


  /**
   * 
   */
   export type InheritedProperties = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>

  
  /**
   * 
   */
  export type State = {
    /**
     * 
     */
    content: string
  }
  /**
  * 
  */
  export type Properties = OptionalProperties & RequiredProperties & InheritedProperties
}