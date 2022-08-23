import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  alert = {
    userNotFound : false,
    wrongPassword: false,
    unknownError : false,
  };

  isEmailInvalid = false;
  isPasswordInvalid = false;

  constructor(private authService: AuthService) {
  }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    this.isEmailInvalid = this.userForm.controls.email.invalid;
    this.isPasswordInvalid = this.userForm.controls.email.invalid;
    if (this.isEmailInvalid || this.isPasswordInvalid) return;

    const email = this.userForm.controls.email.value!;
    const password = this.userForm.controls.password.value!;
    this.authService.signIn(email, password);
  }
}
