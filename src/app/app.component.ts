import {Component} from '@angular/core';
import {blurAnimation} from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [blurAnimation]
})
export class AppComponent {

}
