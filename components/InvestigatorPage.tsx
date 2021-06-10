import { PureComponent } from 'react'
import { ReactElement } from 'react'
import classnames from 'classnames'

import { Investigator } from '../typescript/Investigator'

import { SummaryDisplay } from './SummaryDisplay'
import { CharacteristicSetRenderer } from './CharacteristicSetRenderer'
import { StatusDisplay } from './StatusDisplay'
import { AllSkillsDisplay } from './AllSkillsDisplay'
import { UnidocInvestigatorReducer } from '../typescript/unidoc/reducer'


/**
 * 
 */
export class InvestigatorPage extends PureComponent<InvestigatorPage.Properties> {
  /**
   * 
   */
  public constructor (properties: InvestigatorPage.Properties) {
    super(properties)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  /**
   * 
   */
  public handleChange(next: Investigator, previous: Investigator): void {
    this.props.onChange(next, previous)
  }

  /**
   * 
   */
  public handleSave(): void {
    const href: HTMLAnchorElement = document.createElement('a')
    href.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(UnidocInvestigatorReducer.reduce(this.props.value)))
    href.setAttribute(
      'download', 
      this.props.value.summary.name.first.toLocaleLowerCase() + '-' + 
      this.props.value.summary.name.last.toLocaleLowerCase() + '.sheet.unidoc'
    )

    href.style.display = 'none'
    document.body.appendChild(href)

    href.click()

    document.body.removeChild(href)

    href.remove()
  }

  /**
   * 
   */
  public render () : ReactElement {
    return (
      <div className={classnames('page page-investigator', this.props.className)}>
        <div className='layout layout-rotulus'>
          <div className='container'>
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
                    value={this.props.value} 
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
                    value={this.props.value} 
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

            <div className='row'>
              <div className='col-12'>
                <br />
              
                <button className='btn btn-primary btn-block' onClick={this.handleSave}>
                  Sauvegarder la fiche
                </button>

                <button className='btn btn-link btn-block' onClick={this.props.onReload}>
                  Charger une nouvelle fiche
                </button>
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
    onReload?: () => void,

    /**
     * 
     */
    onChange?: (next: Investigator, previous: Investigator) => void,

    /**
     * 
     */
    value: Investigator
  }
}