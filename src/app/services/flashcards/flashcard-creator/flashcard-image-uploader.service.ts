import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardImageUploaderService {

  reader = new FileReader();

  foo(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      this.reader.readAsDataURL(file);
      this.reader.onload = () => resolve(this.reader.result);
      this.reader.onerror = error => reject(error);
    });
  }

}
