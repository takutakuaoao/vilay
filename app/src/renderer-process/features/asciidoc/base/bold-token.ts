type Position = {
  from: number
  to: number
}

export class BoldToken {
  public static factory(
    position: Position,
    text: string,
    tokenType: string
  ): BoldToken | false {
    const reg = '^\\*{1,2}.*\\*{1,2}$'
    return new RegExp(reg).test(text) && tokenType === 'keyword'
      ? new BoldToken(position, text)
      : false
  }

  public constructor(
    private readonly position: Position,
    private readonly text: string
  ) {}
}
