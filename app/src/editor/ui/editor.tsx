import * as React from 'react'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { AutoFocus } from '../features/auto-focus/auto-focus'

import '../../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import { RowNumber } from '../features/row-number/row-number'
import { useCursorRowHighlight } from '../features/cursor-row-highlight/cursor-row-highlight'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export const Editor = () => {
  const paddingTop = 'pt-4'
  const { cursorHighlight, currentRowNumber } = useCursorRowHighlight()
  const editor = useLexicalComposerContext()

  React.useEffect(cursorHighlight, [editor])

  return (
    <>
      <div id="default-vilay-typography" className="typography">
        <div id="default-vilay-editor-theme" className="theme">
          <div className="flex">
            <RowNumber
              className={`flex flex-col ${paddingTop} px-4 text-right theme-line-number`}
              option={{ cursorRowNumber: currentRowNumber }}
            />
            <PlainTextPlugin
              contentEditable={
                <ContentEditable
                  testid="editor"
                  className={`min-h-screen flex-grow ${paddingTop} px-4 pb-4 overflow-x-auto`}
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
