import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FlashcardsService} from '../../services/flashcards/flashcards.service';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FlashcardsComponent implements OnInit {

  flash:any;
  i=0;

  isRotated = true;

  constructor(private f: FlashcardsService) {
  }

  ngOnInit(): void {
    this.f.getData()
      .then(value => {
        this.flash = value
      });
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
