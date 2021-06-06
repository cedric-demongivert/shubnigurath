import classnames from 'classnames'
import Toggle from 'react-toggle'
import { ControlEvent } from '../../typescript/redux/ControlEvent'

import { Control } from './Control'

/**
 * 
 */
export class BooleanControl extends Control<boolean> {
  /**
   * 
   */
  public get focused() : boolean {
    return false
  }

  /**
   * 
   */
  public constructor (properties: Control.Properties<boolean>) {
    super(properties)

    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * 
   */
  public focus() : void {

  }

  /**
   * 
   */
  public blur() : void {

  }

  /**
   * 
   */
  public handleChange (): void {
    this.props.onChange(ControlEvent.Data.toggle())
  }

  /**
   * 
   */
  public render () {
    return (
      <div className={classnames('control control-boolean is-readonly', this.props.className)}>
        <Toggle 
          checked={this.props.value} 
          disabled={this.props.readonly} 
          icons={{
            checked: '✓',
            unchecked: ''
          }}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

/**
 * 
 */
export namespace BooleanControl {

}