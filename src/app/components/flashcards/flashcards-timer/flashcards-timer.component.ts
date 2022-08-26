import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-flashcards-timer',
  templateUrl: './flashcards-timer.component.html',
  styleUrls: ['./flashcards-timer.component.scss']
})
export class FlashcardsTimerComponent implements OnInit, OnDestroy {

  @Input() counter!: { min: number, sec: number };
  @Input() isPaused = false;
  @Input() isActivated = false;

  private intervalId!: number;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.isPaused || !this.isActivated) return;
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59;
      } else this.counter.sec -= 1;
      if (this.counter.min === 0 && this.counter.sec == 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }
}
