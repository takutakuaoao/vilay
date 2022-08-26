import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import * as React from 'react'
import { $getRoot } from 'lexical'

type Props = {
  className: string
  option?: {
    cursorRowNumber?: number
  }
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

        return (
          <div data-testid={rowId} key={value} className="relative">
            <div
              className={
                value === option?.cursorRowNumber
                  ? 'theme-active-cursor-row'
                  : ''
              }
            >
              {value}
            </div>
            {value === option?.cursorRowNumber ? (
              <CursorHighlight testIdName={`cursor-row-${value}`} />
            ) : (
              ''
            )}
          </div>
        )
      })}
    </div>
  )
}

type CursorHighLightProps = {
  testIdName: string
}

const CursorHighlight = ({ testIdName }: CursorHighLightProps) => {
  return (
    <div
      className="absolute -left-4 top-0 h-[24px] w-screen theme-cursor-row-highlight"
      data-testid={testIdName}
    ></div>
  )
}
