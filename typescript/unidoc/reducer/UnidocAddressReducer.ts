import { Address } from "../../Address"

/**
 * 
 */
export namespace UnidocAddressReducer {
  /**
   * 
   */
  export function reduce(address: Address, indent: string = ''): string {
    const elements: string[] = []

    if (address.country != null) {
      elements.push(indent + '\\country { ' + address.country + ' }')
    }

    if (address.state != null) {
      elements.push(indent + '\\state { ' + address.state + ' }')
    }

    if (address.county != null) {
      elements.push(indent + '\\county { ' + address.county + ' }')
    }

    if (address.city != null) {
      elements.push(indent + '\\city { ' + address.city + ' }')
    }

    if (address.district != null) {
      elements.push(indent + '\\district { ' + address.district + ' }')
    }

    if (address.street != null) {
      elements.push(indent + '\\street { ' + address.street + ' }')
    }

    return elements.join('\r\n')
  }
}