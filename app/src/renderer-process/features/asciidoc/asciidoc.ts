import { StreamLanguage, syntaxTree } from '@codemirror/language'
import { Range } from '@codemirror/state'
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { asciidoc } from 'codemirror-asciidoc'
import { HeadingToken } from './base/heading-token'
import { SyntaxNodeRef } from '@lezer/common'
import { LiteralToken, LiteralTokenName } from './base/literal-token'
import { Token } from './base/token'

const asciidocHeading = (view: EditorView) => {
  let decorations: Range<Decoration>[] = []
  for (const {} of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      enter(node) {
        const headingToken = makeHeadingToken(node, nodeText(view, node))
        if (headingToken) {
          decorations = setDecorations(headingToken, decorations)
        }

        const boldToken = makeLiteralToken('bold', node, nodeText(view, node))
        if (boldToken) {
          decorations = setDecorations(boldToken, decorations)
        }

        const italicToken = makeLiteralToken('italic', node, nodeText(view, node))
        if (italicToken) {
          decorations = setDecorations(italicToken, decorations)
        }

        const monospaceToken = makeLiteralToken('monospace', node, nodeText(view, node))
        if (monospaceToken) {
          decorations = setDecorations(monospaceToken, decorations)
        }

        const superscriptToken = makeLiteralToken('superscript', node, nodeText(view, node))
        if (superscriptToken) {
          decorations = setDecorations(superscriptToken, decorations)
        }

        const subscript = makeLiteralToken('subscript', node, nodeText(view, node))
        if (subscript) {
          decorations = setDecorations(subscript, decorations)
        }
      },
    })
  }

  return Decoration.set(decorations)
}

function setDecorations(token: Token, decorations: Range<Decoration>[]): Range<Decoration>[] {
  for (const positionWithCSSClass of token.sortedPositionWithCSSClass()) {
    decorations.push(makeRange(positionWithCSSClass.position, positionWithCSSClass.cssClass))
  }

  return decorations
}

function makeRange(position: { from: number; to: number }, cssClass: string): Range<Decoration> {
  return Decoration.mark({
    class: cssClass,
  }).range(position.from, position.to)
}

function nodeText(view: EditorView, node: SyntaxNodeRef): string {
  return view.state.sliceDoc(node.from, node.to)
}

function makeLiteralToken(literalTokenName: LiteralTokenName, node: SyntaxNodeRef, text: string) {
  return LiteralToken.factory(literalTokenName, { from: node.from, to: node.to }, text, node.name)
}

function makeHeadingToken(node: SyntaxNodeRef, text: string): HeadingToken | false {
  return HeadingToken.factory({ from: node.from, to: node.to }, text, node.name)
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
