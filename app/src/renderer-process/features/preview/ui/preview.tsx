import * as React from 'react'
import { useSelector } from '../../../store'

type Props = {
  class: string
}

export const Preview: React.FC<Props> = props => {
  const preview = useSelector(state => state.preview.preview)

  return (
    <div id="preview" className={`${props.class}`}>
      <div
        className="px-14"
        dangerouslySetInnerHTML={{
          __html: preview,
        }}
      />
    </div>
  )
}
