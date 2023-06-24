import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rememberMe = false;

  userForm = new FormGroup({
    email: new FormControl(null, {validators: [Validators.required, Validators.email, Validators.pattern(/\S/), Validators.minLength(1)]}),
    password: new FormControl(null, {validators: [Validators.required, Validators.pattern(/\S/), Validators.minLength(1)]})
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userForm.markAsTouched()
  }

  login() {
    if (this.userForm.invalid) {
      this.userForm.setErrors({error: true})
      return;
    }

    const email = this.userForm.controls.email.value!;
    const password = this.userForm.controls.password.value!;

    this.authService.signIn(email, password, this.rememberMe)
      .catch(() => {
        this.userForm.reset();
        this.userForm.setErrors({failed: true});
      });
  }

  resetWarning() {
    this.userForm.setErrors(null);
  }
}
