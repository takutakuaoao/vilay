export class Content {
  public static fromText(text: string): Content {
    const textList = text.split(/\r\n|\n/)
    return new Content(textList)
  }

  public static ofBlank(): Content {
    return Content.fromText('')
  }

  public constructor(private readonly textList: string[]) {}

  public showText(): string {
    return this.textList.join('\n')
  }
}
