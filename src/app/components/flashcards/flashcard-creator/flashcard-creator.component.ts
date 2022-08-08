import {Component, HostListener} from '@angular/core';
import {Flashcard} from '../../../services/flashcards/model/flashcard';
import {FlashcardsService} from '../../../services/flashcards/flashcards.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-flashcard-creator',
  templateUrl: './flashcard-creator.component.html',
  styleUrls: ['./flashcard-creator.component.scss']
})
export class FlashcardCreatorComponent {

  flashcardFormGroup = new FormGroup({
    content: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    translation: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
    example: new FormControl(null),
    imageBase64: new FormControl(null)
  });

  isError = false;
  dragAreaClass = 'drag-area';
  loadedFile: any = null;
  z: any;

  constructor(private flashcardsService: FlashcardsService) {
  }

  async addFlashcard() {
    // const flashcard = new Flashcard('x', 'y', 'z', btoa(this.loadedFile));
    // this.flashcardsService.add(flashcard);

    var reader = new FileReader();
    reader.readAsDataURL(this.loadedFile);

    const base64 = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(this.loadedFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const zz = await base64;
    this.z = '<img src="' + zz + '"/>';
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
      this.saveFiles(files);
    }
  }

  saveFiles(files: FileList) {
    if (files.length > 1) {
      this.isError = true;
    } else {
      this.loadedFile = files.item(0);
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
    const imageBase64 = this.flashcardFormGroup.controls.imageBase64.value!;

    const flashcard = new Flashcard(content, translation, example, imageBase64);
    console.log(flashcard)
    // this.flashcardsService.add(flashcard);
  }
}
