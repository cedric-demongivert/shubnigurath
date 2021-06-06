import React from 'react'
import { Component } from 'react'
import { ReactElement } from 'react'

import { InvestigatorPage } from './InvestigatorPage'
import { Investigator } from '../typescript/Investigator'

import { Loader } from './Loader'

import { readInvestigator } from '../typescript/unidoc/readInvestigator'

/**
 * 
 */
export class Unidoc extends Component<Unidoc.Properties, Unidoc.State> {
  /**
   * 
   */
  public constructor(properties: Unidoc.Properties) {
    super(properties)

    this.handleUnidocResult = this.handleUnidocResult.bind(this)

    this.state = { value: undefined }
  }

  /**
   * 
   */
  public componentDidMount(): void {
    readInvestigator(this.props.value).then(this.handleUnidocResult)
  }

  /**
   * 
   */
  public handleUnidocResult(result: Investigator) : void {
    this.setState({ value: result })
  }

  /**
   * 
   */
  public render(): ReactElement {
    if (this.state.value) {
      return <InvestigatorPage value={this.state.value} />
    } else {
      return <Loader />
    }
  }

}

/**
 * 
 */
export namespace Unidoc {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    value: string
  }

  /**
   * 
   */
  export type State = {
    /**
     * 
     */
    value: Investigator | undefined
  }
}