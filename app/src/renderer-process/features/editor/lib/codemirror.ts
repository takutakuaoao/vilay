import { defaultKeymap } from '@codemirror/commands'
import { EditorState, Extension } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { asciidocPlugins } from '../../asciidoc/asciidoc'

type DestroyComponent = () => void

export const createEditor = (parentDom: HTMLElement): DestroyComponent => {
  const state = EditorState.create({
    doc: undefined,
    extensions: [keymap.of(defaultKeymap), asciidocPlugins(), lineNumbers(), highlightActiveLine(), highlightActiveLineGutter(), baseTheme(), defaultTheme()],
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
    '.cm-header1': {
      fontSize: '32px',
      fontWeight: 'bold',
    },
    '.cm-header2': {
      fontSize: '25px',
      fontWeight: 'bold',
    },
    '.cm-header3': {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    '.cm-header4': {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    '.cm-token-mark': {
      opacity: 0.3,
    },
    '.cm-bold': {
      fontWeight: 'bold',
    },
    '.cm-italic': {
      fontStyle: 'italic',
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
