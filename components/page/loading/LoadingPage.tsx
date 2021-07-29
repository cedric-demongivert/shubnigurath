import React from 'react'
import classnames from 'classnames'
import { 
  tokenize, 
  parse,
  UnidocEvent, 
  UnidocProducer, 
  UnidocReducer, 
  UnidocValidationEvent,
  UnidocValidator 
} from '@cedric-demongivert/unidoc'

import { Empty } from '../../../typescript/utils'
import { UnidocFileSymbolProducer } from '../../../typescript/unidoc/UnidocFileSymbolProducer'
import { UnidocCommand } from '../../../typescript/unidoc/UnidocCommand'
import { InvestigatorCommand } from '../../../typescript/unidoc/InvestigatorCommand'
import { ApplicationEvent } from '../../../typescript/application/ApplicationEvent'
import { Investigator } from '../../../typescript/Investigator'

import { Images } from '../../Images'
import { Loader } from '../../Loader'
import { StaticSlideshow  } from '../../StaticSlideshow'
import { Premades } from './Premades'
import { LoadingPageState } from './LoadingPageState'
import { Slide } from '../../Slide'


/**
 * 
 */
export class LoadingPage extends React.Component<LoadingPage.Properties, LoadingPage.State> {
  /**
   * 
   */
  public static readonly defaultProps: Readonly<LoadingPage.Properties> = {
    /**
     * 
     */
    onChange: Empty.callback
  }

  /**
   * 
   */
  private readonly _input: React.RefObject<HTMLInputElement>

  /**
   * 
   */
  public constructor (properties: LoadingPage.Properties) {
    super(properties)

    this.state = {
      premades: undefined,
      state: LoadingPageState.INITIAL,
      file: undefined,
      scroll: 0,
      mouse: -1
    }

    this.handlePremadesLoading = this.handlePremadesLoading.bind(this)
    this.handlePremadeRendering = this.handlePremadeRendering.bind(this)
    this.handlePremadeSlideRendering = this.handlePremadeSlideRendering.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleSilentAction = this.handleSilentAction.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleFileSelection = this.handleFileSelection.bind(this)
    this.handleFileValidation = this.handleFileValidation.bind(this)
    this.handleFileReduction = this.handleFileReduction.bind(this)
    this.handleCancellation = this.handleCancellation.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleMouseEnterOption = this.handleMouseEnterOption.bind(this)
    this.handleMouseLeaveOption = this.handleMouseLeaveOption.bind(this)

    this._input = React.createRef()

    Premades.load().then(this.handlePremadesLoading)
  }

  /**
   * 
   */
  public handleMouseEnterOption (event: React.MouseEvent<HTMLButtonElement>): void {
    const target: HTMLButtonElement = event.currentTarget
    const basis: number = (target.parentNode.firstElementChild as any).offsetTop
    
    this.setState({ mouse: target.offsetTop - basis })
  }

  /**
   * 
   */
  public handleMouseLeaveOption (event: React.MouseEvent<HTMLButtonElement>): void {
    this.setState({ mouse: -1 })
  }

  /**
   * 
   */
  public handlePremadesLoading(premades: Investigator[]): void {
    premades.sort(Investigator.compareByName)
    this.setState({ premades })
  }

  /**
   * 
   */
  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.files.length > 0) {
      this.setState({ 
        state: LoadingPageState.LOADING,
        file: event.target.files[0] 
      }, this.handleFileSelection.bind(undefined, event.target.files[0]))
    }
  }

  /**
   * 
   */
  private handleSilentAction(event: React.SyntheticEvent): void {
    event.stopPropagation()
    event.preventDefault()
  }

  /**
   * 
   */
  private handleDrop(event: React.DragEvent<HTMLInputElement>): void {
    event.stopPropagation()
    event.preventDefault()

    const dragged: DataTransfer = event.dataTransfer

    if (dragged.files.length > 0) {
      for (const file of dragged.files) {
        if (file.name.endsWith('.txt')) {
          this.setState({ 
            state: LoadingPageState.LOADING,
            file
          }, this.handleFileSelection.bind(undefined, file))
          break
        }
      }
    }
  }

  /**
   * 
   */
  private handleScroll(event: React.MouseEvent<HTMLDivElement, WheelEvent>): void {
    this.setState({ scroll: event.currentTarget.scrollTop })
  }

  /**
   * 
   */
  private handlePremadeSelection (index: number): void {
    this.props.onChange(ApplicationEvent.use(this.state.premades[index]))
    this.props.onChange(ApplicationEvent.showInvestigatorPage())
  }

  /**
   * 
   */
  private handleClick(): void {
    if (this.state.state !== LoadingPageState.INITIAL) {
      return
    }

    const selected: number = this.getSelected()

    if (selected < 1) {
      this._input.current.click()
    } else if (selected === 1) {
      if (this.props.current) {
        this.handleCancellation()
      }
    } else {
      this.handlePremadeSelection(selected - 2)
    }
  }

  /**
   * 
   */
  private handleCancel(event: React.MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()
    this.props.onChange(ApplicationEvent.showInvestigatorPage())
  }

  
  /**
   * 
   */
   private handleCancellation () : void {
    this.props.onChange(ApplicationEvent.showInvestigatorPage())
  }

  /**
   * 
   */
  private handleFileValidation (validation: UnidocValidationEvent) : void {
    // @TODO error-check
    //console.log(validation.toString())
  }

  /**
   * 
   */
  private handleFileReduction (value: Investigator) : void {
    this.setState({ 
      state: LoadingPageState.RESOLVED
    })

    this.props.onChange(ApplicationEvent.use(value))
    this.props.onChange(ApplicationEvent.showInvestigatorPage())
  }

  /**
   * 
   */
  private handleFileSelection(file: File): void {
    const source: UnidocFileSymbolProducer = UnidocFileSymbolProducer.create(file)
    const events: UnidocProducer<UnidocEvent> = parse(tokenize(source))
    const validator: UnidocValidator = UnidocValidator.kiss(UnidocCommand.validateUnidoc.factory(InvestigatorCommand.validate))

    validator.subscribe(events)

    const reducer: UnidocProducer<Investigator> = UnidocReducer.reduce.validation(validator, UnidocCommand.reduce.factory(InvestigatorCommand.reduce))

    validator.on('next', this.handleFileValidation)
    reducer.on('next', this.handleFileReduction)

    this.setState({ 
      state: LoadingPageState.LOADING,
      file
    }, source.read.bind(source))
  }

  /**
   * 
   */
  public getSelected(): number {
    if (this.state.mouse < 0) {
      return (((this.state.scroll + 50) / 100) << 0)
    } else {
      return ((this.state.mouse / 100) << 0)
    }
  }

  /**
   * 
   */
  public isSelected(index: number): boolean {
    return this.getSelected() === index
  }

  /**
   * 
   */
  public isFileLoadingSelected(): boolean {
    return this.isSelected(0)
  }

  /**
   * 
   */
  public isCancellationSelected(): boolean {
    return this.isSelected(1)
  }

  /**
   * 
   */
  public isPremadeSelected(index: number): boolean {
    return this.isSelected(index + 2)
  }

  /**
   * 
   */
  public render () : React.ReactElement {
    return (
      <div 
        onDrop={this.handleDrop} 
        onDragEnter={this.handleSilentAction}
        onDragOver={this.handleSilentAction}
        onClick={this.handleClick}
        className={classnames('layout layout-loading-page', this.props.className)}
      >
        <input 
          onChange={this.handleInputChange}
          ref={this._input} 
          type='file' 
          accept='text/plain' 
          style={{ display: 'none' }}
        />
        <div 
          className='layout-loading-page-options'
          onScroll={this.handleScroll}
        >
          { this.renderFile() }
          { this.renderCancellation() }
          { this.renderPremades() }
        </div>
        <div className='layout-loading-page-display'>
          <StaticSlideshow index={this.getSelected()}>
            { this.renderFileSlide() }
            { this.renderCancellationSlide() }
            { this.renderPremadeSlides() }
          </StaticSlideshow>
        </div>
      </div>
    )
  }

  /**
   * 
   */
  public renderFile(): React.ReactNode {
    const selected: boolean = this.isFileLoadingSelected()

    return (
      <button 
        className={classnames('loading-option', { 'is-active': selected })}
        aria-pressed={selected}
        disabled={this.state.state !== LoadingPageState.INITIAL}
        onMouseEnter={this.handleMouseEnterOption}
        onMouseDown={this.handleMouseEnterOption}
        onMouseLeave={this.handleMouseLeaveOption}
      >
        <div className='loading-option-icon'>
          <i className="fas fa-upload" />
        </div>
        <div className='loading-option-information'>
          <h1>Charger un document</h1>
        </div>
      </button>
    )
  }
  
  /**
   * 
   */
  public renderCancellation(): React.ReactNode {
    const selected: boolean = this.isSelected(1)

    return (
      <button 
        className={classnames('loading-option', { 'is-active': selected })}
        aria-pressed={selected}
        disabled={!this.props.current || this.state.state !== LoadingPageState.INITIAL}
        onMouseEnter={this.handleMouseEnterOption}
        onMouseDown={this.handleMouseEnterOption}
        onMouseLeave={this.handleMouseLeaveOption}
      >
        <div className='loading-option-icon'>
          <i className="fas fa-undo" />
        </div>
        <div className='loading-option-information'>
          <h1>Retour</h1>
        </div>
      </button>
    )
  }

  /**
   * 
   */
  public renderPremades(): React.ReactNode {
    if (this.state.premades) {
      return this.state.premades.map(this.handlePremadeRendering)
    } else {
      return <Loader>Chargement des prétirés en cours</Loader>
    }
  }

  /**
   * 
   */
  public handlePremadeRendering(premade: Investigator, index: number): React.ReactNode {
    const selected: boolean = this.isSelected(index + 2)

    return (
      <button 
        className={classnames('loading-option is-premade', { 'is-active': selected })}
        aria-pressed={selected} 
        disabled={this.state.state !== LoadingPageState.INITIAL} 
        key={index}
        onMouseEnter={this.handleMouseEnterOption}
        onMouseDown={this.handleMouseEnterOption}
        onMouseLeave={this.handleMouseLeaveOption}
      >
        <div className='loading-option-icon'>
          <div className={'sprite sprite-folder sprite-variation-' + (index % 3)} />
        </div>
        <div className='loading-option-information'>
          <h1>{ premade.summary.name.toString() }</h1>
          <h2>{ premade.summary.job }</h2>
        </div>
      </button>
    )
  }

  /**
   * 
   */
   public renderFileSlide(): React.ReactElement {
    return (
      <Slide>
        <div className='layout layout-centered'>
          <Images.Home className='loading-maturin' />
          <br/>
          <br/>
          Sélectionner une feuille.
        </div>
      </Slide>
    )
  }
  
  /**
   * 
   */
  public renderCancellationSlide(): React.ReactElement {
    if (this.props.current) {
      return (
        <Slide>
          <div className='layout layout-bottom text-center'>
            <div className={'sprite sprite-character sprite-variation-' + this.props.current.summary.alias.toLowerCase().replaceAll('é', 'e')} />
          </div>
        </Slide>
      )
    } else {
      return (
        <Slide>
          <div className='layout layout-centered'>
            <Images.Home className='loading-maturin' />
            <br/>
            <br/>
            Aucun document chargé.
          </div>
        </Slide>
      )
    }
  }

  /**
   * 
   */
  public renderPremadeSlides(): React.ReactNode {
    if (this.state.premades) {
      return this.state.premades.map(this.handlePremadeSlideRendering)
    } else {
      return <Loader>Chargement des prétirés en cours</Loader>
    }
  }

  /**
   * 
   */
  public handlePremadeSlideRendering(premade: Investigator, index: number): React.ReactNode {
    return (
      <Slide key={index}>
        <div className='layout layout-bottom text-center'>
          <div className={'sprite sprite-character sprite-variation-' + premade.summary.alias.toLowerCase().replaceAll('é', 'e')} />
        </div>
      </Slide>
    )
  }
}

/**
 * 
 */
export namespace LoadingPage {
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
    current?: Investigator | undefined,

    /**
     * 
     */
    onChange?: ApplicationCallback | undefined
  }

  /**
   * 
   */
  export type State = {
    /**
     * 
     */
    premades: undefined | Investigator[],

    /**
     * 
     */
    file: File | undefined,

    /**
     * 
     */
    state: LoadingPageState,

    /**
     * 
     */
    scroll: number,

    /**
     * 
     */
    mouse: number
  }
}