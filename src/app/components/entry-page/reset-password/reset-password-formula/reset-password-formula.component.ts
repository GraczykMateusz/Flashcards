import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password-formula',
  templateUrl: './reset-password-formula.component.html',
  styleUrls: ['./reset-password-formula.component.scss']
})
export class ResetPasswordFormulaComponent {

  resetForm = new FormControl('', [Validators.email, Validators.required]);

  constructor(private authService: AuthService) {
  }

  async resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.setErrors({error: true})
      return;
    }

    const email = this.resetForm.value!;

    this.authService.sendResetPasswordEmail(email)
      .catch(() => {
        this.resetForm.reset();
        this.resetForm.setErrors({failed: true});
      });
  }
}
