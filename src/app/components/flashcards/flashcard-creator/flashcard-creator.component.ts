import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-flashcard-creator',
  templateUrl: './flashcard-creator.component.html',
  styleUrls: ['./flashcard-creator.component.scss']
})
export class FlashcardCreatorComponent {

  constructor(private router: Router) {
  }

  save() {

  }

  cancel() {
    this.router.navigate(['/flashcards']).then();
  }
}
