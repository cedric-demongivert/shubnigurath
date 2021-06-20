import React from 'react'
import classnames from 'classnames'

const HomeImage = require('../../../public/images/logo.svg').default

/**
 * 
 */
export function ResolvedState (properties: ResolvedState.Properties) {
  return (
    <div className={classnames('layout layout-centered', properties.className)}>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-10 col-md-8 col-lg-6 col-xl-6 text-center'>
            <HomeImage className='img-fluid' />
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