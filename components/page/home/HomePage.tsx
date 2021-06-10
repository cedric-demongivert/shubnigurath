import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { Investigator } from '../../../typescript/Investigator'
import { InvestigatorPage } from '../../InvestigatorPage'

import { LoadingPage } from '../loading/LoadingPage'

import { HomePageState } from './HomePageState'

/**
 * 
 */
export class HomePage extends React.Component<HomePage.Properties, HomePage.State> {
  /**
   * 
   */
  public constructor (properties: LoadingPage.Properties) {
    super(properties)

    this.handleLoading = this.handleLoading.bind(this)
    this.handleReload = this.handleReload.bind(this)
    this.handleCancelling = this.handleCancelling.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      state: HomePageState.LOADING,
      investigator: Investigator.empty()
    }
  }

  /**
   * 
   */
  private handleCancelling () : void {
    this.setState({
      state: HomePageState.INVESTIGATOR
    })
  }

  /**
   * 
   */
  private handleLoading (investigator: Investigator) : void {
    this.setState({
      state: HomePageState.INVESTIGATOR,
      investigator
    })
  }

  /**
   * 
   */
  private handleReload () : void {
    this.setState({
      state: HomePageState.LOADING
    })
  }

  /**
   * 
   */
  private handleChange (next: Investigator) : void {
    this.setState({
      investigator: next
    })
  }

  /**
   * 
   */
  public render () : React.ReactElement {
    return (
      <div className='layout layout-slider'>
        <CSSTransition 
          in={this.state.state === HomePageState.LOADING}
          unmountOnExit  
          classNames={'is'} 
          timeout={400}
        >{ this.renderLoadingPage() }</CSSTransition>
        <CSSTransition 
          in={this.state.state === HomePageState.INVESTIGATOR}
          unmountOnExit  
          classNames={'is'} 
          timeout={400}
        >{ this.renderCharacterPage() }</CSSTransition>
      </div>
    )
  }

  /**
   * 
   */
  public renderLoadingPage (): React.ReactElement {
    return (
      <LoadingPage 
        cancellable={this.state.investigator !== Investigator.EMPTY}
        onLoad={this.handleLoading} 
        onCancel={this.handleCancelling} 
      />
    )
  }

  /**
   * 
   */
  public renderCharacterPage (): React.ReactElement {
    return (
      <InvestigatorPage 
        onReload={this.handleReload}
        onChange={this.handleChange}
        value={this.state.investigator}
      />
    )
  }
}

/**
 * 
 */
export namespace HomePage {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    className?: string | undefined
  }

  /**
   * 
   */
  export type LoadingState = {
    /**
     * 
     */
    state: HomePageState.LOADING,

    /**
     * 
     */
    investigator: Investigator
  }

  /**
   * 
   */
  export type CharacterState = {
    /**
     * 
     */
    state: HomePageState.INVESTIGATOR,

    /**
     * 
     */
    investigator: Investigator
  }

  /**
   * 
   */
  export type State = LoadingState | CharacterState
}