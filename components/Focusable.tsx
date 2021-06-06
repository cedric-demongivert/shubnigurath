import { cloneElement, createRef, RefObject } from 'react'
import { FocusEvent } from 'react'
import { PureComponent } from 'react'
import { ReactElement } from 'react'

import classNames from 'classnames'

import { Toggler } from '../typescript/Toggler'
import { Empty } from '../typescript/utils'

/**
 * 
 */
const IS_FOCUS: Toggler = Toggler.create('is-focus')

/**
 * 
 */
export namespace Focusable {
  /**
   * 
   */
  export class Element extends PureComponent<Element.Properties, Element.State> {
    /**
     * 
     */
    private readonly reference: RefObject<HTMLElement>

    /**
     * 
     */
    public constructor(properties: Element.Properties) {
      super(properties)
      this.reference = createRef()
      this.state = { focus: false }

      this.handleBlur = this.handleBlur.bind(this)
      this.handleFocus = this.handleFocus.bind(this)
    }

    /**
     * 
     */
    public handleFocus (event: FocusEvent): void {
      this.setState({ focus: true })
      this.props.onFocus(event)
    }

    /**
     * 
     */
    public handleBlur (event: FocusEvent): void {
      this.setState({ focus: false })
      this.props.onBlur(event)
    }

    /**
     * 
     */
    public componentDidUpdate(): void {
      if (this.props.focus === true && document.activeElement !== this.reference.current) {
        this.reference.current.focus()
      }
      
      if (this.props.focus === false && document.activeElement === this.reference.current) {
        this.reference.current.blur()
      }
    }

    /**
     * 
     */
    public componentDidMount(): void {
      if (this.props.focus === true && document.activeElement !== this.reference.current) {
        this.reference.current.focus()
      }

      if (this.props.focus === false && document.activeElement === this.reference.current) {
        this.reference.current.blur()
      }
    }

    /**
     * @see React.Component.render
     */
    public render(): ReactElement {
      return cloneElement(
        this.props.children, {
          tabIndex: 0,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          className: classNames(
            this.props.children.props.className, 
            'is-focusable',
            IS_FOCUS.toggle(this.props.focus == null ? this.state.focus : this.props.focus)
          ),
          ref: this.reference
        }
      )
    }
  }
  
  /**
   * 
   */
  export namespace Element {
    /**
     * 
     */
    export const defaultProps: OptionalProperties = {
      /**
       * 
       */
      onFocus: Empty.callback,

      /**
       * 
       */
      onBlur: Empty.callback,

      /**
       * 
       */
      focus: undefined
    }

    /**
     * 
     */
    export type OptionalProperties = Focusable.Properties

    /**
     * 
     */
    export type RequiredProperties = {
      /**
       * 
       */
      readonly children: ReactElement
    }

    /**
     * 
     */
    export type Properties = OptionalProperties & RequiredProperties

    /**
     * 
     */
    export type State = {
      /**
       * 
       */
      readonly focus: boolean
    }
  }

  /**
   * 
   */
  export type FocusListener = (event: FocusEvent) => void

  /**
   * 
   */
  export type BlurListener = (event: FocusEvent) => void

  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    readonly onFocus?: FocusListener,

    /**
     * 
     */
    readonly onBlur?: BlurListener,

    /**
     * 
     */
    readonly focus?: boolean | undefined
  }
}