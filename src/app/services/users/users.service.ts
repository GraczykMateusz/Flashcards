import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {map, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection = this.firestore.collection<any>('users');

  constructor(private firestore: AngularFirestore) {
  }

  addUserIfNeeded(email: any) {
    this.usersCollection.doc(email).get()
      .pipe(take(1))
      .subscribe(r => {
        if (!r.exists) this.usersCollection.doc(email).set({}).then();
      });
  }
}
