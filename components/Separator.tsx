import { ReactElement } from 'react'
import classnames from 'classnames'

/**
 * 
 */
export function Separator (properties: Separator.Properties): ReactElement {
  return (
    <div className={classnames('separator', properties.className)}>
      <div className='separator-left'></div>
      <div className='separator-filling'></div>
      <div className='separator-right'></div>
    </div>
  )
}

/**
 * 
 */
export namespace Separator {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    className?: string | undefined
  }
}