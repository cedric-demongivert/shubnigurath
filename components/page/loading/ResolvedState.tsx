import React from 'react'
import classnames from 'classnames'

/**
 * 
 */
export function ResolvedState (properties: ResolvedState.Properties) {
  return (
    <div className={classnames('page page-loading', properties.className)}>
      <div className='layout layout-centered'>
        <div className='container-fluid'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-10 col-md-8 col-lg-6 col-xl-6 text-center'>
              <img className='img-fluid' src='./images/logo.svg' />
            </div>
          </div>
          <div className='row justify-content-center align-items-center'>
            <div className='col-10 col-md-8 col-lg-6 col-xl-6 text-center'>
              <br/>
              <br/>
              <br/>
              Document chargé avec succès !
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace ResolvedState {
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