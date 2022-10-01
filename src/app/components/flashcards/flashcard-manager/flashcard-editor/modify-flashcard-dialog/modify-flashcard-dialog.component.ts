import {Component, HostListener, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Flashcard} from '../../../../../services/flashcards/model/flashcard';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashcardsService} from '../../../../../services/flashcards/flashcards.service';
import {FlashcardImageUploaderService} from '../../../../../services/flashcards/flashcard-creator/flashcard-image-uploader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../../../../common/snack-bar/snack-bar.component';

@Component({
  selector: 'app-modify-flashcard-dialog',
  templateUrl: './modify-flashcard-dialog.component.html',
  styleUrls: ['./modify-flashcard-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModifyFlashcardDialogComponent implements OnInit {

  flashcardFormGroup = new FormGroup({
    content: new FormControl<string | undefined | null>(undefined, [Validators.required]),
    translation: new FormControl<string | undefined | null>(undefined, [Validators.required]),
    example: new FormControl<string | undefined | null>(undefined),
    image: new FormControl<string | undefined | null>(undefined)
  });

  constructor(
    public dialogRef: MatDialogRef<ModifyFlashcardDialogComponent>,
    private flashcardsService: FlashcardsService,
    private flashcardImageUploaderService: FlashcardImageUploaderService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Flashcard,
  ) {
  }

  ngOnInit(): void {
    this.flashcardFormGroup.controls.content.setValue(this.data.content);
    this.flashcardFormGroup.controls.translation.setValue(this.data.translation);
    this.flashcardFormGroup.controls.example.setValue(this.data.example);
    this.flashcardFormGroup.controls.image.setValue(this.data.image);
  }

  isError = false;
  dragAreaClass = 'drag-area';
  loadedFile: File | null = null;

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files).then();
  }

  @HostListener("dragover", ["$event"])
  onDragOver(event: any) {
    this.dragAreaClass = "drop-area";
    event.preventDefault();
  }

  @HostListener("dragenter", ["$event"])
  onDragEnter(event: any) {
    this.dragAreaClass = "drop-area";
    event.preventDefault();
  }

  @HostListener("dragend", ["$event"])
  onDragEnd(event: any) {
    this.dragAreaClass = "drag-area";
    event.preventDefault();
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave(event: any) {
    this.dragAreaClass = "drag-area";
    event.preventDefault();
  }

  @HostListener("drop", ["$event"])
  onDrop(event: any) {
    this.dragAreaClass = "drag-area";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files).then();
    }
  }

  async saveFiles(files: FileList) {
    this.loadedFile = files.item(0) as File;
    const imgSrc = await this.flashcardImageUploaderService.convertToImgSrc(this.loadedFile);
    this.flashcardFormGroup.controls.image.setValue('<img src="' + imgSrc + '" alt="flashcard-image"/>');
  }

  reset() {
    this.resetFile();
    this.flashcardFormGroup.reset();
  }


  save() {
    const content = this.flashcardFormGroup.controls.content.value!;
    const translation = this.flashcardFormGroup.controls.translation.value!;
    const example = this.flashcardFormGroup.controls.example.value!;
    const image = this.flashcardFormGroup.controls.image.value!;

    this.flashcardsService.createFlashcard(content, translation, example, image)
      .then(() => {
        this.openSnackBar(true);
        this.reset();
      }).catch((reason) => {
      console.log(reason)
      this.openSnackBar(false)
    });
  }

  isInvalidFormField(formControl: FormControl<string | undefined | null>) {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  isInvalid() {
    const isisInvalidContent = this.isInvalidFormField(this.flashcardFormGroup.controls.content)
      || this.flashcardFormGroup.controls.content.untouched;

    const isisInvalidTranslation = this.isInvalidFormField(this.flashcardFormGroup.controls.translation)
      || this.flashcardFormGroup.controls.translation.untouched;

    const isisInvalidExample = this.isInvalidFormField(this.flashcardFormGroup.controls.example);

    return isisInvalidContent || isisInvalidTranslation || isisInvalidExample;
  }

  openSnackBar(success: boolean) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: success
    });
  }

  resetFile() {
    this.loadedFile = null;
  }

}
