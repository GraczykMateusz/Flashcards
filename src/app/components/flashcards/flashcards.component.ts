import {Component} from '@angular/core';
import {FlashcardsService} from '../../services/flashcards/flashcards.service';

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
