import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlashcardsComponent} from "./components/flashcards/flashcards.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FlashcardCreatorComponent} from "./components/flashcards/flashcard-creator/flashcard-creator.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
  {path: 'flashcards/creator', component: FlashcardCreatorComponent, pathMatch: 'full'},
  {path: 'flashcards', component: FlashcardsComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
