import { Content } from './content'
import { NotePath } from './note-path'

export class Note {
  public static createNew(path: NotePath): Note {
    return new Note(path, Content.ofBlank())
  }

  public constructor(private readonly notePath: NotePath, private readonly content: Content) {}

  public filePath(): string {
    return this.notePath.showFullPath()
  }

  public showContent(): string {
    return this.content.showText()
  }
}
