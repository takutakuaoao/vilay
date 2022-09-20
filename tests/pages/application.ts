import { Menu } from 'electron'
import { Page, _electron } from 'playwright'
import { EditorPart } from './editor-part'
import { MenuPart } from './menu-part'

export class Application {
  public static async factory(): Promise<Application> {
    const electronApp = await _electron.launch({
      args: ['out/main.js'],
    })
    const menu = await electronApp.evaluate(async ({ app }) => {
      return app.applicationMenu
    })
    const window = await electronApp.firstWindow()

    return new Application(window, menu!)
  }
  private readonly window: Page
  private readonly menu: MenuPart
  private readonly editor: EditorPart

  private constructor(window: Page, menu: Menu) {
    this.window = window
    this.menu = new MenuPart(menu)
    this.editor = new EditorPart(this.window.locator('data-testid=editor').locator('.cm-content'))
  }

  public hasMenuLabel(text: string[]) {
    this.menu.hasMenuLabel(text)
  }

  public async doType(input: string | string[]) {
    await this.editor.doType(input)
  }

  public async doPressEnter() {
    await this.editor.doPressEnter()
  }

  public async doPressBackSpace() {
    await this.editor.doPressBackSpace()
  }

  public async doPressUp() {
    await this.editor.doPressUp()
  }

  public async hasText(input: string | string[]) {
    await this.editor.hasText(input)
  }

  public async canScroll(direction: 'bottom' | 'right') {
    await this.editor.canScroll(direction)
  }

  public async hasClass(expectClass: string) {
    await this.editor.hasClass(expectClass)
  }

  public async stop() {
    await this.window.pause()
  }
}
