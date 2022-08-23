import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export const AutoFocus = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.focus()
  }, [editor])

  return null
}
