import { ListenableUnidocProducer } from '@cedric-demongivert/unidoc'
import { UnidocSymbol } from '@cedric-demongivert/unidoc'
import { UnidocLocationTracker } from '@cedric-demongivert/unidoc'
import { UnidocOrigin } from '@cedric-demongivert/unidoc'

/**
 * 
 */
export class UnidocFileSymbolProducer extends ListenableUnidocProducer<UnidocSymbol> {
  /**
   * 
   */
  private readonly _file: File

  /**
  *
  */
  public readonly origin: UnidocOrigin

  /**
   * A symbol instance for symbol emission.
   */
  private readonly _symbol: UnidocSymbol

  /**
   * Location into this reader's source.
   */
  private readonly _location: UnidocLocationTracker

  /**
   * 
   */
  public constructor(file: File) {
    super()

    this.origin = new UnidocOrigin()
    this.origin.resource('file:' + file.name)

    this._file = file
    this._symbol = new UnidocSymbol()
    this._location = new UnidocLocationTracker()

    this.handleLoadingProgress = this.handleLoadingProgress.bind(this)
    this.handleLoadingTermination = this.handleLoadingTermination.bind(this)
  }

  /**
   * 
   */
  private handleLoadingProgress(event: ProgressEvent<FileReader>): void {
    const content: string | ArrayBuffer = event.target.result

    if (content instanceof ArrayBuffer) {
      throw new Error('Invalid reader content type, expected to receive a string but received an ArrayBuffer instead.')
    } else {
      const size: number = content.length

      for (let index = 0; index < size; ++index) {
        const nextCodePoint: number = content.codePointAt(index)

        this._symbol.symbol = nextCodePoint
        this._symbol.origin.clear()
        this._symbol.origin.from.text(this._location.location).concat(this.origin)

        this._location.next(nextCodePoint)

        this._symbol.origin.to.text(this._location.location).concat(this.origin)

        this.produce(this._symbol)
      }
    }
  }

  /**
   * 
   */
  private handleLoadingTermination(event: ProgressEvent<FileReader>): void {
    this.complete()
  }

  /**
   *  
   */
  public read(): void {
    const reader: FileReader = new FileReader()

    reader.addEventListener('load', this.handleLoadingProgress)
    reader.addEventListener('loadend', this.handleLoadingTermination)

    reader.readAsText(this._file, 'utf8')
  }
}

/**
 * 
 */
export namespace UnidocFileSymbolProducer {
  /**
   * 
   */
  export function create(file: File): UnidocFileSymbolProducer {
    return new UnidocFileSymbolProducer(file)
  }
}