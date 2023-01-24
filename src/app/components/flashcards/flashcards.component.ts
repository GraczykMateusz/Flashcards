import {Component, OnInit} from '@angular/core';
import {FlashcardsService} from '../../services/flashcards/flashcards.service';
import {map, take} from 'rxjs';
import {Flashcard} from '../../services/flashcards/model/flashcard';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../common/snack-bar/snack-bar.component';
import arrayShuffle from 'array-shuffle';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {

  flashcards: Flashcard[] = [];
  index = 0;
  nextFlashcardIndex = 0;
  randomIndexes: number[] = [];
  isRotated = false;
  isRandomIndex = false;
  loading = true;

  constructor(private flashcardsService: FlashcardsService,
              private auth: AuthService,
              private snackBar: MatSnackBar,
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
            .subscribe(flashcards => {
              this.flashcards = flashcards;
              this.randomIndexes = Array.from(Array(this.flashcards.length).keys())
              this.loading = false;
            });
        } else {
          // this.router.navigateByUrl('/login').then();
        }
      })
  }

  flipCard() {
    this.isRotated = !this.isRotated;
  }

  async nextFlashcard() {
    this.isRotated = false;
    await new Promise(f => setTimeout(f, 100));

    if (this.flashcards.length - 1 === this.nextFlashcardIndex) {
      this.nextFlashcardIndex = 0;
    } else {
      this.nextFlashcardIndex++;
    }

    if (this.isRandomIndex) {
      this.index = this.randomIndexes[this.nextFlashcardIndex];
    } else {
      this.index = this.nextFlashcardIndex;
    }
  }

  toggleRandomIndex() {
    this.randomIndexes = arrayShuffle(this.randomIndexes)
    this.isRandomIndex = !this.isRandomIndex;
  }

  copyToClipboard() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
      data: true
    });
  }
}
