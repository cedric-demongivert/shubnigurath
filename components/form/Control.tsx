import { PureComponent } from 'react'
import { ReactElement } from 'react'

import { Empty } from '../../typescript/utils/Empty'

import { ControlEvent } from '../../typescript/redux/ControlEvent'

/**
 * 
 */
export class Control<Value = any, Additionals = any> extends PureComponent<Control.Properties<Value> & Additionals, undefined, undefined> {
  /**
   * 
   */
  public static defaultProps: Control.OptionalProperties<any> = {
    /**
     * 
     */
    className: undefined,

    /**
     * 
     */
    readonly: false,

    /**
     * 
     */
    focus: false,

    /**
     * 
     */
    onChange: Empty.callback
  }

  /**
   * 
   */
  public get focused() : boolean {
    throw new Error('get focused not implemented yet')
  }

  /**
   * 
   */
  public focus() : void {
    throw new Error('focus is not implemented yet')
  }

  /**
   * 
   */
  public blur() : void {
    throw new Error('blur is not implemented yet')
  }

  /**
   * 
   */
  public constructor (properties: Control.Properties<Value> & Additionals) {
    super(properties)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  /**
   * 
   */
  public handleBlur (event: FocusEvent) : void {
    if (this.props.focus) {
      this.focus()
      this.props.onChange(ControlEvent.Focus.blur())
    }
  }

  /**
   * 
   */
  public handleFocus (event: FocusEvent) : void {
    if (!this.props.focus) {
      this.blur()
      this.props.onChange(ControlEvent.Focus.focus())
    }
  }

  /**
   * 
   */
  public applyFocus () {
    const focused: boolean = this.focused

    if (this.props.focus !== focused) {
      if (focused) {
        this.blur()
      } else {
        this.focus()
      }
    }
  }

  /**
   * 
   */
  public componentDidMount () {
    this.applyFocus()
  }

  /**
   * 
   */
  public componentDidUpdate () {
    this.applyFocus()
  }

  /**
   * 
   */
  public componentWillUnmount () {
    
  }
}

/**
 * 
 */
export namespace Control {
  /**
   * 
   */
  export type ChangeCallback<Value> = (event: ControlEvent<Value>) => void

  /**
   * 
   */
  export type RequiredProperties<Value = any> = {
    /**
     * 
     */
    value: Value
  }

  /**
   * 
   */
  export type OptionalProperties<Value = any> = {
    /**
     * 
     */
    className?: string | undefined,

    /**
     * 
     */
    readonly?: boolean,

    /**
     * 
     */
    focus?: boolean,

    /**
     * 
     */
    onChange?: ChangeCallback<Value> | undefined
  }

  /**
   * 
   */
  export type Properties<Value = any> = RequiredProperties<Value> & OptionalProperties<Value>
  
  /**
   * 
   */
  export type Element<Value = any> = ReactElement<Properties<Value>, typeof Control>
}