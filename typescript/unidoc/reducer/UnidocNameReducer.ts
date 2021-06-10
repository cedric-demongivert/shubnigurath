import { Name } from "../../Name"

/**
 * 
 */
export namespace UnidocNameReducer {
  /**
   * 
   */
  export function reduce(name: Name, indent: string = ''): string {
    const elements: string[] = [
      indent + '\\first { ' + name.first + ' }',
      indent + '\\last { ' + name.last + ' }'
    ]

    if (name.short != null) {
      elements.push(indent + '\\short { ' + name.short + ' }')
    }

    return elements.join('\r\n')
  }
}