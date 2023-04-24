import { Injectable } from '@angular/core';
import arrayShuffle from 'array-shuffle';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsRandomizerService {

  isRandomIndex = false;
  randomIndexes: number[] = [];

  constructor() { }

  toggleRandomIndex(): void {
    this.randomIndexes = arrayShuffle(this.randomIndexes)
    this.isRandomIndex = !this.isRandomIndex;
  }
}
