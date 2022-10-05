import * as React from 'react'
import { Editor } from './features/editor/ui/editor'

import '../../styles/theme/workspace/default-vilay/default-vilay-workspace-theme.scss'
import '../../styles/typography/editor/default-vilay/default-vilay-editor-typography.scss'
import '../../styles/app.scss'
import { Preview } from './features/preview/ui/preview'
// import { useSelector } from './store'

const { electron } = window

export const App = () => {
  electron.node().then(value => console.log(value))
  // const content = useSelector(state => state.note.content)

  return (
    <div id="default-vilay-workspace-theme">
      <div id="default-vilay-typography">
        <div className="flex w-screen">
          <Editor addClass={'w-1/2'} />
          <Preview class="w-1/2" />
        </div>
      </div>
    </div>
  )
}
