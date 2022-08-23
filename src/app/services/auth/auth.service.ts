import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {NavigationService} from '../navigation/navigation.service';
import {getAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  isSignUp = false;

  constructor(private auth: AngularFireAuth,
              private navigation: NavigationService) {
  }

  signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(r => {
        this.isLoggedIn = r.user?.emailVerified!;
        if (this.isLoggedIn) this.navigation.toDashboard();
      });
  }

  // async signUp(email: string, password: string) {
  //   await this.auth.createUserWithEmailAndPassword(email, password)
  //     .then(r => {
  //       r.user?.sendEmailVerification();
  //       this.isSignUp = true;
  //       this.navigation.toRegisterSuccess();
  //     })
  //     .catch(reason => console.log(reason))
  // }
  //
  // sendResetPasswordEmail(email: string): void {
  //   this.auth.sendPasswordResetEmail(email)
  //     .then(r => {
  //
  //     })
  // }
  //
  // logout() {
  //   this.auth.signOut();
  // }
}
