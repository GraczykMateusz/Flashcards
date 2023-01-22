import {NewFlashcard} from './new-flashcard';

export class Flashcard {
  public id!: string;
  public content?: string;
  public translation?: string;
  public example?: string;
  public image?: string;

  static newInstance(id: string, newFlashcard: NewFlashcard): Flashcard {
    let flashcard = new Flashcard();
    flashcard.id = id;
    flashcard.image = newFlashcard.image;
    flashcard.translation = newFlashcard.translation;
    flashcard.content = newFlashcard.content;
    flashcard.example = newFlashcard.example;
    return flashcard;
  }
}
