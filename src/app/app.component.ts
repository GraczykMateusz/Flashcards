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

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  async onSignUp(email: string, password: string) {
    await this.authService.signUp(email, password)
  }
}
