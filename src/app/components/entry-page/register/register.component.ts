import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject<boolean>();

  isSuccess = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getRegisterSuccess()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.isSuccess = v)
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
