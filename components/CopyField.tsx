import React, { PureComponent, ReactNode } from 'react'
import { ReactElement } from 'react'
import { MouseEvent } from 'react'
import { KeyboardEvent } from 'react'

import classnames from 'classnames'

import { Focusable } from './Focusable'
import copy from 'clipboard-copy'

/**
 * 
 */
export class CopyField extends PureComponent<CopyField.Properties, CopyField.State> {
  /**
   * 
   */
  public constructor (properties: CopyField.Properties) {
    super(properties)

    this.state = { copied: 0 }

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
  }

  /**
   * 
   */
  public handleClick (event: MouseEvent): void {
    this.copy()
  }

  /**
   * 
   */
  public handleKeyPress (event: KeyboardEvent): void {
    if (event.key === ' ') this.copy()
  }

  /**
   * 
   */
  public handleTimeout (): void {
    this.setState({ copied: 0 })
  }

  /**
   * 
   */
  public async copy (): Promise<void> {
    await copy(this.props.value)

    if (this.state.copied > 0) {
      window.clearTimeout(this.state.copied)
    }

    this.setState({ copied: window.setTimeout(this.handleTimeout, 600) })
  }

  /**
   * @see React.Component.render
   */
  public render (): ReactElement {
    return (
      <Focusable.Element focus={this.props.focus} onFocus={this.props.onFocus} onBlur={this.props.onBlur}>
        <div 
          className={classnames('field is-clickable', this.props.className)}
          onClick={this.handleClick} 
          onKeyPress={this.handleKeyPress}
        >
          { this.props.children }
          { this.renderToolTip() }
        </div>
      </Focusable.Element>
    )
  }

  /**
   * 
   */
  public renderToolTip (): ReactElement {
    if (this.state.copied > 0) {
      return (
        <div className='layout layout-filler'>
            <div className='card layout layout-centered'>
              Copié
            </div>
        </div>
      )
    } else {
      return null
    }
  }
}

/**
 * 
 */
export namespace CopyField {
  /**
   * 
   */
  export type State = {
    /**
     * 
     */
    readonly copied: number
  }

  /**
   * 
   */
  export type RequiredProperties = {
    /**
     * 
     */
    readonly children: ReactNode,

    /**
     * 
     */
    readonly value: string
  }

  /**
   * 
   */
  export type OptionalProperties = {
    /**
     * 
     */
    readonly className?: string | undefined
  }

  /**
   * 
   */
  export type Properties = RequiredProperties & OptionalProperties & Focusable.Properties
}