import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import {FormatCurrencyPipe} from "./pipes/format-currency.pipe";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ArticleCardComponent,
    FormatCurrencyPipe,

  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ArticleCardComponent, FormatCurrencyPipe]
})
export class SharedModule { }
