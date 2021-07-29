import { Investigator } from "../../../typescript/Investigator"
import { readInvestigator } from "../../../typescript/unidoc"

/**
 * 
 */
export namespace Premades {
  /**
   * 
   */
  export function load(): Promise<Investigator[]> {
    return Promise.all([
      require('../../../public/sheets/allan-smith.txt').default,
      require('../../../public/sheets/anastasia-janowska.txt').default,
      require('../../../public/sheets/emilio-gianni.txt').default,
      require('../../../public/sheets/eraste-mercier.txt').default,
      require('../../../public/sheets/felix-arsenault.txt').default,
      require('../../../public/sheets/francois-moreau.txt').default,
      require('../../../public/sheets/jill-everett.txt').default,
      require('../../../public/sheets/marie-eden-boudreau.txt').default,
      require('../../../public/sheets/paul-edward-tsao.txt').default,
      require('../../../public/sheets/sophie-lepage.txt').default
    ].map(readInvestigator))
  }
}