import { expect } from '@playwright/test'
import { Locator, Page } from 'playwright'

export class FileTree {
  public static factory(window: Page): FileTree {
    const element = window.locator('data-testid=file-tree')
    return new FileTree(element)
  }

  private readonly element: Locator

  private constructor(fileTreeElement: Locator) {
    this.element = fileTreeElement
  }

  public async showProjectText() {
    await expect(this.element).toContainText('Project')
  }
}
