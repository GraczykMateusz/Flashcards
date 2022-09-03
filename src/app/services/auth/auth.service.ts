import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerSuccess$ = new Subject<boolean>();
  private resetPasswordSuccess$ = new Subject<boolean>();

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {
  }

  getRegisterSuccess(): Observable<boolean> {
    return this.registerSuccess$.asObservable();
  }

  getResetPasswordSuccess(): Observable<boolean> {
    return this.resetPasswordSuccess$.asObservable();
  }

  async signIn(email: string, password: string) {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigateByUrl('/dashboard'));
  }

  async signUp(email: string, password: string) {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(r => {
        r.user?.sendEmailVerification()
        this.registerSuccess$.next(true);
      });
  }

  async sendResetPasswordEmail(email: string) {
    await this.angularFireAuth.sendPasswordResetEmail(email)
      .then(() => this.resetPasswordSuccess$.next(true));
  }

  logout() {
    this.angularFireAuth.signOut().then();
  }
}
