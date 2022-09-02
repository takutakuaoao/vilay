import { WrapperCodemirror } from '../lib/wrapper-codemirror'
import { IWrapperEditorLib } from '../lib/wrapper-editor-lib'

export class CoreEditor {
  public static factory(parent: HTMLElement): CoreEditor {
    return new CoreEditor(WrapperCodemirror.factory(parent))
  }

  private constructor(private editor: IWrapperEditorLib) {}

  public destroy(): void {
    this.editor.destroyView()
  }
}
