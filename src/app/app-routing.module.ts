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
import {FlashcardsMenuComponent} from './components/flashcards/flashcards-menu/flashcards-menu.component';
import {FlashcardsComponent} from './components/flashcards/flashcards.component';

const routes: Routes = [
  {path: '', redirectTo: 'flashcards', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'reset/password', component: ResetPasswordComponent},
  {path: 'register/success', component: RegisterSuccessComponent},
  {path: 'register', component: RegisterComponent},
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
