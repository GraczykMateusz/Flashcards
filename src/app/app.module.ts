import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {FlashcardsComponent} from './components/flashcards/flashcards.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlashcardCreatorComponent} from './components/flashcards/flashcard-manager/flashcard-creator/flashcard-creator.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlashcardsMenuComponent} from './components/flashcards/flashcards-menu/flashcards-menu.component';
import {MatIconModule} from '@angular/material/icon';
import {faHourglassHalf, faPenToSquare} from '@fortawesome/free-regular-svg-icons';
import {environment} from '../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/entry-page/login/login.component';
import {RegisterComponent} from './components/entry-page/register/register.component';
import {faArrowLeft, faBan, faExclamationTriangle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FlashcardsTimerComponent} from './components/flashcards/flashcards-timer/flashcards-timer.component';
import {FlashcardEditorComponent} from './components/flashcards/flashcard-manager/flashcard-editor/flashcard-editor.component';
import {FlashcardRemoverComponent} from './components/flashcards/flashcard-manager/flashcard-remover/flashcard-remover.component';
import {FlashcardFinderComponent} from './components/flashcards/flashcard-manager/flashcard-finder/flashcard-finder.component';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {REGION} from '@angular/fire/compat/functions';
import {NgxCaptchaModule} from '@binssoft/ngx-captcha';
import {CaptchaComponent} from './components/common/captcha/captcha.component';
import {RegisterSuccessComponent} from './components/entry-page/register/register-success/register-success.component';
import {ResetPasswordComponent} from './components/entry-page/reset-password/reset-password.component';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {FIREBASE_OPTIONS} from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    FlashcardsComponent,
    FlashcardCreatorComponent,
    FlashcardsMenuComponent,
    LoginComponent,
    RegisterComponent,
    FlashcardsTimerComponent,
    FlashcardEditorComponent,
    FlashcardRemoverComponent,
    FlashcardFinderComponent,
    CaptchaComponent,
    RegisterSuccessComponent,
    ResetPasswordComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: REGION, useValue: 'europe-west3'},
    {provide: LOCALE_ID, useValue: 'PL'},
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHourglassHalf,
      faPenToSquare,
      faBan,
      faArrowLeft,
      faTrash,
      faExclamationTriangle
    );
  }
}
