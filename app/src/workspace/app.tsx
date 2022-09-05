import * as React from 'react'
import { Editor } from '../editor/ui/editor'
import { FileTree } from '../features/file-tree/ui/file-tree'

import '../../styles/theme/workspace/default-vilay/default-vilay-workspace-theme.scss'
import '../../styles/theme/editor/default-vilay/default-vilay-editor-theme.scss'
import '../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import '../../styles/app.scss'

const { versions } = window

export const App = () => {
  versions.node().then(value => console.log(value))

  const sideBarWidth = 300
  const sideWidthClass = `min-w-[${sideBarWidth}px]`
  const editorWidthClass = `w-[calc(100%-300px)]`

  return (
    <div id="default-vilay-workspace-theme">
      <div className="flex w-screen">
        <FileTree addingClassName={sideWidthClass} />
        <Editor addClass={editorWidthClass} />
      </div>
    </div>
  )
}
