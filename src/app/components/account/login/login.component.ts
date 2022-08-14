import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isEmailError = false;
  isPasswordError = false;

  constructor(private authService: AuthService) {
  }

  userGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  isInvalidFormField(formControl: FormControl<string | null>) {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  async login() {
    if (this.userGroup.controls.email.value?.length === 0 && this.userGroup.controls.password.value?.length === 0) {
      this.isEmailError = true;
      this.isPasswordError = true;
      return;
    }
    if (this.userGroup.controls.email.value?.length === 0) {
      this.isEmailError = true;
      return;
    }
    if (this.userGroup.controls.password.value?.length === 0) {
      this.isPasswordError = true;
      return;
    }
    this.isEmailError = false;
    this.isPasswordError = false;

    const email = this.userGroup.controls.email.value!;
    const password = this.userGroup.controls.password.value!;

    await this.authService.signIn(email, password);
  }
}
