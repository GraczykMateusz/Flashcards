import {Injectable} from '@angular/core';
import {Observable, take} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AuthService} from '../auth/auth.service';
import {Flashcard} from './model/flashcard';
import {NewFlashcard} from './model/new-flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private flashcardsCollection = this.firestore.collection<NewFlashcard | Flashcard>('flashcards');

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
  }

  createFlashcard(flashcard: NewFlashcard) {
    return new Promise<void>((resolve, reject) =>
      this.flashcardsCollection.doc('xxx').set(flashcard.asObject())
        .then(ref => resolve(ref))
        .catch(e => reject(e)))
  }

  getAllFlashcards(): Observable<Flashcard[]> {
    return this.flashcardsCollection.valueChanges({idField: 'id'});
  }
}
