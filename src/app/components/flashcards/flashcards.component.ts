import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent {

  isRotated = true;

  constructor(private router: Router) {
  }

  flipCard() {
    this.isRotated = !this.isRotated;
  }

  loadNextFlashcard() {

  }

  getFlashcardCreatorLink() {
    this.router.navigate(['/flashcards/creator']).then();
  }
}
