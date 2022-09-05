import { defaultKeymap } from '@codemirror/commands'
import { EditorState as LibEditorState, Extension } from '@codemirror/state'
import { EditorView as LibEditorView, keymap } from '@codemirror/view'
import { oneDark as defaultTheme } from '@codemirror/theme-one-dark'
import { IWrapperEditorLib } from './wrapper-editor-lib'

export class WrapperCodemirror implements IWrapperEditorLib {
  public static factory(parentDom: HTMLElement) {
    const state = LibEditorState.create({
      doc: undefined,
      extensions: [keymap.of(defaultKeymap), this.baseTheme(), defaultTheme],
    })

    const view = new LibEditorView({
      parent: parentDom,
      state: state,
    })

    return new WrapperCodemirror(view)
  }

  private static baseTheme(): Extension {
    return LibEditorView.baseTheme({
      '&.cm-editor': {
        width: '100%',
        maxWidth: '100%',
        height: '100vh',
        maxHeight: '100vh',
      },
      '&.cm-scroller': {
        overflow: 'auto',
      },
    })
  }

  private constructor(
    // private state: LibEditorState,
    private view: LibEditorView
  ) {}

  public destroyView(): void {
    this.view.destroy()
  }
}
