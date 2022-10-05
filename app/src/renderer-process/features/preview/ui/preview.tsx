import * as React from 'react'
import { AsciidocContent } from '../../../domain/asciidoc-content'

export const Preview = () => {
  const html = AsciidocContent.fromText('= test').parseHTML()
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
