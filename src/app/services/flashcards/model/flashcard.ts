export class Flashcard {
  constructor(
    public content: string,
    public translation: string,
    public usage: string,
    public imageBase64: string
  ) {
  }

  asJson(): JSON {
    return JSON.parse(JSON.stringify(this));
  }
}
