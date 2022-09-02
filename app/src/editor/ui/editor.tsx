import * as React from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'

type Props = {
  width: number
}

export const Editor = ({ width }: Props) => {
  const parent = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const startState = EditorState.create({
      doc: 'Hello World',
      extensions: [keymap.of(defaultKeymap)],
    })
    new EditorView({
      state: startState,
      parent: parent.current!,
    })
  }, [])

  return (
    <>
      <div id="code-mirror" ref={parent}></div>
    </>
  )
}
