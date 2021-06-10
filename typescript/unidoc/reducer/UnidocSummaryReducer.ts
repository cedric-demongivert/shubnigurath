import { Gender } from "../../Gender"
import { Summary } from "../../Summary"
import { UnidocAddressReducer } from "./UnidocAddressReducer"
import { UnidocNameReducer } from "./UnidocNameReducer"

/**
 * 
 */
export namespace UnidocSummaryReducer {
  /**
   * 
   */
  export function reduce(summary: Summary, indent: string = ''): string {
    const elements: string[] = []

    elements.push(
      indent + '\\name {\r\n' +
      UnidocNameReducer.reduce(summary.name, indent + '  ') + '\r\n' +
      indent + '}'
    )

    if (summary.alias != null) {
      elements.push(indent + '\\alias { ' + summary.alias + ' }')
    }

    if (summary.job != null) {
      elements.push(indent + '\\job { ' + summary.job + ' }')
    }

    if (summary.matricule != null) {
      elements.push(indent + '\\matricule { ' + summary.matricule + ' }')
    }

    if (summary.gender != null) {
      elements.push(indent + '\\gender { ' + (summary.gender == Gender.MALE ? 'male' : 'female') + ' }')
    }

    elements.push(indent + '\\age { ' + summary.age + ' }')

    if (summary.birthdate != null) {
      elements.push(indent + '\\birthdate { ' + summary.birthdate + ' }')
    }

    if (summary.hiringdate != null) {
      elements.push(indent + '\\hiringdate { ' + summary.hiringdate + ' }')
    }

    if (summary.birthplace != null) {
      elements.push(
        indent + '\\birthplace {\r\n' +
        UnidocAddressReducer.reduce(summary.birthplace, indent + '  ') + '\r\n' +
        indent + '}'
      )
    }

    if (summary.home != null) {
      elements.push(
        indent + '\\home {\r\n' +
        UnidocAddressReducer.reduce(summary.home, indent + '  ') + '\r\n' +
        indent + '}'
      )
    }

    return elements.join('\r\n\r\n')
  }
}