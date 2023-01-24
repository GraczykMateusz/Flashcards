import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-flashcards-image',
  templateUrl: './flashcards-image.component.html',
  styleUrls: ['./flashcards-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlashcardsImageComponent {

  @Input() image?: string;
}
