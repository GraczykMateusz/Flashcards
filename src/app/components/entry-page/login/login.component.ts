import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {
  }

  userForm = new FormGroup({
    email: new FormControl(null, {validators: [Validators.required, Validators.email, Validators.pattern(/\S/), Validators.minLength(1)]}),
    password: new FormControl(null, {validators: [Validators.required, Validators.pattern(/\S/), Validators.minLength(1)]})
  });

  login() {
    if (this.userForm.invalid) {
      this.userForm.setErrors({error: true})
      return;
    }

    const email = this.userForm.controls.email.value!;
    const password = this.userForm.controls.password.value!;
    this.authService.signIn(email, password)
      .catch(() => {
        this.userForm.reset();
        this.userForm.setErrors({failed: true});
      });
  }

  resetWarning() {
    this.userForm.setErrors(null);
  }
}
