import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  captchaStatus!: Subscription;

  isEmailInvalid = false;
  isPasswordInvalid = false;
  isReplayPasswordInvalid = false;
  isCaptchaInvalid = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/[\S]/), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[\S]/), Validators.min(6)]),
    replayPassword: new FormControl('', [Validators.required, Validators.pattern(/[\S]/), Validators.min(6)]),
    captcha: new FormControl(false)
  });

  constructor(private authService: AuthService) {
  }

  isInvalidFormField(formControl: FormControl<string | null>) {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  async register() {
    this.isEmailInvalid = this.userForm.controls.email.value?.length === 0;
    this.isPasswordInvalid = this.userForm.controls.password.value?.length === 0;
    this.isReplayPasswordInvalid = this.userForm.controls.replayPassword.value?.length === 0;

    // if (this.isEmailInvalid || this.isPasswordInvalid || this.isReplayPasswordInvalid) {
    //   console.log('this.isEmailInvalid=' + this.isEmailInvalid)
    //   console.log('this.isPasswordInvalid=' + this.isPasswordInvalid)
    //   console.log('this.isReplayPasswordInvalid=' + this.isReplayPasswordInvalid)
    //   return;
    // }


    const email = this.userForm.controls.email.value!;
    const password = this.userForm.controls.password.value!;

    console.log('weszlo')
    await this.authService.signUp(email, password)
  }

  private reset() {
    this.userForm.reset();
    this.isEmailInvalid = false;
    this.isPasswordInvalid = false;
    this.isReplayPasswordInvalid = false;
    this.isCaptchaInvalid = false;
  }

  setCaptchaStatus(status: boolean) {
    console.log(status)
    this.userForm.controls.captcha.setValue(status);
  }
}
