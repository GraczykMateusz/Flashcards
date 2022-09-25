import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';
import {Observable, Subject} from 'rxjs';
import {UsersService} from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerSuccess$ = new Subject<boolean>();
  private resetPasswordSuccess$ = new Subject<boolean>();

  email?: string;

  constructor(private angularFireAuth: AngularFireAuth,
              private usersService: UsersService,
              private router: Router) {
  }

  getRegisterSuccess(): Observable<boolean> {
    return this.registerSuccess$.asObservable();
  }

  getResetPasswordSuccess(): Observable<boolean> {
    return this.resetPasswordSuccess$.asObservable();
  }

  getUser(): Observable<firebase.User | null> {
    return this.angularFireAuth.user;
  }

  async signIn(email: string, password: string, rememberMe: boolean) {
    const persistence = firebase.auth.Auth.Persistence;
    const currentPersistence = (rememberMe) ? persistence.LOCAL : persistence.SESSION;

    await this.angularFireAuth.setPersistence(currentPersistence);
    await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(r => {
        if (!r.user?.emailVerified) throw new Error('email not verified');
        this.email = r.user.email!;
        this.usersService.addUserIfNeeded(this.email);
        this.router.navigateByUrl('/dashboard')
      });
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
