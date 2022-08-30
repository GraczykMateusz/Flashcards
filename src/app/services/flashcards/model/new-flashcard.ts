export class NewFlashcard {
  constructor(
    public content: string,
    public translation: string,
    public example: string,
    public image: string
  ) {
  }

  asObject() {
    return Object.assign({}, this);
  }
}
