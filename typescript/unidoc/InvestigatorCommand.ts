import { UnidocReductionInput } from '@cedric-demongivert/unidoc'
import { UnidocReductionRequest } from '@cedric-demongivert/unidoc'
import { UnidocKissValidator } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'

import { Gender } from '../Gender'
import { Investigator } from '../Investigator'
import { Name } from '../Name'
import { Address } from '../Address'
import { CharacteristicSet } from '../CharacteristicSet'
import { Summary } from '../Summary'
import { SkillSet } from '../SkillSet'
import { Mutables } from '../Mutables'

import { CommandList } from './validator/command'
import { CommandListElement } from './validator/command'
import { validateCommandList } from './validator/command'

import { NameCommand } from './NameCommand'
import { GenderCommand } from './GenderCommand'
import { AddressCommand } from './AddressCommand'
import { CharacteristicSetCommand } from './CharacteristicSetCommand'
import { SkillSetCommand } from './SkillSetCommand'
import { StateCommand } from './StateCommand'

/**
 * 
 */
export namespace InvestigatorCommand {
  /**
   * 
   */
  const COMMAND: CommandList = CommandList.capture(
    CommandListElement.anywhere.requiredCommand('name', NameCommand.validate),
    CommandListElement.anywhere.requiredCommand('alias', UnidocKissValidator.requireText),
    CommandListElement.anywhere.requiredCommand('job', UnidocKissValidator.requireText),
    CommandListElement.anywhere.requiredCommand('matricule', UnidocKissValidator.requireText),
    CommandListElement.anywhere.requiredCommand('gender', GenderCommand.validate),
    CommandListElement.anywhere.requiredCommand('age', UnidocKissValidator.requireToken),
    CommandListElement.anywhere.requiredCommand('birthdate', UnidocKissValidator.requireText),
    CommandListElement.anywhere.requiredCommand('hiringdate', UnidocKissValidator.requireText),
    CommandListElement.anywhere.requiredCommand('birthplace', AddressCommand.validate),
    CommandListElement.anywhere.requiredCommand('home', AddressCommand.validate),
    CommandListElement.anywhere.requiredCommand('characteristics', CharacteristicSetCommand.validate),
    CommandListElement.anywhere.requiredCommand('skills', SkillSetCommand.validate),
    CommandListElement.anywhere.optionalCommand('state', StateCommand.validate),
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
  export function* reduce(): UnidocReducer<Investigator> {
    let name: Name | undefined = undefined
    let alias: string | undefined = undefined
    let job: string | undefined = undefined
    let matricule: string | undefined = undefined
    let gender: Gender | undefined = undefined
    let age: string | undefined = undefined
    let birthdate: string | undefined = undefined
    let hiringdate: string | undefined = undefined
    let birthplace: Address | undefined = undefined
    let home: Address | undefined = undefined
    let characteristics: CharacteristicSet = CharacteristicSet.empty()
    let skills: SkillSet = SkillSet.empty()
    let mutables: Mutables | undefined = undefined

    yield* UnidocReducer.skipStart()
    yield* UnidocReducer.skipWhitespaces()

    while (true) {
      let current: UnidocReductionInput = yield UnidocReductionRequest.CURRENT

      if (current.isStartOfAnyTag()) {
        if (current.isStartOfTag('name')) {
          name = yield* UnidocReducer.reduceTag.content(NameCommand.reduce())
        } else if (current.isStartOfTag('alias')) {
          alias = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('state')) {
          mutables = yield* UnidocReducer.reduceTag.content(StateCommand.reduce())
        } else if (current.isStartOfTag('job')) {
          job = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('matricule')) {
          matricule = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('gender')) {
          gender = yield* UnidocReducer.reduceTag.content(GenderCommand.reduce())
        } else if (current.isStartOfTag('age')) {
          age = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('birthdate')) {
          birthdate = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('hiringdate')) {
          hiringdate = yield* UnidocReducer.reduceTag.content(UnidocReducer.reduceText())
        } else if (current.isStartOfTag('birthplace')) {
          birthplace = yield* UnidocReducer.reduceTag.content(AddressCommand.reduce())
        } else if (current.isStartOfTag('home')) {
          home = yield* UnidocReducer.reduceTag.content(AddressCommand.reduce())
        } else if (current.isStartOfTag('characteristics')) {
          characteristics = yield* UnidocReducer.reduceTag.content(CharacteristicSetCommand.reduce())
        } else if (current.isStartOfTag('skills')) {
          skills = yield* UnidocReducer.reduceTag.content(SkillSetCommand.reduce())
        } else {
          yield* UnidocReducer.skipTag()
        }
      } else if (current.isEnd()) {
        return Investigator.create({
          summary: Summary.create({
            name,
            alias,
            job,
            matricule,
            gender,
            age: parseInt(age),
            birthdate,
            hiringdate,
            birthplace,
            home
          }),
          characteristics,
          skills,
          mutables
        })
      } else {
        current = yield UnidocReductionRequest.NEXT
      }
    }
  }
}