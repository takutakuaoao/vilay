import * as React from 'react'

type Props = {
  testIdRowNumber: number
  width?: number
}

export const CursorHighlight = ({ testIdRowNumber, width }: Props) => {
  const highlightWidth = width ?? '100vw'
  return (
    <div
      className={`absolute -left-4 top-0 h-[24px] theme-cursor-row-highlight`}
      data-testid={`cursor-row-${testIdRowNumber}`}
      style={{ width: highlightWidth }}
    ></div>
  )
}

export const CursorRowClassName = 'theme-active-cursor-row'
