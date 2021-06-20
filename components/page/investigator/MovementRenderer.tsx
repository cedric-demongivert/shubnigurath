import React from 'react'

import { Triplet } from '../../layout/Triplet'

/**
 * 
 */
export function MovementRenderer (properties: MovementRenderer.Properties): React.ReactElement {
  return (
    <Triplet superscript='+1' subscript='-1'>
      { properties.value }
    </Triplet>
  )
}

/**
 * 
 */
export namespace MovementRenderer {
  /**
   * 
   */
  export type Properties = {
    /**
     * 
     */
    readonly value: number
  }
}