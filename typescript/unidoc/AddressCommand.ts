import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'
import { UnidocReductionInput } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'

import { Empty } from '../utils/Empty'

import { Address } from '../Address'

import { CommandList } from './validator/command/CommandList'
import { CommandListElement } from './validator/command/CommandListElement'
import { validateCommandList } from './validator/command/validateCommandList'

/**
 * 
 */
export namespace AddressCommand {
  /**
   * 
   */
  const COMMAND: CommandList = CommandList.capture(
    CommandListElement.anywhere.requiredCommand('country', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('state', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('county', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('city', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('district', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('street', UnidocKissValidator.requireText)
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
  export function* reduce(): UnidocReducer<Address> {
    let country: string = Empty.STRING
    let state: string | undefined = undefined
    let county: string | undefined = undefined
    let city: string | undefined = undefined
    let district: string | undefined = undefined
    let street: string | undefined = undefined

    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    while (true) {
      let current: UnidocReductionInput = yield UnidocReductionRequest.CURRENT

      if (current.isStartOfAnyTag()) {
        if (current.isStartOfTag('country')) {
          country = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('city')) {
          city = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('county')) {
          county = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('state')) {
          state = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('district')) {
          district = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('street')) {
          street = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else {
          yield* UnidocReducer.skipTag()
        }
      } else if (current.isEnd()) {
        return Address.create({
          country,
          state,
          county,
          city,
          district,
          street
        })
      } else {
        current = yield UnidocReductionRequest.NEXT
      }
    }
  }
}