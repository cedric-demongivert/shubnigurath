import { Address } from "../../Address"
import { Investigator } from "../../Investigator"
import { UnidocCharacteristicSetReducer } from "./UnidocCharacteristicSetReducer"
import { UnidocSkillSetReducer } from "./UnidocSkillSetReducer"
import { UnidocStateReducer } from "./UnidocStateReducer"
import { UnidocSummaryReducer } from "./UnidocSummaryReducer"

/**
 * 
 */
export namespace UnidocInvestigatorReducer {
  /**
   * 
   */
  export function reduce(investigator: Investigator, indent: string = ''): string {
    const elements: string[] = []

    elements.push(
      UnidocSummaryReducer.reduce(investigator.summary, indent)
    )

    elements.push(
      indent + '\\characteristics {\r\n' +
      UnidocCharacteristicSetReducer.reduce(investigator.characteristics, indent + '  ') + '\r\n' +
      indent + '}'
    )

    elements.push(
      indent + '\\skills {\r\n' +
      UnidocSkillSetReducer.reduce(investigator.skills, investigator.computeDefaultSkills(), indent + '  ') + '\r\n' +
      indent + '}'
    )

    elements.push(
      indent + '\\state {\r\n' +
      UnidocStateReducer.reduce(investigator.mutables, indent + '  ') + '\r\n' +
      indent + '}'
    )

    elements.push(
      indent + '\\updates {\r\n' +
      UnidocSkillSetReducer.reduce(investigator.updates, investigator.computeDefaultSkills(), indent + '  ') + '\r\n' +
      indent + '}'
    )

    return elements.join('\r\n\r\n')
  }
}