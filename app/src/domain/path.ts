import nodePath from 'path'

export class Path {
  public static fromText(path: string): Path {
    return new Path(path.split(/[\\\/]/))
  }
  public constructor(private readonly value: string[]) {}

  public filePath(): string {
    return nodePath.join('/', ...this.value)
  }

  public fileName(): string {
    const paths = this.value

    return paths.pop()!
  }
}
