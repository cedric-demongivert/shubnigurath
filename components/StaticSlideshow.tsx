import React, { ReactNode } from "react"
import classnames from 'classnames'

import { Empty } from "../typescript/utils"
import { Toggler } from "../typescript/Toggler"

import { Slide } from "./Slide"

/**
 * 
 */
const IS_VERTICAL: Toggler = Toggler.create('vertical')

/**
 * 
 */
export class StaticSlideshow extends React.PureComponent<StaticSlideshow.Properties> {
  /**
   * 
   */
  public static defaultProps: Readonly<StaticSlideshow.Properties> = {
    /**
     * 
     */
    children: Empty.ARRAY,

    /**
     * 
     */
    index: 0,

    /**
     * 
     */
    vertical: false
  }

  /**
   * 
   */
  public constructor (properties: StaticSlideshow.Properties) {
    super(properties)
  }

  /**
   * 
   */
  public get style (): object {
    if (this.props.vertical) {
      return { marginTop: '-' + (this.props.index * 100) + '%'}
    } else {
      return { marginLeft: '-' + (this.props.index * 100) + '%'}
    }
  }

  /**
   * 
   */
  public render (): React.ReactElement {
    return (
      <div className={classnames('slideshow', IS_VERTICAL.toggle(this.props.vertical), this.props.className)}>
        <div className='slideshow-slides' style={this.style}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

/**
 * 
 */
export namespace StaticSlideshow {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    children?: ReactNode | undefined,

    /**
     * 
     */
    index?: number | undefined,

    /**
     * 
     */
    vertical?: boolean | undefined,

    /**
     * 
     */
    className?: string | undefined
  }
}