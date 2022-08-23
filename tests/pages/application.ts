import { expect } from '@playwright/test'
import { Locator, Page, _electron } from 'playwright'

export class Application {
  public static async factory(): Promise<Application> {
    const electronApp = await _electron.launch({
      args: ['out/main.js'],
    })
    const window = await electronApp.firstWindow()

    return new Application(window)
  }

  private readonly editor: Locator

  private constructor(window: Page) {
    this.editor = window.locator('data-testid=editor')
  }

  public async type(input: string) {
    await this.doType(input)
    expect(await this.editor.innerText()).toBe(input)
  }

  public async pressBackSpace(input: string) {
    await this.doType(input)
    await this.editor.press('Backspace')
    expect(await this.editor.innerText()).toBe(input.slice(0, -1))
  }

  public async pressEnter(firstInput: string, secondInput: string) {
    await this.doType(firstInput)
    await this.editor.press('Enter')
    await this.doType(secondInput)

    const expectText = `${firstInput}\n${secondInput}`
    expect(await this.editor.innerText()).toBe(expectText)
  }

  public async isFocus() {
    await expect(this.editor).toBeFocused()
  }

  private async doType(input: string) {
    await this.editor.type(input)
  }
}
