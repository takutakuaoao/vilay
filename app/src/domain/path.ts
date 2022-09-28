export class Path {
  public constructor(private readonly value: string) {}

  public filePath(): string {
    return this.value
  }

  public fileName(): string {
    const paths = this.value.split(/[\\\/]/)

    return paths.pop()!
  }
}
