import { defaultKeymap } from '@codemirror/commands'
import { EditorState as LibEditorState } from '@codemirror/state'
import { EditorView as LibEditorView, keymap } from '@codemirror/view'
import { oneDark as defaultTheme } from '@codemirror/theme-one-dark'
import { IWrapperEditorLib } from './wrapper-editor-lib'

export class WrapperCodemirror implements IWrapperEditorLib {
  public static factory(parentDom: HTMLElement) {
    const state = LibEditorState.create({
      doc: undefined,
      extensions: [keymap.of(defaultKeymap), defaultTheme],
    })

    const view = new LibEditorView({
      parent: parentDom,
      state: state,
    })

    return new WrapperCodemirror(view)
  }

  private constructor(
    // private state: LibEditorState,
    private view: LibEditorView
  ) {}

  public destroyView(): void {
    this.view.destroy()
  }
}
