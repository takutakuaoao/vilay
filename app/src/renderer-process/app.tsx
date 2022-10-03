import * as React from 'react'
import { Editor } from './features/editor/ui/editor'
import { FileTree } from './features/file-tree/ui/file-tree'

import '../../styles/theme/workspace/default-vilay/default-vilay-workspace-theme.scss'
import '../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import '../../styles/app.scss'
// import { useSelector } from './store'

const { electron } = window

export const App = () => {
  electron.node().then(value => console.log(value))
  // const content = useSelector(state => state.note.content)

  const sideMinWidthClass = `min-w-[300px]`
  const editorWidthClass = `w-[calc(100%-300px)]`

  return (
    <div id="default-vilay-workspace-theme">
      <div id="default-vilay-typography">
        <div className="flex w-screen">
          <FileTree addingClassName={sideMinWidthClass} />
          <Editor addClass={editorWidthClass} />
        </div>
      </div>
    </div>
  )
}
