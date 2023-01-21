import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Flashcard} from '../../../../services/flashcards/model/flashcard';
import {FlashcardsService} from '../../../../services/flashcards/flashcards.service';
import {SnackBarComponent} from '../../../common/snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-remove-flashcard-dialog',
  templateUrl: './remove-flashcard-dialog.component.html',
  styleUrls: ['./remove-flashcard-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RemoveFlashcardDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RemoveFlashcardDialogComponent>,
    private flashcardsService: FlashcardsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Flashcard,
  ) {
    dialogRef.disableClose = true;
  }

  deleteFlashcard(id: string) {
    console.log(id);
    this.flashcardsService.deleteFlashcard(id)
      .then((result) => {
        this.openSnackBar(true)
        this.dialogRef.close({result: result});
      })
      .catch(() => this.openSnackBar(false));
  }

  openSnackBar(success: boolean) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: success
    });
  }
}
