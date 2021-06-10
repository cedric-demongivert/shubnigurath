import { UnidocReductionInput } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'
import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'

import { CommandList } from './validator/command'
import { CommandListElement } from './validator/command'
import { validateCommandList } from './validator/command'

import { Mutables } from '../Mutables'

/**
 * 
 */
export namespace StateCommand {
  /**
   * 
   */
  const COMMAND: CommandList = CommandList.capture(
    CommandListElement.anywhere.requiredCommand('health', UnidocKissValidator.requireToken),
    CommandListElement.anywhere.requiredCommand('mentalHealth', UnidocKissValidator.requireToken),
    CommandListElement.anywhere.requiredCommand('magic', UnidocKissValidator.requireToken),
    CommandListElement.anywhere.requiredCommand('luck', UnidocKissValidator.requireToken),
    CommandListElement.anywhere.requiredCommand('temporaryInsane', UnidocKissValidator.validateManyWhitespace),
    CommandListElement.anywhere.requiredCommand('indefinitelyInsane', UnidocKissValidator.validateManyWhitespace),
    CommandListElement.anywhere.requiredCommand('majorWound', UnidocKissValidator.validateManyWhitespace)
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
  export function* reduce(): UnidocReducer<Mutables> {
    let health: string | undefined = undefined
    let mentalHealth: string | undefined = undefined
    let magic: string | undefined = undefined
    let luck: string | undefined = undefined
    let temporaryInsane: boolean = false
    let indefinitelyInsane: boolean = false
    let majorWound: boolean = false

    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    while (true) {
      let current: UnidocReductionInput = yield UnidocReductionRequest.CURRENT

      if (current.isStartOfAnyTag()) {
        if (current.isStartOfTag('health')) {
          health = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceToken())
        } else if (current.isStartOfTag('luck')) {
          luck = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceToken())
        } else if (current.isStartOfTag('mentalHealth')) {
          mentalHealth = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceToken())
        } else if (current.isStartOfTag('magic')) {
          magic = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceToken())
        } else if (current.isStartOfTag('temporaryInsane')) {
          yield* UnidocReducer.skipTag()
          temporaryInsane = true
        } else if (current.isStartOfTag('indefinitelyInsane')) {
          yield* UnidocReducer.skipTag()
          indefinitelyInsane = true
        } else if (current.isStartOfTag('majorWound')) {
          yield* UnidocReducer.skipTag()
          majorWound = true
        } else {
          yield* UnidocReducer.skipTag()
        }
      } else if (current.isEnd()) {
        return Mutables.create({
          health: parseInt(health),
          mentalHealth: parseInt(mentalHealth),
          magic: parseInt(magic),
          luck: parseInt(luck),
          temporaryInsane,
          indefinitelyInsane,
          majorWound
        })
      } else {
        current = yield UnidocReductionRequest.NEXT
      }
    }
  }
}