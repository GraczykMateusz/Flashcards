import { Component, OnInit } from '@angular/core';
import {FlashcardsService} from '../../services/flashcards/flashcards.service';
import {IFlashcard} from '../../services/flashcards/model/flashcard';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {

  flash: IFlashcard[] = [];
  i=0;

  isRotated = true;

  constructor(private f: FlashcardsService) {
  }

  ngOnInit(): void {
    this.f.getData().subscribe(v => this.flash = v)
  }

  flipCard() {
    this.isRotated = !this.isRotated;
  }

  loadNextFlashcard() {
    const min = Math.ceil(0);
    const max = Math.floor(1);

    this.i = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(this.i)
  }

}
