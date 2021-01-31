import React from 'react'
import { ReactElement } from 'react'

import Head from 'next/head'

import { ConnectedRepositoryPage } from '../components/repository/ConnectedRepositoryPage'

/**
*
*/
export default function index (properties : index.Properties) : ReactElement {
  return (
    <div className='application' id='application'>
      <Head>
        <title>Corvus</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossOrigin="anonymous" />
      </Head>
      <ConnectedRepositoryPage />
    </div>
  )
}

export namespace index {
  /**
  *
  */
  export type Properties = any
}
