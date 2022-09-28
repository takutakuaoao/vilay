import { Path } from './path'
import { Content } from './content'

export class Note {
  private readonly content: Content
  public constructor(private readonly path: Path, content: string | Content) {
    this.content = typeof content === 'string' ? Content.fromText(content) : content
  }

  public filePath(): string {
    return this.path.filePath()
  }

  public name(): string {
    return this.path.fileName()
  }

  public getContent(): string {
    return this.content.showText()
  }
}
