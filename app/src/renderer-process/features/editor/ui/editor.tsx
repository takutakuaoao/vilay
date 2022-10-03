import * as React from 'react'
import { createEditor } from '../lib/codemirror'

type Props = {
  addClass: string
}

export const Editor = ({ addClass }: Props) => {
  const parent = React.useRef<HTMLDivElement>(null)
  const [firstContent, setContent] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    const destroy = createEditor(parent.current!, firstContent)

    return () => destroy()
  }, [parent, firstContent])

  React.useEffect(() => {
    window.electron.receive('appCommand', (data: any[]) => {
      setContent(data[0])
    })
  })

  return (
    <>
      <div id="code-mirror" data-testid="editor" ref={parent} className={addClass}></div>
    </>
  )
}
