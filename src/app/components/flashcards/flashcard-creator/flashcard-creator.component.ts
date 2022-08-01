import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {Flashcard} from '../../../services/flashcards/model/flashcard';
import {FlashcardsService} from '../../../services/flashcards/flashcards.service';

@Component({
  selector: 'app-flashcard-creator',
  templateUrl: './flashcard-creator.component.html',
  styleUrls: ['./flashcard-creator.component.scss']
})
export class FlashcardCreatorComponent {

  isError: boolean = false;
  dragAreaClass: string = "drag-area";
  loadedFile: any;

  constructor(private flashcardsService: FlashcardsService) {
  }

  addFlashcard() {
    // const imageBase64 = Buffer.from(this.loadedFile).toString('base64');
    const flashcard = new Flashcard('x', 'y', 'z', 'imageBase64');
    this.flashcardsService.add(flashcard);
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "drop-area";
    event.preventDefault();
  }

  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "drop-area";
    event.preventDefault();
  }

  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "drag-area";
    event.preventDefault();
  }

  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "drag-area";
    event.preventDefault();
  }

  @HostListener("drop", ["$event"]) onDrop(event: any) {
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
    }
    else {
      this.loadedFile = files.item(0);
    }
  }

  reset() {
    this.isError = false;
    this.loadedFile = '';
  }


  save() {

  }
}
