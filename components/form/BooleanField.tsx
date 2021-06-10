
import React from 'react'

import classnames from 'classnames'
import Toggle from 'react-toggle'

import { DataEvent } from '../../typescript/redux/DataEvent'

import { Field } from '../Field'

/**
 * 
 */
export class BooleanField extends React.PureComponent<BooleanField.Properties> {
  /**
   * 
   */
  private readonly _input: React.RefObject<HTMLInputElement>

  /**
   * 
   */
  public constructor(properties: BooleanField.Properties) {
    super(properties)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFieldClick = this.handleFieldClick.bind(this)

    this._input = React.createRef()
  }

  /**
   * 
   */
  public handleInputChange (): void {
    this.props.onChange(DataEvent.toggle())
  }

  /**
   * 
   */
  public handleFieldClick (): void {
    this.props.onChange(DataEvent.toggle())
  }

  /**
   * 
   */
  public render () : React.ReactElement {
    return (
      <Field onClick={this.handleFieldClick} className='is-clickable'>
        { this.props.children }

        <div className={classnames('control control-boolean', this.props.className)}>
          <Toggle 
            checked={this.props.value} 
            icons={{
              checked: '✓',
              unchecked: ''
            }}
            onChange={this.handleInputChange}
          />
        </div>
      </Field>
    )
  }
}

/**
 * 
 */
export namespace BooleanField {
  /**
   * 
   */
  export type ChangeCallback = (event: DataEvent<boolean>) => void

  /**
   * 
   */
  export type Properties = {
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
    value: boolean,

    /**
     * 
     */
    onChange?: ChangeCallback | undefined
  }
}