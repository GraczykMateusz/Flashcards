import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isEmailError = false;
  isPasswordError = false;
  isReplayPasswordError = false;

  constructor(private authService: AuthService) {
  }

  userGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    replayPassword: new FormControl('', [Validators.required])
  });

  isInvalidFormField(formControl: FormControl<string | null>) {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  async register() {
    if (this.userGroup.controls.email.value?.length === 0 ||
      this.userGroup.controls.password.value?.length === 0 ||
      this.userGroup.controls.replayPassword.value?.length === 0) {
      this.isEmailError = this.userGroup.controls.email.value?.length === 0;
      this.isPasswordError = this.userGroup.controls.password.value?.length === 0;
      this.isReplayPasswordError = this.userGroup.controls.replayPassword.value?.length === 0;
      return;
    }
    this.isEmailError = false;
    this.isPasswordError = false;
    this.isReplayPasswordError = false;

    const email = this.userGroup.controls.email.value!;
    const password = this.userGroup.controls.password.value!;
    // await this.authService.signUp(email, password)
  }
}
