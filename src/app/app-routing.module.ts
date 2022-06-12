import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlashcardsComponent} from "./components/flashcards/flashcards.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'flashcards', component: FlashcardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
