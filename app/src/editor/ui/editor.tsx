import * as React from 'react'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { AutoFocus } from '../features/auto-focus/auto-focus'

import '../../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import { RowNumber } from '../features/row-number/row-number'

export const Editor = () => {
  const paddingTop = 'pt-4'

  return (
    <>
      <div id="default-vilay-typography" className="typography">
        <div id="default-vilay-editor-theme" className="theme">
          <div className="flex">
            <RowNumber
              className={`flex flex-col ${paddingTop} px-4 text-right`}
            />
            <PlainTextPlugin
              contentEditable={
                <ContentEditable
                  testid="editor"
                  className={`h-screen flex-grow ${paddingTop} px-4`}
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
