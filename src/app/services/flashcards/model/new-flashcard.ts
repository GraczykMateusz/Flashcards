import {DocumentReference} from '@angular/fire/compat/firestore';

export class NewFlashcard {
  constructor(
    public content: string,
    public translation: string,
    public example: string,
    public image: string,
    public userRef: DocumentReference
  ) {
  }

  asObject() {
    return Object.assign({}, this);
  }
}
