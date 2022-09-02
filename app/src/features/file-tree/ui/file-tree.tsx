import * as React from 'react'

type Props = {
  addingClassName?: string
}

export const FileTree = ({ addingClassName }: Props) => {
  return (
    <div
      data-testid="file-tree"
      className={`${addingClassName} workspace-theme-background`}
    >
      <div>Project</div>
    </div>
  )
}
