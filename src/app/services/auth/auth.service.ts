import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {
  }

  foo(): Observable<firebase.default.User | null> {
    return this.angularFireAuth.user;
  }

  async signIn(email: string, password: string) {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigateByUrl('/dashboard'));
  }

  async signUp(email: string, password: string) {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(r => r.user?.sendEmailVerification())
      .then(() => this.router.navigateByUrl('/register/success'));
  }

  sendResetPasswordEmail(email: string): void {
    this.angularFireAuth.sendPasswordResetEmail(email)
      .then()
  }

  logout() {
    this.angularFireAuth.signOut().then();
  }
}
