// import { defaultKeymap } from '@codemirror/commands'
// import { EditorState, Extension, Range } from '@codemirror/state'
// import { EditorState, StateField } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { EditorState, StateEffect, StateField } from '@codemirror/state'
import {
  EditorView,
  keymap,
  // lineNumbers,
  // highlightActiveLine,
  // highlightActiveLineGutter,
  // ViewPlugin,
  // ViewUpdate,
  // ViewUpdate,
  DecorationSet,
  // WidgetType,
  Decoration,
} from '@codemirror/view'
// import { oneDark } from '@codemirror/theme-one-dark'
// import { StreamLanguage } from '@codemirror/language'
// import { asciidoc } from 'codemirror-asciidoc'
// import { syntaxTree } from '@codemirror/language'
// import { markdown } from '@codemirror/lang-markdown'

// import { htmlLanguage, html } from '@codemirror/lang-html'
// import { language } from '@codemirror/language'
// import { javascript } from '@codemirror/lang-javascript'

type DestroyComponent = () => void

const addUnderline = StateEffect.define<{ from: number; to: number }>({
  map: ({ from, to }, change) => ({
    from: change.mapPos(from),
    to: change.mapPos(to),
  }),
})

const underlineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(underlines, tr) {
    underlines = underlines.map(tr.changes)
    for (const e of tr.effects) {
      if (e.is(addUnderline)) {
        underlines = underlines.update({
          add: [underlineMark.range(e.value.from, e.value.to)],
        })
      }
    }
    return underlines
  },
  provide: f => EditorView.decorations.from(f),
})

const underlineMark = Decoration.mark({ class: 'cm-underline' })

const underlineTheme = EditorView.baseTheme({
  '.cm-underline': { textDecoration: 'underline 3px red' },
})

function underlineSelection(view: EditorView) {
  const effects: StateEffect<unknown>[] = view.state.selection.ranges
    .filter(r => !r.empty)
    .map(({ from, to }) => addUnderline.of({ from, to }))
  if (!effects.length) {
    return false
  }

  if (!view.state.field(underlineField, false)) {
    effects.push(StateEffect.appendConfig.of([underlineField, underlineTheme]))
  }
  view.dispatch({ effects })
  return true
}

const underlineKeymap = keymap.of([
  {
    key: 'Mod-h',
    preventDefault: true,
    run: underlineSelection,
  },
])

export const createEditor = (parentDom: HTMLElement): DestroyComponent => {
  const state = EditorState.create({
    doc: 'hello9999999999999999999999',
    // selection: { anchor: 1, head: 8 },
    extensions: [
      //   keymap.of(defaultKeymap),
      //   StreamLanguage.define(asciidoc),
      //   // markdown().language,
      //   lineNumbers(),
      //   highlightActiveLine(),
      //   highlightActiveLineGutter(),
      //   baseTheme(),
      //   defaultTheme(),
      basicSetup,
      EditorState.tabSize.of(16),
      underlineKeymap,
    ],
  })

  const view = new EditorView({
    parent: parentDom,
    state: state,
    // extensions: [changeAsciidocHeadingFontSize()],
  })

  return () => {
    view.destroy()
  }
}

// const FONT_FAMILY = "'Menlo', sans-serif"

// const baseTheme = (): Extension => {
//   return EditorView.baseTheme({
//     '&.cm-editor': {
//       width: '100%',
//       maxWidth: '100%',
//       height: '100vh',
//       maxHeight: '100vh',
//       fontFamily: FONT_FAMILY,
//     },
//     '.cm-scroller': {
//       overflow: 'auto',
//       fontFamily: FONT_FAMILY,
//     },
//     '.cm-line': {
//       paddingLeft: '14px',
//     },
//     '.cm-gutters': {
//       paddingLeft: '10px',
//     },
//   })
// }

// const defaultTheme = (): Extension => {
//   return [
//     EditorView.theme({
//       '.cm-gutters': {
//         color: '#474e5d',
//       },
//       '.cm-activeLineGutter': {
//         backgroundColor: 'transparent',
//         color: '#848c9b',
//       },
//     }),
//     oneDark,
//   ]
// }

// class AsciidocHeadingWidget extends WidgetType {
//   public constructor(public readonly text: string) {
//     super()
//   }

//   public eq(other: AsciidocHeadingWidget) {
//     return other.text === this.text
//   }

//   public toDOM() {
//     const wrap = document.createElement('span')
//     wrap.className = 'cm-ascii-heading'
//     wrap.textContent = this.text
//     return wrap
//   }

//   public ignoreEvent() {
//     return false
//   }
// }

// const heading = (view: EditorView) => {
//   const widgets: Range<Decoration>[] = []
//   for (const { from, to } of view.visibleRanges) {
//     syntaxTree(view.state).iterate({
//       from,
//       to,
//       enter: node => {
//         if (node.name === 'heading') {
//           const deco = Decoration.widget({
//             widget: new AsciidocHeadingWidget(
//               view.state.doc.sliceString(node.from, node.to)
//             ),
//           })
//           widgets.push(deco.range(node.to))
//         }
//       },
//     })
//   }
//   return Decoration.set(widgets)
// }

// const changeAsciidocHeadingFontSize = () => {
//   return ViewPlugin.fromClass(
//     class {
//       public decorations: DecorationSet

//       public constructor(view: EditorView) {
//         this.decorations = heading(view)
//       }

//       public update(update: ViewUpdate) {
//         if (update.docChanged || update.viewportChanged) {
//           this.decorations = heading(update.view)
//         }
//       }
//     },
//     {
//       decorations: v => v.decorations,
//     }
//   )
// }
