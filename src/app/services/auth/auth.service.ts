import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private auth: AngularFireAuth,
              private router: Router) {
  }

  async signIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(r => {
        this.isLoggedIn = r.user?.emailVerified!;
        if (this.isLoggedIn) this.router.navigateByUrl('/dashboard');
      })
  }

  async signUp(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password)
      .then(r => {
        r.user?.sendEmailVerification()
      })
  }

  logout() {
    this.auth.signOut();
  }
}
