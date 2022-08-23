import * as React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import '../../styles/app.scss'
import '../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import { Editor } from '../editor/ui/editor'

export const App = () => {
  const initialConfig = {
    namespace: 'Editor',
    onError: (error: Error) => console.error(error),
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Editor />
    </LexicalComposer>
  )
}
