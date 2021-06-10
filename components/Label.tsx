import React from 'react'

import classnames from 'classnames'

/**
 * 
 */
function renderLabel (properties: React.HTMLAttributes<HTMLDivElement>, ref?: React.RefObject<HTMLDivElement> | undefined): React.ReactElement {
  return (
    <div {...properties} className={classnames('label', properties.className)} ref={ref}>
      <div className='label-value'>{ properties.children }</div>
      <div className='label-filler' />
      <div className='label-ending' />
    </div>
  )
}

/**
 * 
 */
export const Label = React.forwardRef(renderLabel)

/**
 * 
 */
export namespace Label {
  /**
   * 
   */
  export type Properties = React.HTMLAttributes<HTMLDivElement> & { readonly ref? : React.RefObject<HTMLDivElement> | undefined }
}