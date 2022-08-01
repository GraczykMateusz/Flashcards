import {Component} from '@angular/core';
import {FlashcardsService} from '../../services/flashcards/flashcards.service';
import {Flashcard} from '../../services/flashcards/model/flashcard';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent {

  isRotated = true;

  constructor(private f: FlashcardsService) {
  }

  flipCard() {
    this.isRotated = !this.isRotated;
  }

  loadNextFlashcard() {

  }
}
