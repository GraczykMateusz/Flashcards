import {Component} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  private destroyed$ = new Subject<boolean>();

  isSuccess = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getResetPasswordSuccess()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.isSuccess = v)
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
