import * as React from 'react'
import { useDispatch } from 'react-redux'
import { update } from '../../../store'
import { createEditor } from '../lib/codemirror'

type Props = {
  addClass: string
}

export const Editor = ({ addClass }: Props) => {
  const parent = React.useRef<HTMLDivElement>(null)
  const [firstContent, setContent] = React.useState<string | undefined>('')
  const dispatch = useDispatch()

  React.useEffect(() => {
    const destroy = createEditor(parent.current!, firstContent, (content: string) =>
      dispatch(update(content))
    )

    dispatch(update(firstContent))

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
