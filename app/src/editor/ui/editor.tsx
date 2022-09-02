import * as React from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { oneDark as defaultTheme } from '@codemirror/theme-one-dark'

export const Editor = () => {
  const parent = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const startState = EditorState.create({
      doc: undefined,
      extensions: [keymap.of(defaultKeymap), defaultTheme],
    })
    const editorView = new EditorView({
      state: startState,
      parent: parent.current!,
    })

    return () => {
      editorView.destroy()
    }
  }, [parent])

  return (
    <>
      <div id="code-mirror" ref={parent}></div>
    </>
  )
}
