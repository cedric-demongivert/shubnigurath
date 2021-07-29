import React from 'react'
import { ReactElement } from 'react'

import Head from 'next/head'

import { LoadingPage } from '../components/page/loading/LoadingPage'
import { VanillaLayout } from '../components/layout/VanillaLayout'
import { Investigator } from '../typescript/Investigator'
import { ApplicationEvent } from '../typescript/application/ApplicationEvent'

/**
*
*/
export default function index (properties : index.Properties) : ReactElement {
  return (
    <VanillaLayout>
      <Head>
        <title>Shubniggurath - Choisir un investigateur</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <LoadingPage current={properties.investigator} {...properties} />
    </VanillaLayout>
  )
}


export namespace index {
  /**
   * 
   */
  export type ApplicationCallback = (event: ApplicationEvent) => void
  
  /**
  *
  */
  export type Properties = {
    /**
     * 
     */
    investigator: Investigator | undefined,

    /**
     * 
     */
    onChange?: ApplicationCallback | undefined
  }
}
