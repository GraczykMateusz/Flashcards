import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FlashcardCreatorComponent} from "./components/flashcards/flashcard-manager/flashcard-creator/flashcard-creator.component";
import {FlashcardEditorComponent} from "./components/flashcards/flashcard-manager/flashcard-editor/flashcard-editor.component";
import {FlashcardRemoverComponent} from "./components/flashcards/flashcard-manager/flashcard-remover/flashcard-remover.component";
import {LoginComponent} from './components/entry-page/login/login.component';
import {RegisterComponent} from './components/entry-page/register/register.component';
import {RegisterSuccessComponent} from './components/entry-page/register/register-success/register-success.component';
import {ResetPasswordComponent} from './components/entry-page/reset-password/reset-password.component';
import {FlashcardsComponent} from './components/flashcards/flashcards.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', redirectTo: 'flashcards', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'flashcards/creator', component: FlashcardCreatorComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'flashcards/editor', component: FlashcardEditorComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'flashcards/remover', component: FlashcardRemoverComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'flashcards', component: FlashcardsComponent, ...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
