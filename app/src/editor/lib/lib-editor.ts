import { defaultKeymap } from '@codemirror/commands'
import { EditorState as LibEditorState } from '@codemirror/state'
import { EditorView as LibEditorView, keymap } from '@codemirror/view'
import { oneDark as defaultTheme } from '@codemirror/theme-one-dark'

export class EditorState {
  public static factory(): EditorState {
    const state = LibEditorState.create({
      doc: undefined,
      extensions: [keymap.of(defaultKeymap), defaultTheme],
    })

    return new EditorState(state)
  }
  private constructor(private state: LibEditorState) {}

  public get(): LibEditorState {
    return this.state
  }
}

export class EditorView {
  public static factory(parent: HTMLElement): EditorView {
    const view = new LibEditorView({
      parent: parent,
    })

    return new EditorView(view)
  }
  public constructor(private view: LibEditorView) {}

  public resetState(state: EditorState): EditorView {
    this.view.setState(state.get())

    return this
  }

  public destroy(): void {
    this.view.destroy()
  }
}
