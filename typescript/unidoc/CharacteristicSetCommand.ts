import { UnidocReductionInput } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'
import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'

import { Value } from '../Value'

import { CommandList } from './validator/command'
import { CommandListElement } from './validator/command'
import { validateCommandList } from './validator/command'

import { ValueCommand } from './ValueCommand'
import { CharacteristicSet } from '../CharacteristicSet'

/**
 * 
 */
export namespace CharacteristicSetCommand {
  /**
   * 
   */
  const COMMAND: CommandList = CommandList.capture(
    CommandListElement.anywhere.requiredCommand('appearance', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('constitution', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('dexterity', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('education', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('intelligence', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('power', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('size', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('strength', ValueCommand.validate),
    CommandListElement.anywhere.requiredCommand('luck', ValueCommand.validate)
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
  export function* reduce(): UnidocReducer<CharacteristicSet> {
    let appearance: Value = Value.zero()
    let constitution: Value = Value.zero()
    let dexterity: Value = Value.zero()
    let education: Value = Value.zero()
    let intelligence: Value = Value.zero()
    let power: Value = Value.zero()
    let size: Value = Value.zero()
    let strength: Value = Value.zero()
    let luck: Value = Value.zero()

    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    while (true) {
      let current: UnidocReductionInput = yield UnidocReductionRequest.CURRENT

      if (current.isStartOfAnyTag()) {
        if (current.isStartOfTag('appearance')) {
          appearance = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('constitution')) {
          constitution = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('dexterity')) {
          dexterity = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('education')) {
          education = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('intelligence')) {
          intelligence = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('power')) {
          power = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('size')) {
          size = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('strength')) {
          strength = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else if (current.isStartOfTag('luck')) {
          luck = yield* UnidocReducer.reduceTag.content(ValueCommand.reduce())
        } else {
          yield* UnidocReducer.skipTag()
        }
      } else if (current.isEnd()) {
        return CharacteristicSet.create({
          appearance,
          constitution,
          dexterity,
          education,
          intelligence,
          power,
          size,
          strength,
          luck
        })
      } else {
        current = yield UnidocReductionRequest.NEXT
      }
    }
  }
}