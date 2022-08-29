import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import * as React from 'react'
import { $getRoot } from 'lexical'
import {
  CursorHighlight,
  CursorRowClassName,
} from '../cursor-row-highlight/cursor-overlay-ui'

type Option = {
  cursorRowNumber?: number
  cursorHighLightWidth?: number
}

type Props = {
  className: string
  option?: Option
}

export const RowNumber = ({ className, option }: Props) => {
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
        const isMatchCursorRow = isCursorRow(value, option)

        return (
          <div data-testid={rowId} key={value} className="relative">
            <div className={isMatchCursorRow ? CursorRowClassName : ''}>
              {value}
            </div>
            {isMatchCursorRow ? (
              <CursorHighlight
                testIdRowNumber={value}
                width={option?.cursorHighLightWidth}
              />
            ) : (
              ''
            )}
          </div>
        )
      })}
    </div>
  )
}

function isCursorRow(rowValue: number, option?: Option): boolean {
  if (option === null || option?.cursorRowNumber === null) {
    return false
  }

  return rowValue === option?.cursorRowNumber
}
