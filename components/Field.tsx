import { ReactNode } from 'react'
import { ReactElement } from 'react'
import { MouseEvent } from 'react'
import { FocusEvent } from 'react'
import classnames from 'classnames'

import { Toggler } from '../typescript/Toggler'

/**
 * 
 */
const IS_CLICKABLE: Toggler = Toggler.create('is-clickable')

/**
 * 
 */
const IS_FOCUSABLE: Toggler = Toggler.create('is-focusable')

/**
 * 
 */
function getContainerClassName (properties: Field.Properties): string {
  return classnames(
    'field', 
    IS_CLICKABLE.toggle(properties.onClick != null), 
    IS_FOCUSABLE.toggle(properties.onFocus != null), 
    properties.className
  )
}

/**
 * 
 */
export function Field (properties: Field.Properties) : ReactElement {
  return (
    <div 
      onClick={properties.onClick} 
      onFocus={properties.onFocus}
      tabIndex={properties.onFocus == null ? -1 : 0}
      className={getContainerClassName(properties)}
    >{ properties.children }</div>
  )
}

/**
 * 
 */
export namespace Field {
  /**
   * 
   */
  export type ClickCallback = (previous: MouseEvent) => void

  /**
   * 
   */
  export type FocusCallback = (previous: FocusEvent) => void

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * 
     */
    children: ReactNode,
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
    onClick?: ClickCallback | undefined,

    /**
     * 
     */
    onFocus?: FocusCallback | undefined
  }

  /**
   * 
   */
  export type Properties = RequiredProperties & OptionalProperties
}