import React from 'react'
import { ReactElement } from 'react'

import Head from 'next/head'

import { VanillaLayout } from '../components/layout/VanillaLayout'
import { Investigator } from '../typescript/Investigator'
import { ApplicationEvent } from '../typescript/application/ApplicationEvent'
import { InvestigatorPage } from '../components/page/investigator/InvestigatorPage'
import { InvestigatorNotLoadedPage } from '../components/page/investigator/InvestigatorNotLoadedPage'

/**
*
*/
export default function investigator (properties : investigator.Properties) : ReactElement {
  return (
    <VanillaLayout>
      <Head>
        <title>Shubniggurath - Investigateur</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      { 
        properties.investigator ? <InvestigatorPage { ...properties } /> : <InvestigatorNotLoadedPage { ...properties } />
      }
      
    </VanillaLayout>
  )
}


export namespace investigator {
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
