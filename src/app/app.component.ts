import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isBlurred = false;

  blur(isBlurred: boolean): void {
    this.isBlurred = isBlurred;
  }
}
