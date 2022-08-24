import { Expect, expect } from '@playwright/test'
import { Locator, Page, _electron } from 'playwright'

type WindowSize = {
  width: number
  height: number
}

export class Application {
  public static async factory(windowSize?: WindowSize): Promise<Application> {
    const electronApp = await _electron.launch({
      args: ['out/main.js'],
    })
    const window = await electronApp.firstWindow()

    if (windowSize !== undefined) {
      await window.setViewportSize(windowSize)
    }

    return new Application(window)
  }

  private readonly window: Page
  private readonly editor: Locator

  private constructor(window: Page) {
    this.window = window
    this.editor = this.window.locator('data-testid=editor')
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

  public async expectShowRowNumberLane(expectNumber: number[]) {
    for (const value of expectNumber) {
      const rowNumber = this.window.locator(`data-testid=row-number-${value}`)
      expect(await rowNumber.innerText()).toBe(value.toString())
    }
  }

  public async editorCanScroll(direction: 'bottom' | 'right') {
    await this.editor.evaluate(
      (editor, { direction, expect }) => {
        if (direction === 'bottom') {
          editor.scrollIntoView({ block: 'end' })
          expect(editor.scrollTop > 0).toBeTruthy()
        } else {
          editor.scrollIntoView({ inline: 'end' })
          expect(editor.scrollLeft === 0).toBeTruthy()
        }
      },
      { direction, expect }
    )
  }

  public async stop() {
    await this.window.pause()
  }

  public async doType(input: string) {
    await this.editor.type(input)
  }
}
