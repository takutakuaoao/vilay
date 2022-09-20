import { expect } from '@playwright/test'
import { Menu } from 'electron'

export class MenuPart {
  public constructor(private readonly part: Menu) {}

  public hasMenuLabel(text: string[]) {
    let result = false
    let menus = this.part.items

    for (const key in text) {
      const matchLabel = menus.filter(menu => menu.label === text[key])

      if (matchLabel.length === 0) {
        result = false
        break
      }

      if (key === (text.length - 1).toString()) {
        result = true
        break
      }

      menus = matchLabel[0].submenu!.items
    }

    expect(result).toBeTruthy()
  }
}
