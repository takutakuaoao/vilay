import * as React from 'react'
import { createEditor } from '../lib/codemirror'
import { useDispatch } from 'react-redux'
import { update as updateContent, useSelector } from '../../../store/index'

type Props = {
  addClass: string
}

let currentContent: string

export const Editor = ({ addClass }: Props) => {
  const parent = React.useRef<HTMLDivElement>(null)
  const [firstContent, setContent] = React.useState<string | undefined>(undefined)
  const dispatch = useDispatch()
  const updateCallback = (content: string) => {
    dispatch(updateContent(content))
  }

  currentContent = useSelector(state => state.note.content)

  React.useEffect(() => {
    const destroy = createEditor(parent.current!, firstContent, updateCallback)

    return () => destroy()
  }, [parent, firstContent])

  window.electron.receive('appCommand', (data: any[]) => {
    setContent(data[0])
  })

  return (
    <>
      <div id="code-mirror" data-testid="editor" ref={parent} className={addClass}></div>
    </>
  )
}

export const getContent = (): string => {
  return currentContent
}
