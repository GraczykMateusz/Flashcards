import {Injectable} from '@angular/core';
import {Flashcard} from './model/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  // private flashcardsCollection = collection(this.firestore, "flashcards");

  constructor() {
  }

  add(flashcard: Flashcard): void {
    // addDoc(this.flashcardsCollection, flashcard.asJson()).then();
  }
}
