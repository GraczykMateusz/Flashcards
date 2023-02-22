import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SnackBarComponent} from '../../common/snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FlashcardsRandomizerService} from '../../../services/flashcards/flashcards-randomizer/flashcards-randomizer.service';
import {FlashcardsService} from '../../../services/flashcards/flashcards.service';
import {BehaviorSubject} from 'rxjs';
import {Flashcard} from '../../../services/flashcards/model/flashcard';

@Component({
  selector: 'app-flashcards-info',
  templateUrl: './flashcards-info.component.html',
  styleUrls: ['./flashcards-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashcardsInfoComponent implements OnInit, OnDestroy {

  maxLevel = 6;
  minLevel = 1;

  @Input() notify!: BehaviorSubject<any>;

  flashcard?: Flashcard;
  index?: number;
  length?: number;

  constructor(private snackBar: MatSnackBar,
              private flashcardsService: FlashcardsService,
              private flashcardsRandomizer: FlashcardsRandomizerService) {
  }

  ngOnDestroy(): void {
    this.notify.unsubscribe();
  }

  ngOnInit(): void {
    this.notify.subscribe(r => {
      this.flashcard = r.flashcard;
      this.index = r.index;
      this.length = r.length;
    })
  }

  copyToClipboard() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
      data: true
    });
  }

  toggleRandomIndex() {
    this.flashcardsRandomizer.toggleRandomIndex();
  }

  getRandomIndex() {
    return this.flashcardsRandomizer.isRandomIndex;
  }

  nextLevel() {
    if (this.flashcard && this.flashcard.level < this.maxLevel) {
      this.updateLevel(this.flashcard.id, ++this.flashcard.level);
    }
  }

  previousLevel() {
    if (this.flashcard && this.flashcard.level > this.minLevel) {
      this.updateLevel(this.flashcard.id, --this.flashcard.level);
    }
  }

  private updateLevel(id: string, level: number) {
    this.flashcardsService.updateLevel(id, level)
      .catch(() => {
        this.openSnackBar(false)
      });
  }

  private openSnackBar(success: boolean) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: success
    });
  }

  canDisplay() {
    return this.flashcard && this.length && this.index != undefined;
  }
}
