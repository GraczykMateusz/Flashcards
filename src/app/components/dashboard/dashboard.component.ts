import {Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  @Output() blurEvent = new EventEmitter<boolean>();
  isBlurred = false;
  audioPath = '../../../assets/audio/the-real-north-intro.mp3';

  constructor(private renderer: Renderer2,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'filter');
  }

  async blur(): Promise<void> {
    this.isBlurred = !this.isBlurred;

    this.isBlurred ? this.renderer.setStyle(document.body, 'filter', "blur(4em)")
      : this.renderer.removeStyle(document.body, 'filter');

    await new Promise(f => setTimeout(f, 3000));

    this.router.navigate(['/flashcards']).then();
  }

  playAudio(): void {
    const audio = new Audio();
    audio.src = this.audioPath;
    audio.load();
    audio.play();
  }
}
