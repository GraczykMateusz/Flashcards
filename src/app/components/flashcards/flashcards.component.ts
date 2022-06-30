import {Component} from '@angular/core';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent {

  isRotated = false;
  rotateClass: string = '';

  flipCard() {
    if (this.isRotated) {
      this.rotateClass = 'flip-back';
    } else {
      this.rotateClass = 'flip';
    }
    this.isRotated = !this.isRotated;
  }
}
