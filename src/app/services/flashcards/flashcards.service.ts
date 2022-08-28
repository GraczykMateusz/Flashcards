import {Injectable} from '@angular/core';
import {Flashcard, IFlashcard} from './model/flashcard';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  private readonly COLLECTION_PATH = 'flashcards';
  private flashcardsCollection = this.store.collection<any>(this.COLLECTION_PATH);

  constructor(private store: AngularFirestore) {
  }

  createFlashcard(flashcard: Flashcard): Promise<string> {
    return new Promise<string>((resolve, reject) =>
      this.flashcardsCollection.add(flashcard.asObject())
        .then(ref => resolve(ref.id))
        .catch(e => reject(e)));
  }

  deleteFieldDataById(flashcardId: string): Promise<void> {
    return this.flashcardsCollection.doc(flashcardId).delete();
  }

  // getFiledData(): Observable<Flashcard[]> {
  // const collectionRef = this.firebaseReferenceProvider.getCollectionReference(collectionId);
  // return this.store.collection<Flashcard>(this.COLLECTION_PATH,
  //   ref => ref.where('collectionRef', '==', collectionRef)).valueChanges({idField: 'id'});
  // }

}
