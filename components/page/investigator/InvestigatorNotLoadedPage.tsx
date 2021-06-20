import React from 'react'
import classnames from 'classnames'

import { ApplicationEvent } from '../../../typescript/application/ApplicationEvent'
import { Empty } from '../../../typescript/utils'

const HomeImage = require('../../../public/images/logo.svg').default

/**
 * 
 */
export class InvestigatorNotLoadedPage extends React.PureComponent<InvestigatorNotLoadedPage.Properties> {
  /**
   * 
   */
  public static readonly defaultProps: Readonly<InvestigatorNotLoadedPage.Properties> = Object.freeze({
    /**
     * 
     */
    onChange: Empty.callback,

    /**
     * 
     */
    className: undefined
  })
  
  /**
   * 
   */
  public constructor(properties: Readonly<InvestigatorNotLoadedPage.Properties>) {
    super(properties)
    
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * 
   */
  public handleClick (event: React.MouseEvent<HTMLDivElement>): void {
    this.props.onChange(ApplicationEvent.showLoadingPage())
  }

  /**
   * 
   */
  public render(): React.ReactElement {
    return (
      <div onClick={this.handleClick} className={classnames('layout layout-centered is-clickable', this.props.className)}>
        <div className='container-fluid'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-10 col-md-8 col-lg-6 col-xl-6 text-center'>
              <HomeImage className='img-fluid' />
            </div>
          </div>
          <div className='row justify-content-center align-items-center'>
            <div className='col-10 col-md-8 col-lg-6 col-xl-6 text-center'>
              <br/>
              <br/>
              <br/>
              Aucun investigateur n'est présentement chargé.
              <br/>
              <br/>
              <br/>
              <button className='btn btn-primary btn-block'>Choisir un investigateur</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 
 */
export namespace InvestigatorNotLoadedPage {
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
    className?: string | undefined,

    /**
     * 
     */
    onChange?: ApplicationCallback | undefined
  }
}