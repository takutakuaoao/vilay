export type Position = {
  from: number
  to: number
}

export abstract class Token {
  public abstract cssClass(): string
  public abstract positionMarker(): Position[]

  public constructor(protected readonly position: Position, protected readonly text: string) {}

  public getText(): string {
    return this.text
  }

  public positionToken(): Position {
    return this.position
  }
}
