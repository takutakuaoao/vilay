import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {} from '@lexical/text'
import * as React from 'react'
import { $getRoot } from 'lexical'

type Props = {
  className: string
}

export const RowNumber = ({ className }: Props) => {
  const [editor] = useLexicalComposerContext()
  const [rowNumber, setRowNumber] = React.useState(0)

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const text = $getRoot().getTextContent()
        const lines = text.split(/\n/)

        setRowNumber(lines.length === 0 ? 1 : lines.length)
      })
    })
  }, [editor])

  const numberList = [...Array(rowNumber).keys()].map(i => ++i)

  return (
    <div className={className}>
      {numberList.map(value => {
        const rowId = `row-number-${value}`
        return (
          <div data-testid={rowId} key={value}>
            {value}
          </div>
        )
      })}
    </div>
  )
}
