import { PureComponent } from 'react'
import { ReactElement } from 'react'
import classnames from 'classnames'

import { Investigator } from '../typescript/Investigator'

import { SummaryDisplay } from './SummaryDisplay'
import { CharacteristicSetRenderer } from './CharacteristicSetRenderer'
import { StatusDisplay } from './StatusDisplay'
import { AllSkillsDisplay } from './AllSkillsDisplay'
import { Mutables } from '../typescript/Mutables'


/**
 * 
 */
export class InvestigatorPage extends PureComponent<InvestigatorPage.Properties, InvestigatorPage.State> {
  /**
   * 
   */
  public constructor (properties: InvestigatorPage.Properties) {
    super(properties)

    this.state = { value: Mutables.fromInvestigator(properties.value) }

    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * 
   */
  public handleChange(next: Mutables, previous: Mutables): void {
    this.setState({ value: next })
  }

  /**
   * 
   */
  public render () : ReactElement {
    return (
      <div className={classnames('character-sheet', this.props.className)}>
        <div className='container-fluid'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-8 col-md-4 order-md-1 col-lg-3 order-lg-1'>
              <img className='img-fluid' src='/images/logo.svg' />
            </div>

            <div className='col-12 d-block d-md-none'>
              <br />
            </div>

            <div className='col-12 col-md-8 order-md-1 col-lg-6 order-lg-1'>
              <div className='row'>
                <SummaryDisplay value={this.props.value} />
              </div>
            </div>

            <div className='col-12 d-block order-md-3'>
              <br />
            </div>

            <div className='col-12 col-md-6 order-md-3 col-lg-3 order-lg-1'>
              <div className='row'>
                <CharacteristicSetRenderer 
                  investigator={this.props.value} 
                  value={this.state.value} 
                  onChange={this.handleChange} 
                />
              </div>
            </div>

            <div className='col-12 d-block d-md-none order-md-3 order-lg-1 d-lg-block'>
              <br />
            </div>

            <div className='col-12 col-md-6 order-md-3 col-lg order-lg-1'>
              <div className='row'>
                <StatusDisplay 
                  investigator={this.props.value}
                  value={this.state.value} 
                  onChange={this.handleChange} 
                />
              </div>
            </div>

            <div className='col-12 d-block d-md-block order-md-3 order-lg-1'>
              <br />
            </div>

            <div className='col-12 order-md-3 order-lg-1'>
              <div className='row'>
                <AllSkillsDisplay value={this.props.value} />
              </div>
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
export namespace InvestigatorPage {
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
    value: Investigator
  }

  /**
   * 
   */
  export type State = {
    /**
     * 
     */
    value: Mutables
  }
}