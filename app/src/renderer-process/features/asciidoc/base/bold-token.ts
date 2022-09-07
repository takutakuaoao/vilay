import { Position, Token } from './token'

type BoldLevel = 1 | 2
const BOLD_LEVEL_LIST: BoldLevel[] = [2, 1]

function validation(text: string, tokenType: string): BoldLevel | false {
  if (tokenType !== 'keyword') {
    return false
  }

  for (const level of BOLD_LEVEL_LIST) {
    const reg = `^\\*{${level}}.*\\*{${level}}$`
    if (new RegExp(reg).test(text)) {
      return level
    }
  }

  return false
}

export class BoldToken extends Token {
  public static factory(position: Position, text: string, tokenType: string): BoldToken | false {
    const boldLevel = validation(text, tokenType)
    return boldLevel ? new BoldToken(position, text, boldLevel) : false
  }

  private constructor(position: Position, text: string, public readonly boldLevel: BoldLevel) {
    super(position, text)
  }

  public cssClass(): string {
    return 'cm-bold'
  }

  public positionMaker(): Position[] {
    return [
      { from: this.position.from, to: this.position.from + this.boldLevel },
      { from: this.position.to - this.boldLevel, to: this.position.to },
    ]
  }
}
