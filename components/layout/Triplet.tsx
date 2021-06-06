import React, { ReactNode } from 'react'
import { ReactElement } from 'react'

import classnames from 'classnames'

/**
 * 
 */
export function Triplet (properties: Triplet.Properties) : ReactElement {
  return (
    <div className={classnames('layout layout-triplet', properties.className)}>
      <div className='layout-triplet-body'>{ properties.children }</div>
      <div className='layout-triplet-aside'>
        <div className='layout-triplet-superscript'>{ properties.superscript }</div>
        <div className='layout-triplet-subscript'>{ properties.subscript }</div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace Triplet {
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
    children?: ReactNode | undefined,

    /**
     * 
     */
    superscript?: ReactNode | undefined,

    /**
     * 
     */
    subscript?: ReactNode | undefined,
  }
}