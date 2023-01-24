import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-register-formula',
  templateUrl: './register-formula.component.html',
  styleUrls: ['./register-formula.component.scss']
})
export class RegisterFormulaComponent {

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/\S/), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/\S/), Validators.minLength(6)]),
    replayPassword: new FormControl('', [Validators.required, Validators.pattern(/\S/), Validators.minLength(6)]),
  });
  captchaForm = new FormControl(false, Validators.requiredTrue);

  constructor(private authService: AuthService) {
  }

  register() {
    if (this.userForm.invalid) {
      this.userForm.setErrors({error: true})
      return;
    }
    if (this.captchaForm.invalid) {
      this.captchaForm.setErrors({error: true})
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
    this.captchaForm.setValue(status);
    if (status) {
      this.captchaForm.setErrors(null);
    }
  }

  resetWarning() {
    this.userForm.setErrors(null);
  }
}
