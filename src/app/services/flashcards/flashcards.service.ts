import {Injectable} from '@angular/core';
import {Flashcard, IFlashcard} from './model/flashcard';
import {addDoc, collection, Firestore, getDoc, getDocs} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private flashcardsCollection = this.firestore.collection<Flashcard | IFlashcard>('flashcards');

  constructor(private firestore: AngularFirestore) {
  }

  createFlashcard(flashcard: Flashcard) {
    return new Promise<string>((resolve, reject) =>
      this.flashcardsCollection.add(flashcard.asObject())
        .then(ref => resolve(ref.id))
        .catch(e => reject(e)))
  }

  getData(): Observable<IFlashcard[]> {
    return this.flashcardsCollection.valueChanges({idField: 'id'});
  }
}
