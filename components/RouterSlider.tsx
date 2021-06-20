import React, { ReactNode } from 'react'
import { NextRouter } from 'next/router'

import { CSSTransition } from 'react-transition-group'

/**
 * 
 */
type Entry = {
  /**
   * 
   */
  path: string,

  /**
   * 
   */
  children: React.ReactNode
}


/**
 * 
 */
export class RouterSlider extends React.Component<RouterSlider.Properties> {
  /**
   * 
   */
  private readonly _slides: Readonly<Entry>[]

  /**
   * 
   */
  public constructor (properties: RouterSlider.Properties) {
    super(properties)

    this._slides = [ ]

    this.handleSlideRendering = this.handleSlideRendering.bind(this)
  }

  /**
   * 
   */
  private stackNextSlide(): void {
    const path: string = this.props.router.pathname
    const children: ReactNode = this.props.children
    const slides: Readonly<Entry>[] = this._slides
    
    if (slides.length < 1) {
      slides.push({ path, children })
    } else {
      const lastIndex: number = slides.length - 1
      const lastEntry: Readonly<Entry> = slides[lastIndex]

      if (lastEntry.path !== path) {
        slides.push({ path, children })
      } else if (lastEntry.children !== children) {
        slides[lastIndex] = { path, children }
      }

      while (slides.length > 2) {
        slides.shift()
      }
    }
  }


  /**
   * @see React.Component.Render
   */
  public render () : React.ReactElement {
    this.stackNextSlide()

    return (
      <div className='slider slider-router'>
        { this._slides.map(this.handleSlideRendering) }
      </div>
    )
  }

  /**
   * 
   */
  private handleSlideRendering (entry: Readonly<Entry>, index: number): React.ReactElement {
    const transitionProperties: CSSTransition.Properties = {
      in: index === this._slides.length - 1,
      unmountOnExit: true,
      classNames: 'is',
      timeout: 400
    }

    return (
      <CSSTransition key={entry.path} {...transitionProperties}>
        <div className='slider-slide'>
          { entry.children }
        </div>
      </CSSTransition>
    )
  }
}

/**
 * 
 */
export namespace RouterSlider {
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
    router: NextRouter,

    /**
     * 
     */
    children: React.ReactNode
  }
}
