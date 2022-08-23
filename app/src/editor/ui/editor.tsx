import * as React from 'react'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { AutoFocus } from '../features/auto-focus/auto-focus'

import '../../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'

export const Editor = () => {
  return (
    <>
      <div id="default-vilay-typography" className="typography">
        <div id="default-vilay-editor-theme" className="theme">
          <PlainTextPlugin
            contentEditable={
              <ContentEditable testid="editor" className="h-screen p-4" />
            }
            placeholder=""
          />
        </div>
      </div>
      <AutoFocus />
    </>
  )
}
