import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-flashcards-menu',
  templateUrl: './flashcards-menu.component.html',
  styleUrls: ['./flashcards-menu.component.scss']
})
export class FlashcardsMenuComponent implements OnInit {

  readonly usernameMaxLength = 11;
  isMenuOpen = false;
  isPausedTimer = false;
  isActivatedTimer = false;
  counter!: { min: number, sec: number };
  username = 'Mateusz';
  activeTab: string | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeTab = this.route.snapshot.url[1]?.path;
  }

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
