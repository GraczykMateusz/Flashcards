import {Component} from '@angular/core';
import {blurAnimation} from './app.animation';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [blurAnimation]
})
export class AppComponent {

  isSignedIn = false

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.isSignedIn = localStorage.getItem('user') !== null;
  }

  async onSignUp(email: string, password: string) {
    await this.authService.signUp(email, password)
    if (this.authService.isLoggedIn)
      this.isSignedIn = true
  }

  handleLogout() {
    this.isSignedIn = false
  }
}
