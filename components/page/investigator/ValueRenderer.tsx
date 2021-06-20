import React, { ReactElement } from 'react'
import classnames from 'classnames'

import { Value } from '../../../typescript/Value'
import { Triplet } from '../../layout/Triplet'


/**
 * 
 */
export function ValueRenderer (properties: ValueRenderer.Properties): ReactElement {
  return (
    <Triplet 
      className={classnames('value', properties.className)} 
      subscript={ properties.children.fifth() } 
      superscript={ properties.children.half() }
    >{ properties.children.sum().toString() }</Triplet>
  )
} 

/**
 * 
 */
export namespace ValueRenderer {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    readonly className?: string | undefined,

    /**
     * 
     */
    readonly children: Value
  }
}
