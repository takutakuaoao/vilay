import { NoteName } from './note-name'
import { Path } from './path'

export class NotePath {
  public static fromPathText(path: string): NotePath {
    return new NotePath(Path.ofDir(path), NoteName.fromPathText(path))
  }

  public constructor(private readonly dir: Path, private readonly noteName: NoteName) {}

  public showFullPath(): string {
    return `${this.showDirPath()}/${this.showFileName()}`
  }

  private showFileName(): string {
    return this.noteName.toString()
  }

  private showDirPath(): string {
    return this.dir.filePath()
  }
}
