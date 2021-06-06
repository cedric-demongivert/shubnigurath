import { UnidocReductionInput } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'
import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'

import { Empty } from '../utils/Empty'

import { Name } from '../Name'

import { CommandList } from './validator/command'
import { CommandListElement } from './validator/command'
import { validateCommandList } from './validator/command'

/**
 * 
 */
export namespace NameCommand {
  /**
   * 
   */
  const COMMAND: CommandList = CommandList.capture(
    CommandListElement.anywhere.requiredCommand('first', UnidocKissValidator.requireText),
    CommandListElement.anywhere.requiredCommand('last', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('short', UnidocKissValidator.requireText)
  )

  /**
   * 
   */
  export function validate(): UnidocKissValidator {
    return validateCommandList(COMMAND)
  }

  /**
   * 
   */
  export function* reduce(): UnidocReducer<Name> {
    let first: string = Empty.STRING
    let last: string = Empty.STRING
    let short: string | undefined = undefined

    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    while (true) {
      let current: UnidocReductionInput = yield UnidocReductionRequest.CURRENT

      if (current.isStartOfAnyTag()) {
        if (current.isStartOfTag('first')) {
          first = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('last')) {
          last = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('short')) {
          short = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else {
          yield* UnidocReducer.skipTag()
        }
      } else if (current.isEnd()) {
        return Name.create({
          first,
          last,
          short
        })
      } else {
        current = yield UnidocReductionRequest.NEXT
      }
    }
  }
}