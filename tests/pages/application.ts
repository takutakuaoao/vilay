import { expect } from '@playwright/test'
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
    await this.doPressBackSpace()
    expect(await this.editor.innerText()).toBe(input.slice(0, -1))
  }

  public async pressEnter(firstInput: string, secondInput: string) {
    await this.doType(firstInput)
    await this.doPressEnter()
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

  public async doPressEnter() {
    await this.editor.press('Enter')
  }

  public async doPressBackSpace() {
    await this.editor.press('Backspace')
  }

  public async hasMarkCursorRow(rowNumber: number) {
    const isVisible = await this.window.isVisible(
      `data-testid=cursor-row-${rowNumber}`
    )

    expect(isVisible).toBeTruthy()
  }

  public async hasNotMarkCursorRow(rowNumber: number) {
    const isVisible = await this.window.isHidden(
      `data-testid=cursor-row-${rowNumber}`
    )

    expect(isVisible).toBeTruthy()
  }

  public async editorCanScroll(direction: 'bottom' | 'right') {
    const scrollSize = await this.editor.evaluate(
      (editor, { direction }) => {
        if (direction === 'bottom') {
          editor.scrollIntoView({ block: 'end' })
          return editor.scrollTop
        } else {
          editor.scrollIntoView({ inline: 'end' })
          return editor.scrollLeft
        }
      },
      { direction }
    )

    expect(scrollSize > 0).toBeTruthy()
  }

  public async stop() {
    await this.window.pause()
  }

  public async doType(input: string) {
    await this.editor.type(input)
  }
}
