import React from 'react'
import classnames from 'classnames'

/**
 * 
 */
function renderField (properties: React.HTMLAttributes<HTMLDivElement>, ref?: React.RefObject<HTMLDivElement> | undefined): React.ReactElement {
  return (
    <div { ...properties } className={classnames('field', properties.className)} ref={ref}>
      { properties.children }
    </div>
  )
}

/**
 * 
 */
export const Field = React.forwardRef(renderField)

/**
 * 
 */
export namespace Field {
  /**
   * 
   */
  export type Properties = React.HTMLAttributes<HTMLDivElement> & { readonly ref: React.RefObject<HTMLDivElement> | undefined }
}