import { expect } from '@playwright/test'
import { Locator } from 'playwright'

export class EditorPart {
  public constructor(private readonly part: Locator) {}

  public async doType(input: string | string[]) {
    if (Array.isArray(input)) {
      for (const [rowNumber, lineText] of Object.entries(input)) {
        const num = parseInt(rowNumber)
        await this.doType(lineText)

        if (num + 1 !== input.length) {
          await this.doPressEnter()
        }
      }

      return
    }

    await this.part.type(input)
  }

  public async doPressEnter() {
    await this.part.press('Enter')
  }

  public async doPressBackSpace() {
    await this.part.press('Backspace')
  }

  public async doPressUp() {
    await this.part.press('ArrowUp')
  }

  public async hasText(input: string | string[]) {
    const expectText = Array.isArray(input) ? input.join('\n') : input
    expect(await this.part.innerText()).toBe(expectText)
  }

  public async canScroll(direction: 'bottom' | 'right') {
    const scrollSize = await this.part.evaluate(
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
    await expect(this.part.locator(expectClass).first()).toBeVisible()
  }
}
