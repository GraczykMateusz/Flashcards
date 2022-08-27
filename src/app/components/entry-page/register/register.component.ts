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

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/\S/), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/\S/), Validators.minLength(6)]),
    replayPassword: new FormControl('', [Validators.required, Validators.pattern(/\S/), Validators.minLength(6)]),
  });
  captcha = new FormControl(false, Validators.requiredTrue);

  constructor(private authService: AuthService) {
  }

  register() {
    if (this.userForm.invalid || this.captcha.invalid) {
      this.userForm.setErrors({error: true})
      return;
    }

    const email = this.userForm.controls.email.value!;
    const password = this.userForm.controls.password.value!;

    this.authService.signUp(email, password)
      .catch(() => {
        this.userForm.reset();
        this.userForm.setErrors({failed: true});
      });
  }

  setCaptchaStatus(status: boolean): void {
    this.captcha.setValue(status);
  }

  resetWarning() {
    this.userForm.setErrors(null);
  }
}
