import { Position, Token } from './token'

export type Level = 1 | 2
export const Level_LIST: Level[] = [2, 1]

type Bold = {
  tagName: 'keyword'
  mark: '*'
  tokenType: 'bold'
}

type Italic = {
  tagName: 'string'
  mark: '_'
  tokenType: 'italic'
}

type LiteralTokenType = Italic | Bold

class TokenType {
  public constructor(private readonly value: LiteralTokenType) {}

  public validate(text: string, tokenType: string): Level | false {
    if (tokenType !== this.value.tagName) {
      return false
    }

    for (const level of Level_LIST) {
      const reg = `^\\${this.value.mark}{${level}}.*\\${this.value.mark}{${level}}$`
      if (new RegExp(reg).test(text)) {
        return level
      }
    }

    return false
  }

  public cssClass(): string {
    return `cm-${this.value.tokenType}`
  }
}

export class LiteralToken extends Token {
  public static factoryItalic(
    position: Position,
    text: string,
    tagName: string
  ): LiteralToken | false {
    return LiteralToken.factory(
      position,
      text,
      tagName,
      new TokenType({ tagName: 'string', mark: '_', tokenType: 'italic' })
    )
  }

  public static factoryBold(
    position: Position,
    text: string,
    tagName: string
  ): LiteralToken | false {
    return LiteralToken.factory(
      position,
      text,
      tagName,
      new TokenType({ tagName: 'keyword', mark: '*', tokenType: 'bold' })
    )
  }

  private static factory(
    position: Position,
    text: string,
    tagName: string,
    literalTokenType: TokenType
  ): LiteralToken | false {
    const level = literalTokenType.validate(text, tagName)
    return level ? new LiteralToken(position, text, level, literalTokenType) : false
  }

  private constructor(
    position: Position,
    text: string,
    public readonly level: Level,
    private readonly tokenType: TokenType
  ) {
    super(position, text)
  }

  public cssClass(): string {
    return this.tokenType.cssClass()
  }

  public positionMaker(): Position[] {
    return [
      { from: this.position.from, to: this.position.from + this.level },
      { from: this.position.to - this.level, to: this.position.to },
    ]
  }
}
