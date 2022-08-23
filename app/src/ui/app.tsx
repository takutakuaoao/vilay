import * as React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import '../../styles/app.scss'
import '../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'

export const App = () => {
  const initialConfig = {
    namespace: 'Editor',
    onError: (error: Error) => console.error(error),
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
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
    </LexicalComposer>
  )
}
