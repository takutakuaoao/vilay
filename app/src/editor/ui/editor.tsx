import * as React from 'react'
import { CoreEditor } from '../core/core-editor'

export const Editor = () => {
  const parent = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const editor = CoreEditor.factory(parent.current!)

    return () => editor.destroy()
  }, [parent])

  return (
    <>
      <div id="code-mirror" ref={parent} className="w-screen"></div>
    </>
  )
}
