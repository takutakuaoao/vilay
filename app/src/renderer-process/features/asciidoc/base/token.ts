export type Position = {
  from: number
  to: number
}

export abstract class Token {
  public abstract cssClass(): string

  public constructor(protected readonly position: Position, protected readonly text: string) {}

  public positionToken(): Position {
    return this.position
  }
}
