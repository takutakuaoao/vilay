import { Position, Token } from './token'

type ItalicLevel = 1 | 2
const BOLD_LEVEL_LIST: ItalicLevel[] = [2, 1]

function validation(text: string, tokenType: string): ItalicLevel | false {
  if (tokenType !== 'string') {
    return false
  }

  for (const level of BOLD_LEVEL_LIST) {
    const reg = `^\\_{${level}}.*\\_{${level}}$`
    if (new RegExp(reg).test(text)) {
      return level
    }
  }

  return false
}

export class ItalicToken extends Token {
  public static factory(position: Position, text: string, tokenType: string): ItalicToken | false {
    const italicLevel = validation(text, tokenType)
    return italicLevel ? new ItalicToken(position, text, italicLevel) : false
  }

  private constructor(position: Position, text: string, public readonly italicLevel: ItalicLevel) {
    super(position, text)
  }

  public cssClass(): string {
    return 'cm-italic'
  }

  public positionMaker(): Position[] {
    return [
      { from: this.position.from, to: this.position.from + this.italicLevel },
      { from: this.position.to - this.italicLevel, to: this.position.to },
    ]
  }
}
