import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-flashcards-menu',
  templateUrl: './flashcards-menu.component.html',
  styleUrls: ['./flashcards-menu.component.scss']
})
export class FlashcardsMenuComponent {

  isMenuOpen = false;

  toggleMenu() {
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
}
