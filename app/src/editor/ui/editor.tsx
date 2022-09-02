import * as React from 'react'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { AutoFocus } from '../features/auto-focus/auto-focus'

import { RowNumber } from '../features/row-number/row-number'
import { useCursorRowHighlight } from '../features/cursor-row-highlight/cursor-row-highlight'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

type Props = {
  width: number
}

export const Editor = ({ width }: Props) => {
  const paddingTop = 'pt-4'
  const { cursorHighlight, currentRowNumber } = useCursorRowHighlight()
  const editor = useLexicalComposerContext()

  React.useEffect(cursorHighlight, [editor])

  return (
    <>
      <div id="default-vilay-typography" className="typography flex-grow">
        <div id="default-vilay-editor-theme" className="theme">
          <div className="flex">
            <RowNumber
              className={`flex flex-col ${paddingTop} px-4 text-right theme-line-number`}
              option={{
                cursorRowNumber: currentRowNumber,
                cursorHighLightWidth: width,
              }}
            />
            <PlainTextPlugin
              contentEditable={
                <ContentEditable
                  testid="editor"
                  className={`min-h-screen ${paddingTop} flex-grow px-4 pb-4 overflow-x-auto focus-visible:outline-none w-56`}
                  id="editor"
                />
              }
              placeholder=""
            />
          </div>
        </div>
      </div>
      <AutoFocus />
    </>
  )
}
