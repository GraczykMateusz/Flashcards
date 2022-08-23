import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  toDashboard(): void {
    this.router.navigateByUrl('/dashboard').then()
  }

  toLoginFailed(): void {
    this.router.navigateByUrl('/login/failed').then()
  }

  toRegisterSuccess(): void {
    this.router.navigateByUrl('/register/success').then()
  }
}
