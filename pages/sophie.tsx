import React from 'react'
import { ReactElement } from 'react'

import Head from 'next/head'

import { Unidoc } from '../components/Unidoc'

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

      <div className='container'>
        <div className='row'>
          <div className='page page-character-sheet'>
            <Unidoc value={require('../public/sheets/sophie-lepage.unidoc').default} />
          </div>
        </div>
      </div>
      
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
