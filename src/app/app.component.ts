import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  year = '2022';
  build = '0.0';

  isFiltered = false;

  changeFiltered() {
    this.isFiltered = !this.isFiltered;
  }
}
