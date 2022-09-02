import * as React from 'react'
// import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { Editor } from '../editor/ui/editor'
import { FileTree } from '../features/file-tree/ui/file-tree'

import '../../styles/theme/workspace/default-vilay/default-vilay-workspace-theme.scss'
import '../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import '../../styles/app.scss'

const { versions } = window

export const App = () => {
  versions.node().then(value => console.log(value))

  return (
    <div id="default-vilay-workspace-theme">
      <div className="flex">
        <FileTree addingClassName="w-[300px]" />
        <Editor />
      </div>
    </div>
  )
}
