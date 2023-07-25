import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import {FormatCurrencyPipe} from "./pipes/format-currency.pipe";
import {RouterModule} from "@angular/router";
import { CommentsComponent } from './components/comments/comments.component';
import { CommentReactionComponent } from './components/comment-reaction/comment-reaction.component';



@NgModule({
  declarations: [
    ArticleCardComponent,
    FormatCurrencyPipe,
    CommentsComponent,
    CommentReactionComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
    exports: [ArticleCardComponent, FormatCurrencyPipe, CommentsComponent]
})
export class SharedModule { }
