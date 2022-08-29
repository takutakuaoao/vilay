import * as React from 'react'

type Props = {
  testIdRowNumber: number
}

export const CursorHighlight = ({ testIdRowNumber }: Props) => {
  return (
    <div
      className="absolute -left-4 top-0 h-[24px] w-screen theme-cursor-row-highlight"
      data-testid={`cursor-row-${testIdRowNumber}`}
    ></div>
  )
}

export const CursorRowClassName = 'theme-active-cursor-row'
