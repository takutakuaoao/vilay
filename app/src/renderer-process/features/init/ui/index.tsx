import * as React from 'react'
import { Shortcut } from '../../../domain/shortcut/shortcut'

export const Init = () => {
  return (
    <div className="w-screen h-screen absolute bg-[#21252b] flex justify-center items-center">
      <div>
        <div className="mb-6">
          <ShortcutComponent
            message="Making New File Shortcut"
            keyList={Shortcut.ofNewFileShortcut().symbols()}
          />
        </div>
        <ShortcutComponent
          message="Open File Shortcut"
          keyList={Shortcut.ofOpenFileShortcut().symbols()}
        />
      </div>
    </div>
  )
}

type ShortcutProps = {
  message: string
  keyList: string[]
}

const ShortcutComponent: React.FC<ShortcutProps> = ({ message, keyList }) => {
  return (
    <div className="text-[#9da5b4] text-2xl font-bold">
      <span className="mr-3">{message}</span>
      <span className="border-2 border-[#9da5b4] rounded-lg py-1 px-3">
        {keyList.map((value, index) => {
          return (
            <span className="mr-3" key={index}>
              {value}
            </span>
          )
        })}
      </span>
    </div>
  )
}
