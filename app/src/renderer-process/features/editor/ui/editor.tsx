import * as React from 'react'
import { createEditor } from '../lib/codemirror'

type Props = {
  addClass: string
}

export const Editor = ({ addClass }: Props) => {
  const parent = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const destroy = createEditor(parent.current!)

    return () => destroy()
  }, [parent])

  return (
    <>
      <div id="code-mirror" ref={parent} className={addClass}></div>
    </>
  )
}
