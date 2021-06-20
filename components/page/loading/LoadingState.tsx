import React from 'react'
import classnames from 'classnames'
import { Loader } from '../../Loader'

const HomeImage = require('../../../public/images/logo.svg').default

/**
 * 
 */
export function LoadingState (properties: LoadingState.Properties) {
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
            <Loader>Chargement de {properties.file.name}</Loader>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 
 */
export namespace LoadingState {
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
    file: File
  }
}