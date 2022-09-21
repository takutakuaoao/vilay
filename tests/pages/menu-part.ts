import { ElectronApplication, expect } from '@playwright/test'
import { MenuItem } from 'electron'

export class MenuPart {
  private static isLastLoop(currentKey: string, target: string[]): boolean {
    return currentKey === (target.length - 1).toString()
  }

  public static matchLabel(menus: MenuItem[], label: string): MenuItem | undefined {
    return menus.find(menu => menu.label === label)
  }

  public constructor(private readonly electronApp: ElectronApplication) {}

  public async clickItem(target: string[]) {
    await this.electronApp.evaluate(async ({ app }, target) => {
      let menus = app.applicationMenu!.items

      for (const key in target) {
        const matched = menus.find(menu => menu.label === target[key])

        if (matched === undefined) {
          throw new Error('Cause error because you try to click menu item that not exists.')
        }

        if (key === (target.length - 1).toString()) {
          await matched.click()
          break
        }

        menus = matched.submenu!.items
      }
    }, target)
  }

  public async hasMenuLabel(target: string[]) {
    let result = false
    let menus = await this.electronApp.evaluate(async ({ app }) => {
      return app.applicationMenu!.items
    })

    for (const key in target) {
      const matched = menus.find(menu => menu.label === target[key])

      if (matched === undefined) {
        result = false
        break
      }

      if (MenuPart.isLastLoop(key, target)) {
        result = true
        break
      }

      menus = matched.submenu!.items
    }

    expect(result).toBeTruthy()
  }
}
