import { Position, Token } from './token'

type BoldLevel = 1 | 2
const BOLD_LEVEL_LIST: BoldLevel[] = [1, 2]

function validation(text: string, tokenType: string): BoldLevel | false {
  if (tokenType !== 'keyword') {
    return false
  }

  // 昇順でチェックすると**xx**がboldLevel=1になるバグを回避するため
  // BOLD_LEVEL_LIST.reverse()で降順に並び替えている
  for (const level of BOLD_LEVEL_LIST.reverse()) {
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

  private constructor(position: Position, text: string, private readonly boldLevel: BoldLevel) {
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
