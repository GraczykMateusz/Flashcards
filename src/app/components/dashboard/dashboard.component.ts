import {Component, EventEmitter, OnDestroy, Output, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  @Output() blurEvent = new EventEmitter<boolean>();
  isBlurred = false;

  constructor(private renderer: Renderer2,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'blur');
  }

  async blur(): Promise<void> {
    this.isBlurred = !this.isBlurred;

    this.isBlurred ? this.renderer.setStyle(document.body, 'filter', "blur(4em)")
      : this.renderer.removeStyle(document.body, 'filter');

    await new Promise(f => setTimeout(f, 3000));

    this.router.navigate(['/flashcards']);
  }
}
