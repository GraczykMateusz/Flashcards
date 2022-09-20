import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FlashcardCreatorComponent} from "./components/flashcards/flashcard-manager/flashcard-creator/flashcard-creator.component";
import {FlashcardEditorComponent} from "./components/flashcards/flashcard-manager/flashcard-editor/flashcard-editor.component";
import {FlashcardRemoverComponent} from "./components/flashcards/flashcard-manager/flashcard-remover/flashcard-remover.component";
import {LoginComponent} from './components/entry-page/login/login.component';
import {RegisterComponent} from './components/entry-page/register/register.component';
import {ResetPasswordComponent} from './components/entry-page/reset-password/reset-password.component';
import {FlashcardsComponent} from './components/flashcards/flashcards.component';
import {canActivate, emailVerified, loggedIn} from '@angular/fire/auth-guard';
import {map, pipe} from 'rxjs';

const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
const redirectUnauthorizedToLogin = () => redirectUnverifiedTo(['/login']);

// const redirectLoggedUserTo = (redirect: any[]) => pipe(loggedIn, map(loggedIn => !loggedIn || redirect));
// const redirectLoggedUserToDashboard = () => redirectUnverifiedTo(['/dashboard']);

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'flashcards/creator', component: FlashcardCreatorComponent},
  {path: 'flashcards/editor', component: FlashcardEditorComponent},
  {path: 'flashcards/remover', component: FlashcardRemoverComponent},
  {path: 'flashcards', component: FlashcardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
