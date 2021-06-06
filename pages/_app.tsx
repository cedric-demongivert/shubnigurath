import React from 'react'
import { JSXElementConstructor } from 'react'
import { ReactElement } from 'react'
import { PureComponent } from 'react'

import '../scss/app.scss'

export default class Application extends PureComponent<Application.Properties> {
  public render () : ReactElement {
    return (
      <this.props.Component { ...this.props.pageProps } />
    )
  }
}


export namespace Application {
  export type Properties = {
    pageProps: any,
    Component: JSXElementConstructor<any>
  }
}
