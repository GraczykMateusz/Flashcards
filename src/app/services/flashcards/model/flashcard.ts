export class Flashcard {
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

export interface IFlashcard {
  content: string,
  translation: string,
  example: string,
  image: string
}
