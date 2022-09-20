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
    this.usersCollection.get(email)
      .pipe(take(1))
      .subscribe(r => {
        console.log(r)
        //todo nie dziala
        r.forEach(result => {
          if (!result.exists || result.id !== email) this.usersCollection.doc(email).set({}).then();
        });
      });
  }
}
