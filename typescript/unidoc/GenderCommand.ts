import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'

import { Gender } from '../Gender'

/**
 * 
 */
export namespace GenderCommand {
  /**
   * 
   */
  export function* validate(): UnidocKissValidator {
    return yield* UnidocKissValidator.requireToken()
  }

  /**
   * 
   */
  export function* reduce(): UnidocReducer<Gender> {
    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    const type: string = yield* UnidocReducer.reduceToken()
    return type.toLowerCase() === 'male' ? Gender.MALE : Gender.FEMALE
  }
}