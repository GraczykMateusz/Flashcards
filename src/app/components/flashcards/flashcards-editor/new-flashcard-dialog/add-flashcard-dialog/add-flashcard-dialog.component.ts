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

  save() {
    const content = this.flashcardFormGroup.controls.content.value!;
    const translation = this.flashcardFormGroup.controls.translation.value!;
    const example = this.flashcardFormGroup.controls.example.value!;
    const image = this.flashcardFormGroup.controls.image.value!;

    this.addFlashcardsService.createFlashcard(content, translation, example, image)
      .then(() => {
        this.openSnackBar(true);
        this.close();
      }).catch(() => this.openSnackBar(false));
  }

  close() {
    this.addDialogRef.close();
  }
}
