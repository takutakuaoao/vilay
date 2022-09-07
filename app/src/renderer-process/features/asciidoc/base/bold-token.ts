import { Position, Token } from './token'

export class BoldToken extends Token {
  public static factory(position: Position, text: string, tokenType: string): BoldToken | false {
    const reg = '^\\*{1,2}.*\\*{1,2}$'
    return new RegExp(reg).test(text) && tokenType === 'keyword' ? new BoldToken(position, text) : false
  }

  public constructor(position: Position, text: string) {
    super(position, text)
  }
}
