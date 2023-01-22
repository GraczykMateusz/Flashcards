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
    private flashcardsService: FlashcardsService,
    private addFlashcardImageUploaderService: FlashcardImageUploaderService,
    private addSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public addFlashcard: Flashcard
  ) {
    super(addFlashcardImageUploaderService, addSnackBar, addFlashcard);
  }

  save() {
    const content = this.flashcardFormGroup.controls.content.value!;
    const translation = this.flashcardFormGroup.controls.translation.value!;
    const example = this.flashcardFormGroup.controls.example.value!;
    const image = this.flashcardFormGroup.controls.image.value!;

    this.flashcardsService.createFlashcard(content, translation, example, image)
      .then((newFlashcards) => {
        this.openSnackBar(true);
        this.addDialogRef.close({result: newFlashcards});
      }).catch((r) => {
        console.log(r);
      this.openSnackBar(false)
    });
  }

  close() {
    this.addDialogRef.close();
  }
}
