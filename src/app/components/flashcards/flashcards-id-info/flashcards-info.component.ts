import {Component, Input, ViewEncapsulation} from '@angular/core';
import {SnackBarComponent} from '../../common/snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FlashcardsRandomizerService} from '../../../services/flashcards/flashcards-randomizer/flashcards-randomizer.service';

@Component({
  selector: 'app-flashcards-info',
  templateUrl: './flashcards-info.component.html',
  styleUrls: ['./flashcards-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlashcardsInfoComponent {

  @Input() id?: string;
  @Input() index!: number;
  @Input() length!: number;

  constructor(private snackBar: MatSnackBar,
              private flashcardsRandomizer: FlashcardsRandomizerService) { }

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
}
