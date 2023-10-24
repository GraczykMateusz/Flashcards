import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { Flashcard } from './model/flashcard';
import { NewFlashcard } from './model/new-flashcard';
import { BackupFlashcard } from '../backup/backup-flashcard';
import { FLASHCARDS } from '../firebase-utils/collection-names';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  
  private flashcardsCollection = this.firestore.collection<NewFlashcard | Flashcard>(FLASHCARDS);
  
  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
  }
  
  createFlashcard(content: string, translation: string, example: string, image: string, level: number): Promise<Flashcard> {
    const flashcard = new NewFlashcard(content, translation, example, image, level, this.authService.email!);
    return new Promise<Flashcard>((resolve, reject) => {
      this.flashcardsCollection.add(flashcard.asObject())
        .then((r) => resolve(Flashcard.newInstance(r.id, flashcard)))
        .catch(() => reject());
    });
  }
  
  addFlashcardsFromBackup(bf: BackupFlashcard[]): Promise<Flashcard[]> {
    const flashcards = bf.map(f => Flashcard.newInstance(f.id, NewFlashcard.newInstance(f)));
    return new Promise<Flashcard[]>((resolve, reject) => {
      flashcards.forEach(flashcard => {
        this.firestore.collection('flashcards').doc(flashcard.id).set({
          content: flashcard.content,
          example: flashcard.example,
          translation: flashcard.translation,
          image: flashcard.image,
          level: flashcard.level,
          owner: flashcard.owner
        }).catch(() => reject());
      });
      resolve(flashcards)
    });
  }
  
  getFlashcards(): Observable<Flashcard[]> {
    return this.firestore.collection<Flashcard>('flashcards',
        r => r.where('owner', '==', this.authService.email!))
      .valueChanges({idField: 'id'});
  }
  
  deleteFlashcard(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection('flashcards').doc(id).delete()
        .then(() => resolve(id))
        .catch(() => reject());
    });
  }
  
  deleteUserFlashcards(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.firestore.collection('flashcards',
        r => r.where('owner', '==', this.authService.email!)).get()
        .pipe(take(1))
        .subscribe(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            documentSnapshot.ref.delete()
              .catch(() => reject());
          });
          resolve();
        });
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
  
  updateLevel(id: string, level: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection('flashcards').doc(id).update({
        level: level
      }).then(() => resolve(id))
        .catch(() => reject());
    });
  }
}
