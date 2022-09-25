import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FlashcardsService} from '../../services/flashcards/flashcards.service';
import {map, take} from 'rxjs';
import {Flashcard} from '../../services/flashcards/model/flashcard';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

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
  isRandomIndex = false;
  loading = true;

  constructor(private flashcardsService: FlashcardsService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.auth.getUser()
      .pipe(take(1), map(user => user?.email))
      .subscribe(email => {
        if (email) {
          this.auth.email = email;
          this.flashcardsService.getFlashcards()
            .pipe(take(1))
            .subscribe(async flashcards => {
              this.flashcards = flashcards;
              this.loading = false;
            });
        } else {
          this.router.navigateByUrl('/login').then();
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

  toggleRandomIndex() {
    this.isRandomIndex = !this.isRandomIndex;
  }
}
