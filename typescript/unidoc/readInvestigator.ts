import { UnidocValidationEvent } from '@cedric-demongivert/unidoc'
import { UnidocValidator } from '@cedric-demongivert/unidoc'
import { UnidocProducerEvent } from '@cedric-demongivert/unidoc'
import { UnidocReducer } from '@cedric-demongivert/unidoc'
import { UnidocProducer } from '@cedric-demongivert/unidoc'

import { UnidocCommand } from './UnidocCommand'
import { InvestigatorCommand } from './InvestigatorCommand'

import { Reader } from './Reader'
import { Investigator } from '../Investigator'

export function readInvestigator(unidoc: string): Promise<Investigator> {
  return new Promise(function (resolve, reject) {
    const reader: Reader = new Reader()
    const validator: UnidocProducer<UnidocValidationEvent> = UnidocValidator.kiss(
      reader.output,
      UnidocCommand.validateUnidoc.factory(InvestigatorCommand.validate)
    )

    //validator.on('next', x => console.log(x.toString()))

    const parser: UnidocProducer<Investigator> = UnidocReducer.reduce.validation(
      validator,
      () => UnidocCommand.reduce(InvestigatorCommand.reduce())
    )

    parser.on('failure', reject)
    parser.on('next', resolve)

    reader.read(unidoc)
  })
}
