import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import * as React from 'react'

export const Editor = () => {
  return (
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
  )
}
