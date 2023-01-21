import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AuthService} from '../auth/auth.service';
import {Flashcard} from './model/flashcard';
import {NewFlashcard} from './model/new-flashcard';
import {FirebaseReferenceProvider} from '../firebase-utils/firebase-reference-provider.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private flashcardsCollection = this.firestore.collection<NewFlashcard | Flashcard>('flashcards');

  constructor(private firestore: AngularFirestore,
              private referenceProvider: FirebaseReferenceProvider,
              private authService: AuthService) {
  }

  createFlashcard(content: string, translation: string, example: string, image: string): Promise<NewFlashcard> {
    const ref = this.referenceProvider.getUsersReference(this.authService.email!);
    const flashcard = new NewFlashcard(content, translation, example, image, ref);
    return new Promise<NewFlashcard>((resolve, reject) => {
      this.flashcardsCollection.add(flashcard.asObject())
        .then(() => resolve(flashcard))
        .catch(() => reject());
    });
  }

  getFlashcards(): Observable<Flashcard[]> {
    const ref = this.referenceProvider.getUsersReference(this.authService.email!);
    return this.firestore.collection<Flashcard[]>('flashcards',
      r => r.where('userRef', '==', ref)).valueChanges({idField: 'id'});
  }

  deleteFlashcard(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection('flashcards').doc(id).delete()
        .then(() => resolve(id))
        .catch(() => reject());
    });
  }

  editFlashcard(flashcardToEdit: Flashcard): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection('flashcards').doc(flashcardToEdit.id).update({
        content: flashcardToEdit.content,
        example: flashcardToEdit.example,
        translation: flashcardToEdit.translation,
        image: flashcardToEdit.image
      }).then(() => resolve(flashcardToEdit.id))
        .catch(() => reject());
    });
  }
}
