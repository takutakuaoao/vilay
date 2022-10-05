import * as React from 'react'
import { AsciidocContent } from '../../../domain/asciidoc-content'

type Props = {
  class: string
}

export const Preview: React.FC<Props> = props => {
  const html = AsciidocContent.fromText('= test').parseHTML()
  return (
    <div
      className={props.class}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
