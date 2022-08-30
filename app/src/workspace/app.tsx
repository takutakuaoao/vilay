import * as React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { Editor } from '../editor/ui/editor'
import { FileTree } from '../features/file-tree/ui/file-tree'

import '../../styles/theme/workspace/default-vilay/default-vilay-workspace-theme.scss'
import '../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import '../../styles/app.scss'
// import { Layout } from './features/layout/layout'

export const App = () => {
  const initialConfig = {
    namespace: 'Editor',
    onError: (error: Error) => console.error(error),
  }

  // console.log(Layout.factory())

  return (
    <div id="default-vilay-workspace-theme">
      <div className="flex">
        <FileTree addingClassName="w-[300px]" />
        <LexicalComposer initialConfig={initialConfig}>
          <Editor width={200} />
        </LexicalComposer>
      </div>
    </div>
  )
}
