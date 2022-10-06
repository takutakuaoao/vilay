import Asciidoctor from 'asciidoctor'

export class AsciidocContent {
  public static fromText(text: string) {
    const textList = text.split(/\r\n|\n/)
    return new AsciidocContent(textList)
  }
  public constructor(private readonly textList: string[]) {}

  public showContent(): string {
    return this.textList.join('\n')
  }

  public parseHTML(): string {
    const parser = Asciidoctor()
    return parser
      .convert(this.showContent(), {
        safe: 'safe',
        attributes: {
          showtitle: true,
          icons: 'font',
        },
      })
      .toString()
  }
}
