export class Content {
  public constructor(private readonly value: string) {}

  public update(text: string) {
    return new Content(text)
  }

  public getContent(): string {
    return this.value
  }
}
