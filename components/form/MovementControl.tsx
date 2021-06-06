import React from 'react'
import classnames from 'classnames'

import { Triplet } from '../layout/Triplet'

import { Control } from './Control'

/**
 * 
 */
export class MovementControl extends Control<number> {
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
        <div className={classnames('control control-movement is-readonly', this.props.className)}>
          <Triplet superscript='+1' subscript='-1'>
            { this.props.value.sum() }
          </Triplet>
        </div>
      )
    } else {
      throw new Error('Not implemented yet.')
    }
  }
}

/**
 * 
 */
export namespace MovmentControl {

}