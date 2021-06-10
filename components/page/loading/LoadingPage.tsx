import React from 'react'
import { 
  tokenize, 
  parse,
  UnidocEvent, 
  UnidocProducer, 
  UnidocProducerEvent, 
  UnidocReducer, 
  UnidocValidationEvent,
  UnidocValidator 
} from '@cedric-demongivert/unidoc'

import { UnidocCommand } from '../../../typescript/unidoc/UnidocCommand'
import { InvestigatorCommand } from '../../../typescript/unidoc/InvestigatorCommand'
import { Investigator } from '../../../typescript/Investigator'
import { UnidocFileSymbolProducer } from '../../../typescript/unidoc/UnidocFileSymbolProducer'
import { Empty } from '../../../typescript/utils'

import { InitialState } from './InitialState'
import { LoadingState } from './LoadingState'
import { ResolvedState } from './ResolvedState'
import { LoadingPageState } from './LoadingPageState'

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
    onLoad: Empty.callback
  }

  /**
   * 
   */
  public constructor (properties: LoadingPage.Properties) {
    super(properties)

    this.handleFileSelection = this.handleFileSelection.bind(this)
    this.handleFileValidation = this.handleFileValidation.bind(this)
    this.handleFileReduction = this.handleFileReduction.bind(this)

    this.state = {
      state: LoadingPageState.INITIAL,
      file: undefined,
      source: undefined,
      error: undefined
    }
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

    this.props.onLoad(value)
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

    validator.addEventListener(UnidocProducerEvent.PRODUCTION, this.handleFileValidation)
    reducer.addEventListener(UnidocProducerEvent.PRODUCTION, this.handleFileReduction)

    this.setState({ 
      state: LoadingPageState.LOADING,
      file,
      source,
      error: undefined
    }, source.read.bind(source))
  }

  /**
   * 
   */
  public render () : React.ReactElement {
    switch (this.state.state) {
      case LoadingPageState.INITIAL:
        return this.renderInitialState()
      case LoadingPageState.LOADING:
        return this.renderLoadingState()
        case LoadingPageState.RESOLVED:
          return this.renderResolvedState()
      default:
        throw new Error(
          'Unable to render loading page in state ' + LoadingPageState.toDebugString(this.state.state) + 
          ' because no rendering factory was defined for that.'
        )
    }
  }

  /**
   * 
   */
  public renderInitialState (): React.ReactElement {
    return <InitialState 
      cancellable={this.props.cancellable} 
      onCancel={this.props.onCancel} 
      className={this.props.className} 
      onSelection={this.handleFileSelection} 
    />
  }

  /**
   * 
   */
  public renderLoadingState (): React.ReactElement {
    return <LoadingState className={this.props.className} file={this.state.file} />
  }

  /**
   * 
   */
  public renderResolvedState (): React.ReactElement {
    return <ResolvedState className={this.props.className} />
  }
}

/**
 * 
 */
export namespace LoadingPage {
  /**
   * 
   */
  export type LoadCallback = (result: Investigator) => void

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
    cancellable?: boolean | undefined,

    /**
     * 
     */
    onLoad?: LoadCallback | undefined,


    /**
     * 
     */
     onCancel?: () => void | undefined
  }

  /**
   * 
   */
  export type InitialState = {
    /**
     * 
     */
    state: LoadingPageState.INITIAL,

    /**
     * 
     */
    file: undefined,

    /**
     * 
     */
    source: undefined,

    /**
     * 
     */
    error: undefined
  }

  /**
   * 
   */
  export type LoadingState = {
    /**
     * 
     */
    state: LoadingPageState.LOADING,

    /**
     * 
     */
    file: File,

    /**
     * 
     */
    source: UnidocFileSymbolProducer,

    /**
     * 
     */
    error: undefined
  }

  /**
   * 
   */
  export type FailureState = {
    /**
     * 
     */
    state: LoadingPageState.FAILURE,

    /**
     * 
     */
    file: File,

    /**
     * 
     */
    source: UnidocFileSymbolProducer,

    /**
     * 
     */
    error: Error
  }

  /**
   * 
   */
  export type ResolvedState = {
    /**
     * 
     */
    state: LoadingPageState.RESOLVED,

    /**
     * 
     */
    file: File,

    /**
     * 
     */
    source: UnidocFileSymbolProducer,

    /**
     * 
     */
    error: undefined
  }

  /**
   * 
   */
  export type State = InitialState | LoadingState | FailureState | ResolvedState
}