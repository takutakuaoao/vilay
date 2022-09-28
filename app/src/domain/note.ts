import { Path } from './path'
import { Content } from './content'

export class Note {
  public constructor(private readonly path: Path, private readonly content: Content) {}

  public filePath(): string {
    return this.path.filePath()
  }

  public name(): string {
    return this.path.fileName()
  }

  public showContent(): string {
    return this.content.showText()
  }
}
