import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FlashcardsMenuComponent} from './components/flashcards/flashcards-menu/flashcards-menu.component';
import {MatIconModule} from '@angular/material/icon';
import {environment} from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/entry-page/login/login.component';
import {RegisterComponent} from './components/entry-page/register/register.component';
import {FlashcardsTimerComponent} from './components/flashcards/flashcards-timer/flashcards-timer.component';
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
import {FlashcardsComponent} from './components/flashcards/flashcards.component';
import {RegisterFormulaComponent} from './components/entry-page/register/register-formula/register-formula.component';
import {ResetPasswordFormulaComponent} from './components/entry-page/reset-password/reset-password-formula/reset-password-formula.component';
import {ResetPasswordSuccessComponent} from './components/entry-page/reset-password/reset-password-success/reset-password-success.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SnackBarComponent} from './components/common/snack-bar/snack-bar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RemoveFlashcardDialogComponent} from './components/flashcards/flashcards-editor/remove-flashcard-dialog/remove-flashcard-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {ClipboardModule} from 'ngx-clipboard';
import {ModifyFlashcardDialogComponent} from './components/flashcards/flashcards-editor/new-flashcard-dialog/modify-flashcard-dialog/modify-flashcard-dialog.component';
import {FlashcardsEditorComponent} from './components/flashcards/flashcards-editor/flashcards-editor.component';
import {AddFlashcardDialogComponent} from './components/flashcards/flashcards-editor/new-flashcard-dialog/add-flashcard-dialog/add-flashcard-dialog.component';
import {FlashcardsImageComponent} from './components/flashcards/flashcards-image/flashcards-image.component';
import {FlashcardsInfoComponent} from './components/flashcards/flashcards-id-info/flashcards-info.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    FlashcardsMenuComponent,
    LoginComponent,
    RegisterComponent,
    FlashcardsTimerComponent,
    CaptchaComponent,
    RegisterSuccessComponent,
    ResetPasswordComponent,
    FlashcardsComponent,
    RegisterFormulaComponent,
    ResetPasswordFormulaComponent,
    ResetPasswordSuccessComponent,
    SnackBarComponent,
    RemoveFlashcardDialogComponent,
    ModifyFlashcardDialogComponent,
    FlashcardsEditorComponent,
    AddFlashcardDialogComponent,
    FlashcardsImageComponent,
    FlashcardsInfoComponent
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
    MatIconModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    MatCheckboxModule,
    FormsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    ClipboardModule
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

}
