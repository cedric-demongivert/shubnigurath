import React from 'react'
import classnames from 'classnames'
import { NextRouter } from 'next/router'

import { ApplicationEvent } from '../typescript/application/ApplicationEvent'
import { ApplicationAction } from '../typescript/application/ApplicationAction'

import { Investigator } from '../typescript/Investigator'

import { RouterSlider } from './RouterSlider'
/**
 * 
 */
export class Application extends React.Component<Application.Properties, Application.State> {
  /**
   * 
   */
  public constructor(properties: Application.Properties) {
    super(properties)

    this.handleChange = this.handleChange.bind(this)

    this.state = { investigator: undefined }
  }

  /**
   * 
   */
  private handleChange(event: ApplicationEvent): void {
    switch (event.type) {
      case ApplicationAction.USE:
        this.setState({ investigator: event.payload })
        return
      case ApplicationAction.SHOW_INVESTIGATOR_PAGE:
        this.props.router.replace('/investigator')
        return
      case ApplicationAction.SHOW_LOADING_PAGE:
        this.props.router.replace('/')
        return
      default:
        throw new Error(
          'Unable to resolve application action "' + event.type + 
          '" as no procedure was defined for that.'
        )
    }
  }

  /**
   * @see React.Component.Render
   */
  public render () : React.ReactElement {
    let connectedChildren: React.ReactElement | undefined = undefined
    
    if (this.props.children) {
      connectedChildren = React.cloneElement(this.props.children, {
        onChange: this.handleChange,
        investigator: this.state.investigator
      })
    }

    return (
      <div className={classnames('application', this.props.className)} id='application'>
        <RouterSlider router={this.props.router}>
          { connectedChildren }
        </RouterSlider>
      </div>
    )
  }
}

/**
 * 
 */
export namespace Application {
  /**
   * 
   */
  export type State = {
    /**
     * 
     */
    investigator: Investigator | undefined
  }

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
    router: NextRouter,

    /**
     * 
     */
    children?: React.ReactElement | undefined
  }
}
