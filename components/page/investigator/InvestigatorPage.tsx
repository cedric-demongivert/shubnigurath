import { PureComponent } from 'react'
import { ReactElement } from 'react'
import classnames from 'classnames'

import { Investigator } from '../../../typescript/Investigator'
import { UnidocInvestigatorReducer } from '../../../typescript/unidoc/reducer'
import { Skill } from '../../../typescript/Skill'
import { ApplicationEvent } from '../../../typescript/application/ApplicationEvent'

import { SummaryRenderer } from './SummaryRenderer'
import { CharacteristicSetRenderer } from './CharacteristicSetRenderer'
import { StatusRenderer } from './StatusRenderer'
import { AllSkillsRenderer } from './AllSkillsRenderer'

const HomeImage = require('../../../public/images/logo.svg').default


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
    this.handleSkillSelection = this.handleSkillSelection.bind(this)
    this.handleLevelup = this.handleLevelup.bind(this)
    this.handleReload = this.handleReload.bind(this)
  }

  /**
   * 
   */
  public handleReload(): void {
    this.props.onChange(ApplicationEvent.showLoadingPage())
  }

  /**
   * 
   */
  public handleChange(next: Investigator, previous: Investigator): void {
    this.props.onChange(ApplicationEvent.use(next))
  }

  /**
   * 
   */
  public handleLevelup(): void {
    this.props.onChange(ApplicationEvent.use(this.props.investigator.levelup()))
  }

  /**
   * 
   */
  public handleSkillSelection(skill: Skill): void {
    this.props.onChange(ApplicationEvent.use(this.props.investigator.toggleForUpdate(skill)))
  }

  /**
   * 
   */
  public handleSave(): void {
    const now: Date = new Date()
    const href: HTMLAnchorElement = document.createElement('a')
    href.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(UnidocInvestigatorReducer.reduce(this.props.investigator)))
    href.setAttribute(
      'download', 
      this.props.investigator.summary.name.first.toLocaleLowerCase() + '-' + 
      this.props.investigator.summary.name.last.toLocaleLowerCase() + '-' + 
      now.getFullYear() + '-' + 
      now.getMonth() + '-' + 
      now.getDay() + '-' + 
      now.getHours() + '-' +
      now.getMinutes() + '-' + 
      now.getSeconds() + '-' +
      now.getMilliseconds() + '.txt'
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
      <div className={classnames('layout layout-page', this.props.className)}>
        <div className='layout layout-sandwich'>
          <div className='container'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-8 col-md-4 order-md-1 col-lg-3 order-lg-1'>
                <HomeImage className='img-fluid' />
              </div>

              <div className='col-12 d-block d-md-none'>
                <br />
              </div>

              <div className='col-12 col-md-8 order-md-1 col-lg-6 order-lg-1'>
                <div className='row'>
                  <SummaryRenderer value={this.props.investigator} />
                </div>
              </div>

              <div className='col-12 d-block order-md-3'>
                <br />
              </div>

              <div className='col-12 col-md-6 order-md-3 col-lg-3 order-lg-1'>
                <div className='row'>
                  <CharacteristicSetRenderer 
                    value={this.props.investigator} 
                    onChange={this.handleChange} 
                  />
                </div>
              </div>

              <div className='col-12 d-block d-md-none order-md-3 order-lg-1 d-lg-block'>
                <br />
              </div>

              <div className='col-12 col-md-6 order-md-3 col-lg order-lg-1'>
                <div className='row'>
                  <StatusRenderer 
                    value={this.props.investigator} 
                    onChange={this.handleChange} 
                  />
                </div>
              </div>

              <div className='col-12 d-block d-md-block order-md-3 order-lg-1'>
                <br />
              </div>

              <div className='col-12 order-md-3 order-lg-1'>
                <div className='row'>
                  <AllSkillsRenderer 
                    value={this.props.investigator}
                    onSelect={this.handleSkillSelection}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <br />
                
                <button className='btn btn-link btn-block' onClick={this.handleLevelup}>
                  Gagner de l'expérience
                </button>
              
                <button className='btn btn-primary btn-block' onClick={this.handleSave}>
                  Sauvegarder la fiche
                </button>

                <button className='btn btn-link btn-block' onClick={this.handleReload}>
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
    onChange?: ApplicationCallback,

    /**
     * 
     */
    investigator: Investigator
  }
}