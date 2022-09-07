export type Position = {
  from: number
  to: number
}

export abstract class Token {
  public constructor(protected readonly position: Position, protected readonly text: string) {}

  protected positionToken(): Position {
    return this.position
  }
}
