import { parsePath } from './util/parse-path'

type ExtensionType = 'adoc'

export class NoteName {
  public static fromPathText(path: string): NoteName {
    const parsed = parsePath(path)

    return new NoteName(parsed[parsed.length - 1], 'adoc')
  }

  private readonly name: string
  private readonly extension: ExtensionType

  /**
   * text.adocのようにnameの拡張子にadocがついている場合は、name = text, extension = adoc として扱う
   * text.txtなど拡張子がadoc以外の場合はtext.txt.adocとして扱う
   *
   * @throws {Error} ファイル名にディレクトリ階層が含まれている場合に例外を投げる
   */
  public constructor(name: string, extension: ExtensionType = 'adoc') {
    if (name.split('/').length !== 1) {
      throw new Error(
        `NoteName must be only fileName, but the value contain directory. (Actual: ${name})`
      )
    }

    this.name = name
    this.extension = extension

    const splittedName = this.splitNameAndExtension()

    if (this.isNameOfAddedAdocExtension()) {
      const deletedExtension = splittedName.filter((value, index) => {
        return index !== splittedName.length - 1
      })

      this.name = deletedExtension.join('.')
    }
  }

  private splitNameAndExtension(): string[] {
    return this.name.split('.')
  }

  private isNameOfAddedAdocExtension(): boolean {
    const splittedName = this.splitNameAndExtension()

    return splittedName.length >= 2 && splittedName[splittedName.length - 1] === 'adoc'
  }

  public toString(): string {
    return `${this.name}.${this.extension}`
  }
}
