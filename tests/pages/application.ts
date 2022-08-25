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

  public async doType(input: string | string[]) {
    if (Array.isArray(input)) {
      for (const [rowNumber, lineText] of Object.entries(input)) {
        const num = parseInt(rowNumber)
        await this.doType(lineText)

        // Press enter when not last line
        if (num + 1 !== input.length) {
          await this.doPressEnter()
        }
      }

      return
    }

    await this.editor.type(input)
  }

  public async doPressEnter() {
    await this.editor.press('Enter')
  }

  public async doPressBackSpace() {
    await this.editor.press('Backspace')
  }

  public async isFocus() {
    await expect(this.editor).toBeFocused()
  }

  public async hasText(input: string | string[]) {
    const expectText = Array.isArray(input) ? input.join('\n') : input
    expect(await this.editor.innerText()).toBe(expectText)
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

  public async canScroll(direction: 'bottom' | 'right') {
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

  public async expectShowRowNumberLane(expectNumber: number[]) {
    for (const value of expectNumber) {
      const rowNumber = this.window.locator(`data-testid=row-number-${value}`)
      expect(await rowNumber.innerText()).toBe(value.toString())
    }
  }

  public async stop() {
    await this.window.pause()
  }
}
