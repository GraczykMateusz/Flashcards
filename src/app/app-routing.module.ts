import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlashcardsComponent} from "./components/flashcards/flashcards.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FlashcardCreatorComponent} from "./components/flashcards/flashcard-creator/flashcard-creator.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'flashcards', component: FlashcardsComponent},
  {path: 'flashcards/creator', component: FlashcardCreatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
