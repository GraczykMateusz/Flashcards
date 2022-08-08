export class Flashcard {
  constructor(
    public content: string,
    public translation: string,
    public example: string,
    public image: string
  ) {
  }

  asJson(): JSON {
    return JSON.parse(JSON.stringify(this));
  }
}
