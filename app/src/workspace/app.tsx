import * as React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { Editor } from '../editor/ui/editor'

import '../../styles/app.scss'

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
