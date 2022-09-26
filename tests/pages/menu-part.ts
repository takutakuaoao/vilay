import { ElectronApplication, expect } from '@playwright/test'

export class MenuPart {
  private static isLastLoop(currentKey: string, target: string[]): boolean {
    return currentKey === (target.length - 1).toString()
  }

  public constructor(private readonly electronApp: ElectronApplication) {}

  public async clickItemById(menuId: string): Promise<void> {
    await this.electronApp.evaluate(async ({ Menu }, id) => {
      const menu = Menu.getApplicationMenu()
      const menuItem = menu!.getMenuItemById(id)

      if (menuItem) {
        await menuItem.click()
      } else {
        throw new Error(`Menu item with id ${id} not found`)
      }
    }, menuId)
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

  public async isOpenDialog() {
    // const isOpen = await this.electronApp.evaluate(({ app, BrowserWindow }) => {
    // const window = BrowserWindow.getFocusedWindow()
    // const window = BrowserWindow.getAllWindows()
    // app.
    // return window
    // if (window === null) {
    //   return 'ttt'
    // }
    // return window.isModal()
    // })
    // console.log(isOpen)
    // expect(isOpen).toBeTruthy()

    const window = await this.electronApp.firstWindow()
  }
}
