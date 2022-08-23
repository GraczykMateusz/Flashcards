import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isEmailInvalid = false;
  isPasswordInvalid = false;
  isReplayPasswordInvalid = false;
  isCaptchaInvalid = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/[\S]/), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[\S]/), Validators.minLength(6)]),
    replayPassword: new FormControl('', [Validators.required, Validators.pattern(/[\S]/), Validators.minLength(6)]),
    captcha: new FormControl(false, Validators.requiredTrue)
  });

  constructor(private authService: AuthService,private router: Router) {
  }

  register() {
    this.isEmailInvalid = this.userForm.controls.email.invalid;
    this.isPasswordInvalid = this.passwordValidator();
    this.isReplayPasswordInvalid = this.passwordValidator();
    this.isCaptchaInvalid = this.userForm.controls.captcha.invalid;

    if (this.isEmailInvalid || this.isPasswordInvalid || this.isReplayPasswordInvalid || this.isCaptchaInvalid) {
      console.log('this.isEmailInvalid=' + this.isEmailInvalid)
      console.log('this.isPasswordInvalid=' + this.isPasswordInvalid)
      console.log('this.isReplayPasswordInvalid=' + this.isReplayPasswordInvalid)
      console.log('this.isCaptchaInvalid=' + this.isCaptchaInvalid)
      return;
    }

    const email = this.userForm.controls.email.value!;
    const password = this.userForm.controls.password.value!;

    // await this.authService.signUp(email, password)
  }

  setCaptchaStatus(status: boolean): void {
    this.userForm.controls.captcha.setValue(status);
  }

  private passwordValidator(): boolean {
    if (this.userForm.controls.password.invalid || this.userForm.controls.replayPassword.invalid) {
      return true;
    }
    return this.userForm.controls.password.value !== this.userForm.controls.replayPassword.value;
  }

  reset(): void {
    this.userForm.reset();
    this.isEmailInvalid = false;
    this.isPasswordInvalid = false;
    this.isReplayPasswordInvalid = false;
    this.isCaptchaInvalid = false;
  }
}
