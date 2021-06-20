import React from 'react'
import { NextRouter } from 'next/router'


import { Application } from '../components/Application'

import '../scss/app.scss'

/**
 * 
 */
export default function application (properties: Readonly<application.Properties>): React.ReactElement {
  return (
    <Application router={properties.router}>
      <properties.Component {...properties.pageProps} />
    </Application>
  )
} 

/**
 * 
 */
export namespace application {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    Component: React.JSXElementConstructor<any>,

    /**
     * 
     */
    router: NextRouter

    /**
     * 
     */
    pageProps: object
  }
}