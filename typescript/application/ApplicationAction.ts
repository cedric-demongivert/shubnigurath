/**
 * 
 */
export type ApplicationAction = (
  ApplicationAction.USE |
  ApplicationAction.SHOW_INVESTIGATOR_PAGE |
  ApplicationAction.SHOW_LOADING_PAGE
)

/**
 * 
 */
export namespace ApplicationAction {
  /**
   * 
   */
  export type USE = 'application:use'

  /**
   * 
   */
  export const USE: USE = 'application:use'

  /**
   * 
   */
  export type SHOW_INVESTIGATOR_PAGE = 'application:show-investigator-page'

  /**
   * 
   */
  export const SHOW_INVESTIGATOR_PAGE: SHOW_INVESTIGATOR_PAGE = 'application:show-investigator-page'

  /**
   * 
   */
  export type SHOW_LOADING_PAGE = 'application:show-loading-page'

  /**
   * 
   */
  export const SHOW_LOADING_PAGE: SHOW_LOADING_PAGE = 'application:show-loading-page'

  /**
   * 
   */
  export const ALL: ApplicationAction[] = [
    USE,
    SHOW_INVESTIGATOR_PAGE,
    SHOW_LOADING_PAGE
  ]
}