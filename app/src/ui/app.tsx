import * as React from 'react'
import { $getRoot, $getSelection, EditorState } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export const App = () => {
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot()
      const selection = $getSelection()

      console.log(root, selection)
    })
  }

  const MyCustomAutoFocusPlugin = () => {
    const [editor] = useLexicalComposerContext()
    React.useEffect(() => {
      editor.focus()
    }, [editor])

    return null
  }

  const initialConfig = {
    namespace: 'Editor',
    onError: (error: Error) => console.error(error),
  }
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable testid="editor" />}
        placeholder=""
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  )
}
