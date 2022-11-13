import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Flashcard} from '../../../../services/flashcards/model/flashcard';

@Component({
  selector: 'app-remove-flashcard-dialog',
  templateUrl: './remove-flashcard-dialog.component.html',
  styleUrls: ['./remove-flashcard-dialog.component.scss']
})
export class RemoveFlashcardDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RemoveFlashcardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flashcard,
  ) {
  }
}
