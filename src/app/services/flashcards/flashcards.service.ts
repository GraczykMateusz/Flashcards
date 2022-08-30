import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private flashcardsCollection;

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.flashcardsCollection = this.firestore.collection<NewFlashcard | Flashcard>('flashcards');
  }

  createFlashcard(flashcard: NewFlashcard) {
    return new Promise<string>((resolve, reject) =>
      this.flashcardsCollection.add(flashcard.asObject())
        .then(ref => resolve(ref.id))
        .catch(e => reject(e)))
  }

  getAllFlashcards(): Observable<Flashcard[]> {
    return this.flashcardsCollection.valueChanges({idField: 'id'});
  }
}

export class NewFlashcard {
  constructor(
    public content: string,
    public translation: string,
    public example: string,
    public image: string
  ) {
  }

  asObject() {
    return Object.assign({}, this);
  }
}

export class Flashcard {
  public id!: string;
  public content?: string;
  public translation?: string;
  public example?: string;
  public image?: string;
}
