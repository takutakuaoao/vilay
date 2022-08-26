import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  // $getRoot,
  $getSelection,
  LineBreakNode,
  RangeSelection,
  // TextNode,
} from 'lexical'
import { useEffect } from 'react'

export const CursorRowHighlight = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      // editorState.read(() => {
      editor.update(() => {
        // const root = $getRoot()
        const selection = $getSelection() as RangeSelection
        const extracted = selection.extract()[0]
        console.log(selection.extract())
        // const targetKey = extracted.getKey()
        const parent = extracted.getParent()

        // console.log('root', root)
        // console.log('selection', selection)
        // console.log('extracted', extracted)
        // console.log('key', targetKey)
        // console.log('parent', parent)

        // console.log('children of parent')

        let currentRow = 0

        if (parent) {
          console.log('---------------------------------------------------')
          console.log('|                                                 |')
          console.log('|                     start                       |')
          console.log('|                                                 |')
          console.log('---------------------------------------------------')

          const children = parent.getChildren()

          for (const [keyString, child] of Object.entries(children)) {
            const key = parseInt(keyString)

            console.log(child)
            console.log(key)

            if (child instanceof LineBreakNode) {
              currentRow = currentRow + 1
            }

            // if (child.getKey() === targetKey) {
            //   break
            // }
          }
        }

        console.log(currentRow)
      })
    })
  }, [editor])

  return null
}
