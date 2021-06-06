import { UnidocStream } from '@cedric-demongivert/unidoc'
import { UnidocProducer } from '@cedric-demongivert/unidoc'
import { UnidocEvent } from '@cedric-demongivert/unidoc'
import { fullyParse } from '@cedric-demongivert/unidoc'

import { UnidocFragmentResolver } from '@cedric-demongivert/unidoc'

export class Reader {
  /**
  *
  */
  private readonly _stream: UnidocStream

  /**
   * 
   */
  private readonly _resolver: UnidocFragmentResolver

  /**
  *
  */
  public readonly output: UnidocProducer<UnidocEvent>

  /**
  *
  */
  public constructor() {
    this._resolver = new UnidocFragmentResolver()
    this._stream = new UnidocStream(this._resolver)
    this.output = fullyParse(this._stream)
  }

  /**
  *
  */
  public read(file: string) {
    this._resolver.set('main', file)
    this._stream.import('main')
  }
}
