export class Note {
  public constructor(private readonly path: string, private readonly file: string) {}

  public filePath(): string {
    return `${this.path}/${this.file}`
  }
}
