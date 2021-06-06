import classnames from 'classnames'

import { Control } from './Control'

/**
 * 
 */
export class TextControl extends Control<string> {
  /**
   * 
   */
  public get focused() : boolean {
    return false
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
  public render () {
    if (this.props.readonly) {
      return (
        <div className={classnames('control control-text is-readonly', this.props.className)}>
          { this.props.value }
        </div>
      )
    } else {
      return (
        <div className={classnames('control control-text', this.props.className)}>
          <input type='text' value={this.props.value} />
        </div>
      )
    }
  }
}

/**
 * 
 */
export namespace TextControl {

}