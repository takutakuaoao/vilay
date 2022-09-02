import { EditorState, EditorView } from '../lib/lib-editor'

export class CoreEditor {
  public static factory(parent: HTMLElement): CoreEditor {
    return new CoreEditor(EditorState.factory(), EditorView.factory(parent))
  }

  public constructor(private state: EditorState, private view: EditorView) {}

  public init(): CoreEditor {
    this.view.resetState(this.state)

    return this
  }

  public destroyView(): void {
    this.view.destroy()
  }
}
