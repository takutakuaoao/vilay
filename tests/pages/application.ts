import { expect } from '@playwright/test'
import { Locator, Page, _electron } from 'playwright'
import { FileTree } from './file-tree'

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
  public readonly fileTree: FileTree

  private constructor(window: Page) {
    this.window = window
    this.editor = this.window.locator('data-testid=editor').locator('.cm-content')
    this.fileTree = FileTree.factory(window)
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

  public async doPressUp() {
    await this.editor.press('ArrowUp')
  }

  public async hasText(input: string | string[]) {
    const expectText = Array.isArray(input) ? input.join('\n') : input
    expect(await this.editor.innerText()).toBe(expectText)
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

  public async hasClass(expectClass: string) {
    await expect(this.editor.locator(expectClass).first()).toBeVisible()
  }

  public async stop() {
    await this.window.pause()
  }
}
