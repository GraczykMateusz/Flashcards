import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardImageUploaderService {

  maxWidth = 1000;
  maxHeight = 1000;

  resizeAndConvertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > this.maxWidth) {
            height *= this.maxWidth / width;
            width = this.maxWidth;
          }
          if (height > this.maxHeight) {
            width *= this.maxHeight / height;
            height = this.maxHeight;
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = width;
          canvas.height = height;

          ctx?.drawImage(img, 0, 0, width, height);

          const base64String = canvas.toDataURL(file.type);

          resolve(base64String);
        };

        img.src = reader.result as string;
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

}
