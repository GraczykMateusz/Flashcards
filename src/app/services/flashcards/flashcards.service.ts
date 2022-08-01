import {Injectable} from '@angular/core';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Flashcard} from './model/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private flashcardsCollection = collection(this.firestore, "flashcards");

  constructor(private firestore: Firestore) {
  }

  add(flashcard: Flashcard): void {
    addDoc(this.flashcardsCollection, flashcard.asJson()).then();
  }
}
