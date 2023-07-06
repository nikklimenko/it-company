import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticlesComponent} from "./articles/articles.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  {path: 'blog', component: ArticlesComponent},
  {path: 'article', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
