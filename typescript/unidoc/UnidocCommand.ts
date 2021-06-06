import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'

/**
 * 
 */
export namespace UnidocCommand {
  /**
   * 
   * @param validator 
   * @returns 
   */
  export function* validateUnidoc(validator: UnidocKissValidator): UnidocKissValidator {
    yield* UnidocKissValidator.validateStartOfTag('document')
    yield* UnidocKissValidator.validateManyWhitespace()
    yield* validator
    yield* UnidocKissValidator.validateManyWhitespace()
    yield* UnidocKissValidator.validateEndOfTag('document')
    yield* UnidocKissValidator.validateEnd()
    return UnidocKissValidator.output.match()
  }

  /**
   * 
   */
  export namespace validateUnidoc {
    /**
     * 
     */
    export function factory(validator: UnidocKissValidator.Factory): UnidocKissValidator.Factory {
      return function validateUnidocFactory(): UnidocKissValidator {
        return validateUnidoc(validator())
      }
    }
  }

  /**
   *
   */
  export function* reduce<T>(reducer: UnidocReducer<T>): UnidocReducer<T> {
    yield* UnidocReducer.skipStart()
    yield UnidocReductionRequest.NEXT
    yield* UnidocReducer.skipWhitespaces()

    return yield* reducer
  }
}


