import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FlashcardsService} from '../../../../../services/flashcards/flashcards.service';
import {FlashcardImageUploaderService} from '../../../../../services/flashcards/flashcard-creator/flashcard-image-uploader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Flashcard} from '../../../../../services/flashcards/model/flashcard';
import {NewFlashcardDialogComponent} from '../new-flashcard-dialog.component';

@Component({
  selector: 'app-add-flashcard-dialog',
  templateUrl: './add-flashcard-dialog.component.html',
  styleUrls: ['./add-flashcard-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddFlashcardDialogComponent extends NewFlashcardDialogComponent {

  constructor(
    private addDialogRef: MatDialogRef<AddFlashcardDialogComponent>,
    private addFlashcardsService: FlashcardsService,
    private addFlashcardImageUploaderService: FlashcardImageUploaderService,
    private addSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public addFlashcard: Flashcard
  ) {
    super(addFlashcardsService, addFlashcardImageUploaderService, addSnackBar, addFlashcard);
  }

  close() {
    this.addDialogRef.close();
  }
}
