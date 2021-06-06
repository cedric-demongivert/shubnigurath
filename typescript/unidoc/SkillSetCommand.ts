import { UnidocReductionInput } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'
import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'

import { List } from 'immutable'

import { Value } from '../Value'

import { Pair } from '../data/Pair'
import { SkillSet } from '../SkillSet'
import { Skill } from '../Skill'

import { CommandList } from './validator/command'
import { CommandListElement } from './validator/command'
import { validateCommandList } from './validator/command'

import { SkillCommand } from './SkillCommand'
/**
 * 
 */
export namespace SkillSetCommand {
  /**
   * 
   */
  const COMMAND: CommandList = CommandList.capture(
    CommandListElement.manyCommand('skill', SkillCommand.validate)
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
  export function* reduce(): UnidocReducer<SkillSet> {
    const skills: Pair<Skill, Value>[] = []

    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    while (true) {
      let current: UnidocReductionInput = yield UnidocReductionRequest.CURRENT

      if (current.isStartOfAnyTag()) {
        if (current.isStartOfTag('skill')) {
          skills.push(yield* UnidocReducer.reduceTag.content(SkillCommand.reduce()))
        } else {
          yield* UnidocReducer.skipTag()
        }
      } else if (current.isEnd()) {
        return SkillSet.create(skills)
      } else {
        current = yield UnidocReductionRequest.NEXT
      }
    }
  }
}