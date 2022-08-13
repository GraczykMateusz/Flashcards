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
import {
  FlashcardCreatorComponent
} from './components/flashcards/flashcard-manager/flashcard-creator/flashcard-creator.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlashcardsMenuComponent} from './components/flashcards/flashcards-menu/flashcards-menu.component';
import {MatIconModule} from '@angular/material/icon';
import {faHourglassHalf, faPenToSquare} from '@fortawesome/free-regular-svg-icons';
import {environment} from '../environments/environment';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/account/login/login.component';
import {RegisterComponent} from './components/account/register/register.component';
import {faArrowLeft, faBan} from "@fortawesome/free-solid-svg-icons";
import {FlashcardsTimerComponent} from './components/flashcards/flashcards-timer/flashcards-timer.component';
import {
  FlashcardEditorComponent
} from './components/flashcards/flashcard-manager/flashcard-editor/flashcard-editor.component';
import {
  FlashcardRemoverComponent
} from './components/flashcards/flashcard-manager/flashcard-remover/flashcard-remover.component';
import {
  FlashcardFinderComponent
} from './components/flashcards/flashcard-manager/flashcard-finder/flashcard-finder.component';
import {AuthService} from './services/auth/auth.service';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { VerifyComponent } from './components/account/verify/verify.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {REGION} from '@angular/fire/compat/functions';

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
    VerifyComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
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
    ReactiveFormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: REGION, useValue: 'europe-west3'},
    {provide: LOCALE_ID, useValue: 'PL'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHourglassHalf,
      faPenToSquare,
      faBan,
      faArrowLeft
    );
  }
}
