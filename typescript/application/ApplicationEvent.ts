import { Investigator } from '../Investigator'
import { ApplicationAction } from './ApplicationAction'

/**
 * 
 */
export type ApplicationEvent = any

/**
 * 
 */
export namespace ApplicationEvent {
  /**
   * 
   */
  export type Use = {
    /**
     * 
     */
    type: ApplicationAction.USE,

    /**
     * 
     */
    payload: Investigator
  }

  /**
   * 
   */
  export type ShowInvestigatorPage = {
    /**
     * 
     */
    type: ApplicationAction.SHOW_INVESTIGATOR_PAGE
  }

  /**
   * 
   */
  export type ShowLoadingPage = {
    /**
     * 
     */
    type: ApplicationAction.SHOW_LOADING_PAGE
  }

  /**
   * 
   */
  export function use(investigator: Investigator): Readonly<Use> {
    return Object.freeze({
      type: ApplicationAction.USE,
      payload: investigator
    })
  }

  /**
   * 
   */
  const SHOW_INVESTIGATOR_PAGE: Readonly<ShowInvestigatorPage> = Object.freeze({
    type: ApplicationAction.SHOW_INVESTIGATOR_PAGE
  })

  /**
   * 
   */
  export function showInvestigatorPage(): Readonly<ShowInvestigatorPage> {
    return SHOW_INVESTIGATOR_PAGE
  }

  /**
   * 
   */
  const SHOW_LOADING_PAGE: Readonly<ShowLoadingPage> = Object.freeze({
    type: ApplicationAction.SHOW_LOADING_PAGE
  })

  /**
   * 
   */
  export function showLoadingPage(): Readonly<ShowLoadingPage> {
    return SHOW_LOADING_PAGE
  }
}