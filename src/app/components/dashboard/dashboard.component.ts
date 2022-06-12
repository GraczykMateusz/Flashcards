import {Component, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @Output() blurEvent = new EventEmitter<boolean>();
  isBlurred = false;

  blur(): void {
    this.isBlurred = !this.isBlurred;
    this.blurEvent.emit(this.isBlurred);
  }
}
