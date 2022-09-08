export type Position = {
  from: number
  to: number
}

export type PositionWithCSSClass = {
  position: Position
  cssClass: string
}

export const TOKEN_MARK_CSS = 'cm-token-mark'
export abstract class Token {
  public abstract sortedPositionWithCSSClass(): PositionWithCSSClass[]

  public constructor(protected readonly position: Position, protected readonly text: string) {}

  public getText(): string {
    return this.text
  }

  public positionToken(): Position {
    return this.position
  }
}
