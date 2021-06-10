import React from 'react'
import classnames from 'classnames'
import { Empty } from '../../../typescript/utils'

/**
 * 
 */
export class InitialState extends React.PureComponent<InitialState.Properties> {
  /**
   * 
   */
  public static readonly defaultProps: InitialState.Properties = Object.seal({
    /**
     * 
     */
    onSelection: Empty.callback
  })

  /**
   * 
   */
  private readonly _input: React.RefObject<HTMLInputElement>

  /**
   * 
   */
  public constructor (properties: InitialState.Properties) {
    super(properties)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleSilentAction = this.handleSilentAction.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this._input = React.createRef()
  }

  /**
   * 
   */
  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.files.length > 0) {
      this.props.onSelection(event.target.files[0])
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
        if (file.name.endsWith('.sheet.unidoc')) {
          this.props.onSelection(file)
          break
        }
      }
    }
  }

  /**
   * 
   */
  private handlePageClick(event: React.MouseEvent<HTMLDivElement>): void {
    this._input.current.click()
  }

  /**
   * 
   */
  private handleCancel(event: React.MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()

    this.props.onCancel()
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
        onClick={this.handlePageClick} 
        className={classnames('page page-loading is-clickable', this.props.className)}
      >
        <div className='layout layout-centered'>
          <div className='container-fluid'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-10 col-md-8 col-lg-6 col-xl-6 text-center'>
                <img className='img-fluid' src='/images/logo.svg' />
              </div>
            </div>
            <div className='row justify-content-center align-items-center'>
              <div className='col-10 col-md-8 col-lg-6 col-xl-6 text-center'>
                <br/>
                <br/>
                <br/>
                Déposez une feuille de personnage ou cliquez pour en choisir une.
                <input 
                  onChange={this.handleInputChange}
                  ref={this._input} 
                  type='file' 
                  accept='.sheet.unidoc' 
                  style={{ display: 'none' }}
                />
                { this.props.cancellable ? <br/> : null }
                { this.props.cancellable ? <br/> : null }
                { this.props.cancellable ? <button className='btn btn-link btn-block' onClick={this.handleCancel}>Annuler</button> : null }
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
export namespace InitialState {
  /**
   * 
   */
  export type SelectionCallback = (file: File) => void

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
    cancellable?: boolean,

    /**
     * 
     */
    onSelection?: SelectionCallback,

    /**
     * 
     */
    onCancel?: () => void | undefined
  }
}