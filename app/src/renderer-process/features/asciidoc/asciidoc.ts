import { StreamLanguage, syntaxTree } from '@codemirror/language'
import { Range } from '@codemirror/state'
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { asciidoc } from 'codemirror-asciidoc'
import { HeadingToken } from './base/heading-token'
import { SyntaxNodeRef } from '@lezer/common'
import { LiteralToken } from './base/literal-token'

const TOKEN_MARK_CSS = 'cm-token-mark'

const asciidocHeading = (view: EditorView) => {
  const decorations: Range<Decoration>[] = []
  for (const {} of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      enter(node) {
        const headingToken = makeHeadingToken(node, nodeText(view, node))
        if (headingToken) {
          decorations.push(makeHeadingRange(headingToken))
          decorations.push(makeMarkRange(headingToken))
        }

        const boldToken = makeBoldToken(node, nodeText(view, node))
        if (boldToken) {
          decorations.push(makeBoldRange(boldToken))
          decorations.push(makeRange(boldToken.positionMaker()[0], TOKEN_MARK_CSS))
          decorations.push(makeRange(boldToken.positionMaker()[1], TOKEN_MARK_CSS))
        }

        const italicToken = makeItalicToken(node, nodeText(view, node))
        if (italicToken) {
          decorations.push(makeItalicRange(italicToken))
          decorations.push(makeRange(italicToken.positionMaker()[0], TOKEN_MARK_CSS))
          decorations.push(makeRange(italicToken.positionMaker()[1], TOKEN_MARK_CSS))
        }
      },
    })
  }

  return Decoration.set(decorations)
}

function makeItalicRange(token: LiteralToken): Range<Decoration> {
  return makeRange(token.positionToken(), token.cssClass())
}

function makeBoldRange(token: LiteralToken): Range<Decoration> {
  return makeRange(token.positionToken(), token.cssClass())
}

function makeHeadingRange(token: HeadingToken): Range<Decoration> {
  return makeRange(token.positionToken(), token.cssClass())
}

function makeMarkRange(token: HeadingToken): Range<Decoration> {
  return makeRange(token.positionMark(), TOKEN_MARK_CSS)
}

function makeRange(position: { from: number; to: number }, cssClass: string): Range<Decoration> {
  return Decoration.mark({
    class: cssClass,
  }).range(position.from, position.to)
}

function nodeText(view: EditorView, node: SyntaxNodeRef): string {
  return view.state.sliceDoc(node.from, node.to)
}

function makeItalicToken(node: SyntaxNodeRef, text: string): LiteralToken | false {
  return LiteralToken.factoryItalic({ from: node.from, to: node.to }, text, node.name)
}

function makeBoldToken(node: SyntaxNodeRef, text: string): LiteralToken | false {
  return LiteralToken.factoryBold({ from: node.from, to: node.to }, text, node.name)
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
