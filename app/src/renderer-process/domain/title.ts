const UN_TITLE = 'untitle'

export class Title {
  public static fromText(text: string): Title {
    return new Title(text)
  }

  public static ofNew(): Title {
    return Title.fromText(UN_TITLE)
  }

  public constructor(private readonly value: string) {}

  public eq(other: Title): boolean {
    return this.value === other.value
  }

  public toString(): string {
    return this.value
  }
}
