import React from 'react'
import classnames from 'classnames'

/**
 * 
 */
export function Slide (properties: Slide.Properties): Slide.Element {
  return (
    <div className={classnames('slide', properties.className)}>
      { properties.children }
    </div>
  )
}

/**
 * 
 */
export namespace Slide {
  /**
   * 
   */
  export type Element = React.ReactElement<Slide.Properties>

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
    children?: React.ReactNode
  }
}