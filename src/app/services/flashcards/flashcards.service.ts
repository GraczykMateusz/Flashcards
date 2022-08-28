import {Injectable} from '@angular/core';
import {Flashcard} from './model/flashcard';
import {addDoc, collection, Firestore, getDoc, getDocs} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  constructor(private firestore: Firestore) {
  }

  createFlashcard(flashcard: Flashcard) {
    const dbCollection = collection(this.firestore, 'flashcards');
    addDoc(dbCollection, flashcard.asObject()).then();
  }

  getData() {
    const dbCollection = collection(this.firestore, 'flashcards');
    return getDocs(dbCollection).then(value => value.docs.map(value1 => {
      return {...value1.data(), id: value1.id};
    }))
  }

}
