import React from 'react'

/**
 * 
 */
export function Loader (properties: Readonly<Loader.Properties>) : React.ReactElement {
  return <div className='loader'>{properties.children || 'Chargement'}<div className='loader dot-loader' /></div>
}

/**
 * 
 */
export namespace Loader {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    children?: React.ReactNode | undefined
  }
}

