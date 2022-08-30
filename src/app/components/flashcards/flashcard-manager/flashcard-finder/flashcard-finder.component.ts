import {Component, HostListener} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FlashcardsService, NewFlashcard} from '../../../../services/flashcards/flashcards.service';
import {FlashcardImageUploaderService} from '../../../../services/flashcards/flashcard-creator/flashcard-image-uploader.service';

@Component({
  selector: 'app-flashcard-finder',
  templateUrl: './flashcard-finder.component.html',
  styleUrls: ['./flashcard-finder.component.scss']
})
export class FlashcardFinderComponent {


  flashcardFormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    translation: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    example: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    image: new FormControl()
  });

  isError = false;
  dragAreaClass = 'drag-area';
  loadedFile: File | null = null;
  z: any;

  constructor(private flashcardsService: FlashcardsService,
              private fiu: FlashcardImageUploaderService) {
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
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
    if (files.length > 1) {
      this.isError = true;
    } else {
      this.loadedFile = files.item(0) as File;
      const zz = await this.fiu.foo(this.loadedFile);
      this.flashcardFormGroup.controls.image.setValue('<img src="' + zz + '"/>');
    }
  }

  reset() {
    this.loadedFile = null;
    this.flashcardFormGroup.reset();
  }


  save() {
    const content = this.flashcardFormGroup.controls.content.value!;
    const translation = this.flashcardFormGroup.controls.translation.value!;
    const example = this.flashcardFormGroup.controls.example.value!;
    const image = this.flashcardFormGroup.controls.image.value!;

    const flashcard = new NewFlashcard(content, translation, example, image);
    this.flashcardsService.createFlashcard(flashcard).then();
  }

  isInvalidFormField(formControl: FormControl<string | null>) {
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


}
