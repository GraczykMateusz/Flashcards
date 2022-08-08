import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-flashcards-menu',
  templateUrl: './flashcards-menu.component.html',
  styleUrls: ['./flashcards-menu.component.scss']
})
export class FlashcardsMenuComponent {

  isMenuOpen = false;
  isPausedTimer = false;
  isActivatedTimer = false;
  counter!: { min: number, sec: number };
  username = 'Mateusz';

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeDropDown(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth >= 600) {
      this.closeDropDown();
    }
  }

  pauseTimer(): void {
    this.isPausedTimer = true;
  }

  closeTimer(): void {
    this.isActivatedTimer = false;
    this.isPausedTimer = false;
  }

  resumeTimer(): void {
    this.isPausedTimer = false;
  }

  startTimer(): void {
    this.isActivatedTimer = true;
    this.isPausedTimer = false;
    this.counter = {min: 10, sec: 10};
  }

  canStartTimer(): boolean {
    return !this.isPausedTimer && !this.isActivatedTimer;
  }

  canResumeTimer(): boolean {
    return this.isPausedTimer && this.isActivatedTimer;
  }

  canPauseTimer(): boolean {
    return !this.isPausedTimer && this.isActivatedTimer;
  }
}
