import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlashcardsComponent} from "./components/flashcards/flashcards.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FlashcardCreatorComponent} from "./components/flashcards/flashcard-manager/flashcard-creator/flashcard-creator.component";
import {FlashcardEditorComponent} from "./components/flashcards/flashcard-manager/flashcard-editor/flashcard-editor.component";
import {FlashcardRemoverComponent} from "./components/flashcards/flashcard-manager/flashcard-remover/flashcard-remover.component";
import {LoginComponent} from './components/account/login/login.component';
import {RegisterComponent} from './components/account/register/register.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {VerifyComponent} from './components/account/verify/verify.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account/verify', component: VerifyComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'flashcards/creator', component: FlashcardCreatorComponent, canActivate: [AuthGuardService]},
  {path: 'flashcards/editor', component: FlashcardEditorComponent, canActivate: [AuthGuardService]},
  {path: 'flashcards/remover', component: FlashcardRemoverComponent, canActivate: [AuthGuardService]},
  {path: 'flashcards', component: FlashcardsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
