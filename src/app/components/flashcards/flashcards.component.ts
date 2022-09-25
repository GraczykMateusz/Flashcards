import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FlashcardsService} from '../../services/flashcards/flashcards.service';
import {map, take} from 'rxjs';
import {Flashcard} from '../../services/flashcards/model/flashcard';
import {AuthService} from '../../services/auth/auth.service';

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

  constructor(private flashcardsService: FlashcardsService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getUser()
      .pipe(take(1), map(user => user?.email))
      .subscribe(email => {
        if (email) {
          this.auth.email = email;
          this.flashcardsService.getFlashcards()
            .pipe(take(1))
            .subscribe(flashcards => {
              this.flashcards = flashcards;
            });
        }
      })
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
