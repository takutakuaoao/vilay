import { Key } from './key'

const SHORTCUT_SEPARATOR = '+'

export class Shortcut {
  public static ofNewFileShortcut(): Shortcut {
    return new Shortcut([Key.ofCtrl(), Key.ofN()])
  }

  public static ofOpenFileShortcut(): Shortcut {
    return new Shortcut([Key.ofCmd(), Key.ofO()])
  }

  public static ofSaveFileShortcut(): Shortcut {
    return new Shortcut([Key.ofCtrl(), Key.ofS()])
  }

  public constructor(private keyList: Key[]) {}

  public accelerator(): string {
    const capitalizedList = this.keyList.map(value => value.capitalize())

    return capitalizedList.join(SHORTCUT_SEPARATOR)
  }

  public toString(): string {
    return this.keyList.join(` ${SHORTCUT_SEPARATOR} `)
  }
}
