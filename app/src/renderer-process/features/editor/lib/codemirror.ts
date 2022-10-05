import { defaultKeymap } from '@codemirror/commands'
import { EditorState } from '@codemirror/state'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { asciidocPlugins } from '../../asciidoc/asciidoc'
import { getBaseTheme, getDefaultGutterTheme } from '../domain/theme'
import { Content } from '../domain/content'

type DestroyComponent = () => void

let editorContent: Content = new Content('')

export const createEditor = (
  parentDom: HTMLElement,
  doc: string | undefined = undefined,
  previewUpdate: (content: string) => void
): DestroyComponent => {
  const updateCallback = EditorView.updateListener.of(update => {
    if (!update.docChanged) {
      return
    }
    editorContent = editorContent.update(update.state.doc.toString())
    previewUpdate(update.state.doc.toString())
  })

  const state = EditorState.create({
    doc: doc,
    extensions: [
      keymap.of(defaultKeymap),
      asciidocPlugins(),
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      theme(),
      updateCallback,
    ],
  })

  const view = new EditorView({
    parent: parentDom,
    state: state,
  })

  return () => {
    view.destroy()
  }
}

const theme = () => {
  return [EditorView.baseTheme(getBaseTheme()), EditorView.theme(getDefaultGutterTheme()), oneDark]
}

window.electron.receive('saveCommand', (data: any[]) => {
  window.electron.send('editorSender', [editorContent.getContent()])
})
