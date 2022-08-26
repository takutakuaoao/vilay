import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, LineBreakNode, RangeSelection, TextNode } from 'lexical'
import { useState } from 'react'

export const useCursorRowHighlight = () => {
  const [editor] = useLexicalComposerContext()
  const [currentRowNumber, setCurrentRowNumber] = useState(0)

  const cursorHighlight = () => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection() as RangeSelection

        if (selection == null) {
          return
        }

        const targetKey = selection.extract()[0].getKey()
        const parent = selection.extract()[0].getParent()

        let currentRow = 0

        if (parent) {
          const children = parent.getChildren()

          for (const [keyString, child] of Object.entries(children)) {
            const key = parseInt(keyString)

            //
            // カウント処理
            //
            currentRow = currentRow + 1

            if (
              child instanceof LineBreakNode &&
              key > 0 &&
              children[key - 1] instanceof TextNode
            ) {
              currentRow = currentRow - 1
            }

            // 最終行が空文字のみの場合、childrenには空文字の情報が含まれないため
            // カーソルの位置情報とchildrenの最後のノードタイプから
            // 行番号を加算するか判定する
            if (
              key === children.length - 1 &&
              child instanceof LineBreakNode &&
              selection.anchor.key === '1' &&
              selection.anchor.offset === children.length
            ) {
              currentRow = currentRow + 1
            }

            //
            // ストップ処理
            //
            if (child.getKey() === targetKey) {
              break
            }
          }
        }

        setCurrentRowNumber(currentRow)
      })
    })
  }

  return { cursorHighlight, currentRowNumber }
}
