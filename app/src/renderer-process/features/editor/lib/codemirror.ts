import { defaultKeymap } from '@codemirror/commands'
import { EditorState, Extension } from '@codemirror/state'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'

type DestroyComponent = () => void

export const createEditor = (parentDom: HTMLElement): DestroyComponent => {
  const state = EditorState.create({
    doc: undefined,
    extensions: [
      keymap.of(defaultKeymap),
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      baseTheme(),
      defaultTheme(),
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

const FONT_FAMILY = "'Menlo', sans-serif"

const baseTheme = (): Extension => {
  return EditorView.baseTheme({
    '&.cm-editor': {
      width: '100%',
      maxWidth: '100%',
      height: '100vh',
      maxHeight: '100vh',
      fontFamily: FONT_FAMILY,
    },
    '.cm-scroller': {
      overflow: 'auto',
      fontFamily: FONT_FAMILY,
    },
    '.cm-line': {
      paddingLeft: '14px',
    },
    '.cm-gutters': {
      paddingLeft: '10px',
    },
  })
}

const defaultTheme = (): Extension => {
  return [
    EditorView.theme({
      '.cm-gutters': {
        color: '#474e5d',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'transparent',
        color: '#848c9b',
      },
    }),
    oneDark,
  ]
}
