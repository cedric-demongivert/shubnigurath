import React, { JSXElementConstructor } from 'react'
import classnames from 'classnames'

/**
 * 
 */
export class Selector extends React.Component<Selector.Properties> {
  /**
   * 
   */
  public render (): React.ReactNode {
    return (
      <div className={classnames('selector', this.props.className)}>
        { this.props.children }
      </div>
    )
  }
}

/**
 * 
 */
export namespace Selector {
  /**
   * 
   */
  export function Option (properties: Option.Properties): React.ReactNode {
    return (
      <button className={classnames('selector-option', properties.className)} disabled={properties.disabled}>
        { properties.children }
      </button>
    )
  }

  /**
   * 
   */
  export namespace Option {
    /**
     * 
     */
    export type Properties = {
      /**
       * 
       */
      value: any,

      /**
       * 
       */
      className?: string | undefined,

      /**
       * 
       */
      children?: React.ReactNode | undefined,

      /**
       * 
       */
      disabled?: boolean | undefined
    }
  }

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
    children?: React.ReactNode | undefined
  }
}