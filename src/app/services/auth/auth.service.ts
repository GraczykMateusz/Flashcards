import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  isSignUp = false;

  constructor(private auth: AngularFireAuth,
              private router: Router) {
  }

  async signIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(r => {
        this.isLoggedIn = r.user?.emailVerified!;
        if (this.isLoggedIn) this.router.navigateByUrl('/dashboard');
      })
      .catch(reason => console.log(reason))
  }

  async signUp(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password)
      .then(r => {
        r.user?.sendEmailVerification();
        this.isSignUp = true;
        this.router.navigateByUrl('/register/success')
      })
      .catch(reason => console.log(reason))
  }

  sendResetPasswordEmail(email: string): void {
    this.auth.sendPasswordResetEmail(email)
      .then(r => {

      })
  }

  logout() {
    this.auth.signOut();
  }
}
