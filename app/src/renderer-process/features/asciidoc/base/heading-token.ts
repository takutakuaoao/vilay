import { Position, PositionWithCSSClass, Token, TOKEN_MARK_CSS } from './token'

type HeadingLevel = 1 | 2 | 3 | 4 | 5
type NonHeadingToken = false
type HeadingCSSClass = 'cm-header1' | 'cm-header2' | 'cm-header3' | 'cm-header4' | 'cm-header5'

const HEADING_LEVEL_LIST: HeadingLevel[] = [1, 2, 3, 4, 5]
const TOKEN_TYPE = 'heading'
const HEADING_CSS_LIST: Record<HeadingLevel, HeadingCSSClass> = {
  1: 'cm-header1',
  2: 'cm-header2',
  3: 'cm-header3',
  4: 'cm-header4',
  5: 'cm-header5',
}

const validHeadingToken = (text: string, tokenType: string): false | HeadingLevel => {
  if (tokenType !== TOKEN_TYPE) {
    return false
  }

  for (const level of HEADING_LEVEL_LIST) {
    const reg = `^={${level}} .*`
    if (new RegExp(reg).test(text)) {
      return level
    }
  }

  return false
}

export class HeadingToken extends Token {
  public static factory(
    position: Position,
    text: string,
    tokenType: string
  ): HeadingToken | NonHeadingToken {
    const level = validHeadingToken(text, tokenType)
    return level ? new HeadingToken(position, level, text) : false
  }

  private constructor(position: Position, private readonly level: HeadingLevel, text: string) {
    super(position, text)
  }

  public sortedPositionWithCSSClass(): PositionWithCSSClass[] {
    const sortedPositions = this.positionSortedAll()

    return [
      { position: sortedPositions[0], cssClass: TOKEN_MARK_CSS },
      { position: sortedPositions[1], cssClass: this.cssClass() },
    ]
  }

  private positionMarker(): Position[] {
    return [
      {
        from: this.position.from,
        to: this.position.from + this.level,
      },
    ]
  }

  private cssClass(): string {
    return HEADING_CSS_LIST[this.level]
  }

  private positionContent(): Position {
    return {
      from: this.position.from + this.level,
      to: this.position.to,
    }
  }

  private positionSortedAll(): Position[] {
    return [this.positionMarker()[0], this.positionContent()]
  }
}
