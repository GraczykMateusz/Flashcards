import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentData, DocumentReference} from '@angular/fire/compat/firestore';
import {FLASHCARDS, USERS} from './collection-names';

@Injectable({
  providedIn: 'root'
})
export class FirebaseReferenceProvider {

  constructor(private store: AngularFirestore) {
  }

  getUsersReference(userId: string): DocumentReference {
    return this.store.collection<DocumentData>(USERS).doc(userId).ref;
  }
}
