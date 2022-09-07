import { StreamLanguage, syntaxTree } from '@codemirror/language'
import { Range } from '@codemirror/state'
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view'
import { asciidoc } from 'codemirror-asciidoc'
import { getHeadingCSSClass } from './base'

// const headingDecorationMark = Decoration.mark({ class: 'cm-heading-1' })

const asciidocHeading = (view: EditorView) => {
  const decorations: Range<Decoration>[] = []
  for (const {} of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      enter(node) {
        console.log(node)
        const content = view.state.sliceDoc(node.from, node.to)
        const cssClass = getHeadingCSSClass({
          tokenName: node.name,
          text: content,
        })
        // if (node.name === 'heading') {
        if (cssClass) {
          const deco = Decoration.mark({ class: cssClass }).range(
            node.from,
            node.to
          )
          decorations.push(deco)
        }
      },
    })
  }

  return Decoration.set(decorations)
}

const headingStylePlugin = () => {
  return ViewPlugin.fromClass(
    class {
      public decorations: DecorationSet

      public constructor(view: EditorView) {
        this.decorations = asciidocHeading(view)
      }

      public update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = asciidocHeading(update.view)
        }
      }
    },
    {
      decorations: v => v.decorations,
    }
  )
}

const parserPlugin = () => {
  return StreamLanguage.define(asciidoc as any)
}

export const asciidocPlugins = () => {
  return [parserPlugin(), headingStylePlugin()]
}
