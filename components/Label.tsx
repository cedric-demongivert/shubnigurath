import { MouseEvent } from 'react'
import { ReactElement } from 'react'

import classnames from 'classnames'

import { Toggler } from '../typescript/Toggler'

/**
 * 
 */
const IS_CLICKABLE: Toggler = Toggler.create('is-clickable')

/**
 * 
 */
function getContainerClassName (properties: Label.Properties): string {
  return classnames(
    'label', 
    IS_CLICKABLE.toggle(properties.onClick != null), 
    properties.className
  )
}

/**
 * 
 */
export function Label (properties: Label.Properties): ReactElement {
  return (
    <div onClick={properties.onClick} className={getContainerClassName(properties)}>
      <div className='label-value'>{ properties.children }</div>
      <div className='label-filler' />
      <div className='label-ending' />
    </div>
  )
}

/**
 * 
 */
export namespace Label {
  /**
   * 
   */
  export type ClickCallback = (event: MouseEvent) => void

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * 
     */
    children: string
  }

  /**
   * 
   */
  export type OptionalProperties = {
    /**
     * 
     */
    className?: string | undefined,

    /**
     * 
     */
    onClick?: ClickCallback | undefined
  }

  /**
   * 
   */
  export type Properties = RequiredProperties & OptionalProperties

  /**
   * 
   */
  export type Element = ReactElement<Properties, typeof Label>
}