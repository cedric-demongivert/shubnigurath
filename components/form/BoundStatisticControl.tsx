import React from 'react'
import classnames from 'classnames'

import { Empty } from '../../typescript/utils/Empty'

import { Triplet } from '../layout/Triplet'

import { Control } from './Control'

/**
 * 
 */
export class BoundStatisticControl extends Control<number, BoundStatisticControl.Properties> {
  /**
   * 
   */
  public static defaultProps: BoundStatisticControl.Properties & Control.OptionalProperties = {
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
    onChange: Empty.callback,
     
    /**
     * 
     */
    ceil: 100
  }
  
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
        <div className={classnames('control control-bound-statistic is-readonly', this.props.className)}>
          <Triplet superscript={ '/' + this.props.ceil }>
            { this.props.value }
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
export namespace BoundStatisticControl {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    ceil?: number
  }
}