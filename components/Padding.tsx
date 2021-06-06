import React from 'react'
import { ReactElement } from 'react'

/**
 * 
 */
export function Padding (properties: Padding.Properties) : ReactElement {
  return <span className='padding'>{ 
    (properties.padding || '0').repeat(
      Math.max(properties.size - properties.of.length, 0)
    ) 
  }</span>
}

/**
 * 
 */
export namespace Padding {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    padding?: string | undefined,

    /**
     * 
     */
    size: number,

    /**
     * 
     */
    of: string
  }
}