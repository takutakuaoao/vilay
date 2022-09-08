import { Position, Token } from './token'

type Level = 1 | 2

export type LiteralTokenName = 'bold' | 'italic'
type TagName = 'keyword' | 'string'
type Mark = '*' | '_'
type LiteralTokenType = {
  tagName: TagName
  mark: Mark
  tokenType: LiteralTokenName
}

const Level_LIST: Level[] = [2, 1]
const LITERAL_TOKEN_LIST: Record<LiteralTokenName, LiteralTokenType> = {
  bold: {
    tagName: 'keyword',
    mark: '*',
    tokenType: 'bold',
  },
  italic: {
    tagName: 'string',
    mark: '_',
    tokenType: 'italic',
  },
}

class TokenType {
  public constructor(private readonly value: LiteralTokenType) {}

  public validate(text: string, tokenType: string): Level | false {
    if (tokenType !== this.value.tagName) {
      return false
    }

    for (const level of Level_LIST) {
      if (new RegExp(this.matchPattern(level)).test(text)) {
        return level
      }
    }

    return false
  }

  public cssClass(): string {
    return `cm-${this.value.tokenType}`
  }

  private matchPattern(level: Level): string {
    return `^\\${this.value.mark}{${level}}.*\\${this.value.mark}{${level}}$`
  }
}

export class LiteralToken extends Token {
  public static factory(
    literalTokenName: LiteralTokenName,
    position: Position,
    text: string,
    tagName: string
  ): LiteralToken | false {
    const tokenType = new TokenType(LITERAL_TOKEN_LIST[literalTokenName])
    const level = tokenType.validate(text, tagName)

    return level ? new LiteralToken(position, text, level, tokenType) : false
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

  public positionMarker(): Position[] {
    return [
      { from: this.position.from, to: this.position.from + this.level },
      { from: this.position.to - this.level, to: this.position.to },
    ]
  }
}
