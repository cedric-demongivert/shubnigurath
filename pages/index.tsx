import React from 'react'
import { ReactElement } from 'react'

import Head from 'next/head'

import { HomePage } from '../components/page/home/HomePage'

/**
*
*/
export default function index (properties : index.Properties) : ReactElement {
  return (
    <div className='application' id='application'>
      <Head>
        <title>Shubniggurath</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <HomePage />
    </div>
  )
}


export namespace index {
  /**
  *
  */
  export type Properties = {
    
  }
}
