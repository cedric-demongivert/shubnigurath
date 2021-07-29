import { List } from 'immutable'

import { UnidocReductionInput } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'
import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'

import { Skill } from '../Skill'
import { Value } from '../Value'
import { Modifier } from '../Modifier'
import { Pair } from '../data/Pair'

import { CommandList } from './validator/command'
import { CommandListElement } from './validator/command'
import { validateCommandList } from './validator/command'

/**
 * 
 */
export namespace SkillCommand {
  /**
   * 
   */
  const COMMAND: CommandList = CommandList.capture(
    CommandListElement.anywhere.requiredCommand('family', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('specialization', UnidocKissValidator.requireText),
    CommandListElement.anywhere.optionalCommand('base', UnidocKissValidator.requireToken),
    CommandListElement.manyCommand('modifier', UnidocKissValidator.requireText)
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
  export function* reduce(): UnidocReducer<Pair<Skill, Value>> {
    let family: string = 'none'
    let specialization: string | undefined = undefined
    let base: number | undefined = undefined
    let modifiers: List<Modifier> = List<Modifier>().asMutable()

    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    while (true) {
      let current: UnidocReductionInput = yield UnidocReductionRequest.CURRENT

      if (current.isStartOfAnyTag()) {
        if (current.isStartOfTag('base')) {
          base = parseInt(yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText()))
        } else if (current.isStartOfTag('family')) {
          family = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('specialization')) {
          specialization = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('modifier')) {
          const tokens: string[] = (yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())).split(/\s+/ig)
          modifiers.push(Modifier.create({
            value: parseInt(tokens[0]),
            label: tokens.slice(1).join(' ')
          }))
        } else {
          yield* UnidocReducer.skipTag()
        }
      } else if (current.isEnd()) {
        return Pair.create(
          Skill.create({
            family,
            specialization
          }),
          Value.create({
            base,
            modifiers: modifiers.asImmutable()
          })
        )
      } else {
        current = yield UnidocReductionRequest.NEXT
      }
    }
  }
}