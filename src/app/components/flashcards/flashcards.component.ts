import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Flashcard, FlashcardsService} from '../../services/flashcards/flashcards.service';
import {take} from 'rxjs';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlashcardsComponent implements OnInit {

  flashcards: Flashcard[] = [];
  index = 0;
  isRotated = false;

  constructor(private flashcardsService: FlashcardsService) {
  }

  ngOnInit(): void {
    this.flashcardsService.getAllFlashcards()
      .pipe(take(1))
      .subscribe(flashcards => {
      this.flashcards = flashcards;
    });
  }

  flipCard() {
    this.isRotated = !this.isRotated;
  }

  async nextFlashcard() {
    this.isRotated = false;
    await new Promise(f => setTimeout(f, 100));
    if (this.flashcards.length - 1 === this.index) {
      this.index = 0;
    } else {
      this.index++;
    }
  }
}
