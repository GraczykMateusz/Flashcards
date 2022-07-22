import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent {

  isRotated = false;
  rotateClass: string = '';

  constructor(private router: Router) {
  }

  flipCard() {
    if (this.isRotated) {
      this.rotateClass = 'flip-back';
    } else {
      this.rotateClass = 'flip';
    }
    this.isRotated = !this.isRotated;
  }

  loadNextFlashcard() {

  }

  createFlashcard() {

  }

  getFlashcardCreatorLink() {
    this.router.navigate(['/flashcards/creator']).then();
  }
}
