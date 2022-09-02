import { getWindowHeight, getWindowWidth } from './electron/windowSize'

export class Layout {
  public static async factory(): Promise<Layout> {
    const width = await getWindowWidth()
    const height = await getWindowHeight()
    return new Layout(width, height)
  }

  private readonly width: number
  private readonly height: number

  private readonly sideBarWidth = 300

  private constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  public calculateEditorWidth(): number {
    return this.width - this.sideBarWidth
  }

  public windowHeight(): number {
    return this.height
  }
}
