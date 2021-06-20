import React from 'react'
import classnames from 'classnames'

/**
 * 
 */
export function VanillaLayout (properties: VanillaLayout.Properties) : React.ReactElement {
  const { className, ...otherProperties } = properties
  return <div className={classnames('layout layout-vanilla', className)} {...otherProperties} />
}

/**
 * 
 */
export namespace VanillaLayout {
  /**
   * 
   */
  export type Properties = React.HTMLAttributes<HTMLDivElement>
}